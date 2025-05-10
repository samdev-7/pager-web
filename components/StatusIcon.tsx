import { cn } from "@/lib/utils";

export function StatusIcon({
  className,
  status,
  ...props
}: React.ComponentProps<"div"> & {
  status: "online" | "idle" | "offline";
}) {
  return (
    <div
      data-slot="status-icon"
      className={cn(
        "relative flex size-2 shrink-0 items-center justify-center rounded-full",
        status === "online" && "bg-emerald-500",
        status === "idle" && "border-3 border-emerald-500",
        status === "offline" && "border-3 border-neutral-500",
        className
      )}
      {...props}
    ></div>
  );
}
