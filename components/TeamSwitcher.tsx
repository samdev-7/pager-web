import { ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Avatar } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { StatusIcon } from "./StatusIcon";

export default function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="h-full flex space-x-2 items-center">
                <Avatar className="bg-sidebar-foreground rounded-md text-sidebar flex items-center justify-center text-lg">
                  <AvatarFallback>T</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-sidebar-foreground">
                    Team Name
                  </div>
                  <div className="text-xs text-sidebar-foreground flex items-center">
                    <StatusIcon status="online" />
                    <span className="ml-1 -mb-0.25">22 Online</span>
                  </div>
                </div>
              </div>
              <ChevronsUpDown className="ml-auto" />
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
