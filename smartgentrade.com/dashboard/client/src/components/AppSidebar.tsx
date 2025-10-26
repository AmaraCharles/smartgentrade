// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarFooter,
// } from "@/components/ui/sidebar";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { TrendingUp, Users, Radio, LayoutDashboard, DollarSign, Wallet, LogOut, Settings } from "lucide-react";
// import { Link, useLocation } from "wouter";

// const dashboards = [
//   { title: "Market", icon: TrendingUp, url: "/", emoji: "🔥" },
//   { title: "Social Trading", icon: Users, url: "/social-trading", emoji: "🔥" },
//   { title: "Live Stream", icon: Radio, url: "/live-stream", emoji: "📊🔥" },
//   { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard", emoji: "" },
// ];

// const navigation = [
//   { title: "Fund Account", icon: DollarSign, url: "/fund-account", emoji: "💰" },
//   { title: "Investment", icon: TrendingUp, url: "/investment", emoji: "" },
//   { title: "Withdrawal", icon: Wallet, url: "/withdrawal", emoji: "" },
// ];

// export function AppSidebar() {
//   const [location] = useLocation();

//   return (
//     <Sidebar>
//       <SidebarContent>
//         <div className="px-4 py-6">
//           <div className="flex items-center gap-2">
//             <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
//               <TrendingUp className="h-5 w-5 text-primary-foreground" />
//             </div>
//             <span className="font-bold text-lg">smartgentrade</span>
//           </div>
//         </div>

//         <SidebarGroup>
//           <SidebarGroupLabel className="text-primary text-xs font-semibold uppercase tracking-wider">
//             Dashboards
//           </SidebarGroupLabel>
//           <SidebarMenu>
//             {dashboards.map((item) => (
//               <SidebarMenuItem key={item.title}>
//                 <SidebarMenuButton asChild isActive={location === item.url}>
//                   <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
//                     <item.icon className="h-4 w-4" />
//                     <span>{item.title}</span>
//                     {item.emoji && <span className="ml-auto">{item.emoji}</span>}
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             ))}
//           </SidebarMenu>
//         </SidebarGroup>

//         <SidebarGroup>
//           <SidebarGroupLabel className="text-primary text-xs font-semibold uppercase tracking-wider">
//             Navigation
//           </SidebarGroupLabel>
//           <SidebarMenu>
//             {navigation.map((item) => (
//               <SidebarMenuItem key={item.title}>
//                 <SidebarMenuButton asChild isActive={location === item.url}>
//                   <Link href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
//                     <item.icon className="h-4 w-4" />
//                     <span>{item.title}</span>
//                     {item.emoji && <span className="ml-auto">{item.emoji}</span>}
//                   </Link>
//                 </SidebarMenuButton>
//               </SidebarMenuItem>
//             ))}
//           </SidebarMenu>
//         </SidebarGroup>
//       </SidebarContent>

//       <SidebarFooter>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton asChild isActive={location === "/profile"}>
//               <Link href="/profile" data-testid="link-profile">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src="" alt="User" />
//                   <AvatarFallback className="bg-primary text-primary-foreground text-xs">
//                     EC
//                   </AvatarFallback>
//                 </Avatar>
//                 <div className="flex-1 text-left">
//                   <p className="text-sm font-medium">Eric</p>
//                   <p className="text-xs text-muted-foreground">View Profile</p>
//                 </div>
//                 <Settings className="h-4 w-4" />
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }
