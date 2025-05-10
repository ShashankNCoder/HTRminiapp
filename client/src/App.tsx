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
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation 
          activeTab={getActiveTab()} 
          onCreateClick={handleCreateClick}
        />
      </div>
    </div>
  );
}

function Router() {
  const { isAuthenticated } = useWallet();
  const [location, setLocation] = useLocation();

  // Enhanced routing logic to better handle authentication state
  useEffect(() => {
    console.log("Router: Authentication state changed:", isAuthenticated, "Current location:", location);
    
    if (isAuthenticated && location === "/") {
      console.log("Router: User is authenticated and at root, redirecting to /home");
      // Use both methods to ensure navigation works
      window.history.pushState({}, '', '/home');
      setLocation("/home");
    }
  }, [isAuthenticated, location, setLocation]);

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
