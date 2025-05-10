import { cn } from "@/lib/utils";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { StatusIcon } from "./StatusIcon";

export function StatusAvatar({
  className,
  statusClassName = "",
  src = "",
  name = "",
  status = "online",
  ...props
}: React.ComponentProps<typeof Avatar> & {
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
      <Avatar className={cn("rounded-md bg-foreground", className)} {...props}>
        <AvatarImage src={src as unknown as string | undefined} alt="Avatar" />
        <AvatarFallback className="w-full h-full flex items-center justify-center text-sm text-background">
          {initials}
        </AvatarFallback>
      </Avatar>
      <StatusIcon
        status={status}
        className={cn(
          "absolute bottom-0 right-0 ring-2 ring-sidebar",
          statusClassName
        )}
      />
    </div>
  );
}
