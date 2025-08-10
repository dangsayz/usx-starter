
"use client";
import * as Icons from "lucide-react";
import { cn } from "@/src/lib/cn";
export type IconProps = React.ComponentPropsWithoutRef<"svg"> & { name: keyof typeof Icons; size?: number };
export function Icon({ name, size=18, className, ...rest }: IconProps){
  const Cmp = (Icons as any)[name] ?? Icons.HelpCircle;
  return <Cmp width={size} height={size} className={cn('inline-block', className)} {...rest} />;
}
