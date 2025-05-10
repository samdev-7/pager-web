"use client";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  SidebarClose,
  SidebarOpen,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import TeamSwitcher from "./TeamSwitcher";
import AccountSwitcher from "./AccountSwitcher";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AccountSwitcher />
        <Separator className="group-data-[collapsible=icon]:hidden" />
        <div className="text-muted-foreground flex items-center">
          <span className="text-xs pl-2 overflow-hidden whitespace-nowrap group-data-[collapsible=icon]:hidden">
            Pager {process.env.NEXT_PUBLIC_PAGER_VERSION}
          </span>
          <Button
            data-sidebar="trigger"
            data-slot="sidebar-trigger"
            variant="ghost"
            size="icon"
            className="size-7 ml-auto"
            onClick={toggleSidebar}
          >
            <SidebarOpen className="hidden group-data-[collapsible=icon]:block" />
            <SidebarClose className="group-data-[collapsible=icon]:hidden" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
