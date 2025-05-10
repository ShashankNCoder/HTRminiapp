import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

// Set demo mode flag for development - currently turned off to allow wallet creation testing
process.env.DEMO_MODE = process.env.DEMO_MODE || 'false';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  if (isDevelopment) {
    await setupVite(app, server);
  } else {
    // In production, serve static files from the dist/public directory
    const publicPath = path.resolve(process.cwd(), 'dist', 'public');
    
    // Serve static files
    app.use(express.static(publicPath, {
      index: false,
      maxAge: '1y',
      etag: true,
      lastModified: true,
    }));
    
    // Serve index.html for all routes (SPA fallback)
    app.get('*', (req, res) => {
      // Don't serve index.html for API routes
      if (req.path.startsWith('/api')) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      
      res.sendFile(path.join(publicPath, 'index.html'));
    });
  }

  const port = process.env.PORT || 5000;
  server.listen(port, () => {
    log(`Server running in ${isDevelopment ? 'development' : 'production'} mode on port ${port}`);
  });
})();
