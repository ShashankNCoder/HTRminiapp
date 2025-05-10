import { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import WelcomePage from "@/pages/WelcomePage";
import HomePage from "@/pages/HomePage";
import WalletPage from "@/pages/WalletPage";
import RewardsPage from "@/pages/RewardsPage";
import ProfilePage from "@/pages/ProfilePage";
import CreateTokenPage from "@/pages/CreateTokenPage";
import LoadingScreen from "@/components/LoadingScreen";
import { useWallet } from "@/context/WalletContext";
import { initTelegramApp } from "@/lib/telegram";
import BottomNavigation from "@/components/BottomNavigation";

function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { isAuthenticated } = useWallet();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getActiveTab = () => {
    if (location === "/home") return "home";
    if (location === "/wallet") return "wallet";
    if (location === "/rewards") return "rewards";
    if (location === "/profile") return "profile";
    return "home";
  };

  const handleCreateClick = () => {
    // Handle create action
    console.log("Create button clicked");
  };

  if (!isAuthenticated) return <>{children}</>;

  return (
    <div className="relative min-h-screen flex flex-col">
      <main className="flex-1 pb-20">
        {children}
      </main>
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
          <BottomNavigation 
            activeTab={getActiveTab()} 
            onCreateClick={handleCreateClick}
          />
        </div>
      )}
    </div>
  );
}

function Router() {
  const { isAuthenticated } = useWallet();
  const [location, setLocation] = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Handle initial load
  useEffect(() => {
    const path = window.location.pathname;
    console.log("Initial path:", path);

    if (path === "/" || path === "/index.html") {
      if (isAuthenticated) {
        setLocation("/home");
      } else {
        setLocation("/");
      }
    }
    
    setIsInitialLoad(false);
  }, [isAuthenticated, setLocation]);

  // Handle subsequent route changes
  useEffect(() => {
    if (!isInitialLoad) {
      if (isAuthenticated && location === "/") {
        setLocation("/");
      } else if (!isAuthenticated && location !== "/") {
        setLocation("/home");
      }
    }
  }, [isAuthenticated, location, setLocation, isInitialLoad]);

  return (
    <Layout>
      <Switch>
        <Route path="/" component={WelcomePage} />
        <Route path="/home" component={HomePage} />
        <Route path="/wallet" component={WalletPage} />
        <Route path="/rewards" component={RewardsPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/create-token" component={CreateTokenPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
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
