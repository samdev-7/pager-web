import { Avatar } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export default function AccountSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="h-full flex space-x-2 items-center">
                <Avatar className="bg-sidebar-foreground rounded-md text-sidebar flex items-center justify-center text-lg">
                  U
                </Avatar>
                <div>
                  <div className="text-sm font-medium text-sidebar-foreground">
                    User Name
                  </div>
                  <div className="text-xs text-sidebar-foreground flex items-center">
                    me@example.com
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
