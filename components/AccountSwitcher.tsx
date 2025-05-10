"use client";

import { useAuth } from "@/lib/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { StatusAvatar } from "./StatusAvatar";

export default function AccountSwitcher() {
  const { user } = useAuth();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="h-full flex space-x-2 items-center">
                <StatusAvatar src={user?.photoURL} name={user?.displayName} />
                <div>
                  <div className="text-sm font-medium text-sidebar-foreground">
                    {user?.displayName ?? "Unknown name"}
                  </div>
                  <div className="text-xs text-sidebar-foreground flex items-center">
                    {user?.email ?? "Unknown email"}
                  </div>
                </div>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right">
            <DropdownMenuItem>
              <span>Test</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
