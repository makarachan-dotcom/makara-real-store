import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TelegramButtonProps {
  children: ReactNode;
  variant?: "default" | "primary" | "full";
  icon?: ReactNode;
  iconAnimation?: "bounce" | "pulse" | "wobble" | "spin" | "none";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export function TelegramButton({
  children,
  variant = "default",
  icon,
  iconAnimation = "none",
  onClick,
  className,
  disabled = false,
  type = "button",
}: TelegramButtonProps) {
  const baseClasses =
    "relative flex items-center justify-center gap-2 rounded-xl font-medium text-base transition-all duration-150 active:scale-[0.97] select-none";

  const variantClasses = {
    default:
      "bg-[#2b3a4a] text-white hover:bg-[#354554] h-12 px-4",
    primary:
      "bg-[#3390ec] text-white hover:bg-[#2a7fd6] h-12 px-4",
    full: "bg-[#2b3a4a] text-white hover:bg-[#354554] h-14 px-5 w-full text-lg",
  };

  const animationClass =
    iconAnimation === "bounce"
      ? "animate-tg-bounce"
      : iconAnimation === "pulse"
      ? "animate-tg-pulse"
      : iconAnimation === "wobble"
      ? "animate-tg-wobble"
      : iconAnimation === "spin"
      ? "animate-tg-spin-slow"
      : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseClasses,
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {icon && (
        <span className={cn("flex-shrink-0 w-5 h-5 flex items-center justify-center", animationClass)}>
          {icon}
        </span>
      )}
      <span className="truncate">{children}</span>
    </button>
  );
}

interface TelegramButtonGridProps {
  children: ReactNode;
  className?: string;
}

export function TelegramButtonGrid({ children, className }: TelegramButtonGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      {children}
    </div>
  );
}
