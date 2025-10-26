// import { Switch, Route } from "wouter";
// import { queryClient } from "./lib/queryClient";
// import { QueryClientProvider } from "@tanstack/react-query";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/AppSidebar";
// import Market from "@/pages/Market";
// import SocialTrading from "@/pages/SocialTrading";
// import FundAccount from "@/pages/FundAccount";
// import Profile from "@/pages/Profile";
// import Investment from "@/pages/Investment";
// import History from "@/pages/History";
// import Withdrawal from "@/pages/Withdrawal";
// import NotFound from "@/pages/not-found";

// function Router() {
//   return (
//     <Switch>
//       <Route path="/" component={Market} />
//       <Route path="/social-trading" component={SocialTrading} />
//       <Route path="/fund-account" component={FundAccount} />
//       <Route path="/profile" component={Profile} />
//       <Route path="/investment" component={Investment} />
//       <Route path="/withdrawal" component={Withdrawal} />
//       <Route path="/History" component={History} />
//       <Route path="/live-stream">
//         <div className="space-y-6">
//           <h1 className="text-2xl font-bold">Live Stream 📊🔥</h1>
//           <p className="text-muted-foreground">Coming soon - Watch live market analysis and trading sessions</p>
//         </div>
//       </Route>
//       <Route path="/dashboard">
//         <div className="space-y-6">
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//           <p className="text-muted-foreground">Coming soon - Your personalized trading dashboard</p>
//         </div>
//       </Route>
//       <Route component={NotFound} />
//     </Switch>
//   );
// }

// function App() {
//   const style = {
//     "--sidebar-width": "16rem",
//   };

//   return (
//     <QueryClientProvider client={queryClient}>
//       <TooltipProvider>
//         <SidebarProvider style={style as React.CSSProperties} defaultOpen={false}>
//           <div className="flex h-screen w-full">
//             <AppSidebar />
//             <div className="flex flex-col flex-1 overflow-hidden">
//               <header className="flex items-center gap-4 p-4 border-b">
//                 <SidebarTrigger data-testid="button-sidebar-toggle" />
//                 <div className="flex-1"></div>
//               </header>
//               <main className="flex-1 overflow-y-auto p-6">
//                 <Router />
//               </main>
//             </div>
//           </div>
//         </SidebarProvider>
//         <Toaster />
//       </TooltipProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;
