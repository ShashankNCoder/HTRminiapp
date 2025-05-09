import { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import WelcomePage from "@/pages/WelcomePage";
import HomePage from "@/pages/HomePage";
import LoadingScreen from "@/components/LoadingScreen";
import { useWallet } from "@/context/WalletContext";
import { initTelegramApp } from "@/lib/telegram";

function Router() {
  const { isAuthenticated } = useWallet();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (isAuthenticated && location === "/") {
      setLocation("/home");
    }
  }, [isAuthenticated, location, setLocation]);

  return (
    <Switch>
      <Route path="/" component={WelcomePage} />
      <Route path="/home" component={HomePage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Initialize Telegram Mini App
    initTelegramApp();
    
    // Simulate initial loading (can be replaced with actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {isLoading ? <LoadingScreen /> : <Router />}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
