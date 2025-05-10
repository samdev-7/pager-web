"use client";

import { cn } from "@/lib/utils";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { StatusIcon } from "./StatusIcon";

export function StatusAvatar({
  className,
  fallbackClassName = "",
  statusClassName = "",
  src = "",
  name = "",
  status = "online",
  ...props
}: React.ComponentProps<typeof Avatar> & {
  fallbackClassName?: string;
  statusClassName?: string;
  src?: string | null;
  name?: string | null;
  status?: "online" | "idle" | "offline";
}) {
  const initials = name
    ? name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("")
    : "?";
  return (
    <div className="relative">
      <Avatar className={cn("rounded-md", className)} {...props}>
        {src ? (
          <AvatarImage
            src={src as unknown as string | undefined}
            alt="Avatar"
          />
        ) : (
          <AvatarFallback
            className={cn(
              "w-full h-full flex items-center justify-center text-sm text-background bg-foreground",
              fallbackClassName
            )}
          >
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
      <StatusIcon
        status={status}
        className={cn(
          "absolute bottom-0 right-0 ring-2 ring-sidebar group-data-[collapsible=icon]:hidden",
          statusClassName
        )}
      />
    </div>
  );
}
