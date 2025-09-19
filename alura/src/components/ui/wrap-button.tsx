import React from "react";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface WrapButtonProps {
  className?: string;
  children?: React.ReactNode;
  href?: string;
}

const WrapButton: React.FC<WrapButtonProps> = ({
  className,
  children,
  href,
}) => {
  return (
    <div className="flex mt-8">
      {href ? (
        // Case 1: Link button
        <Link href={href}>
          <div
            className={cn(
              "group cursor-pointer border border-[#3B3A3A] bg-[#151515] gap-2 h-[64px] flex items-center p-[11px] rounded-full",
              className
            )}
          >
            <div className="border border-[#3B3A3A] bg-[#ff3f17] h-[43px] rounded-full flex items-center justify-center text-white">
              <p className="font-medium tracking-tight mr-3 ml-2 flex items-center gap-2 justify-center">
                {children}
              </p>
            </div>
            <div className="text-[#3b3a3a] group-hover:ml-2 ease-in-out transition-all size-[26px] flex items-center justify-center rounded-full border-2 border-[#3b3a3a]">
              <ArrowRight
                size={18}
                className="group-hover:rotate-45 ease-in-out transition-all"
              />
            </div>
          </div>
        </Link>
      ) : (
        // Case 2: Static button (with Globe + link inside)
        <div
          className={cn(
            "group cursor-pointer border border-[#3B3A3A] bg-[#151515] gap-2 h-[64px] flex items-center p-[11px] rounded-full",
            className
          )}
        >
          <div className="border border-[#3B3A3A] bg-[#fe7500] h-[43px] rounded-full flex items-center justify-center text-white px-3">
            <Globe className="mx-2 animate-spin" />
            <Link href="/inner">
              <p className="font-medium tracking-tight mr-3">
                {children ? children : "Get Started"}
              </p>
            </Link>
          </div>
          <div className="text-[#3b3a3a] group-hover:ml-2 ease-in-out transition-all size-[26px] flex items-center justify-center rounded-full border-2 border-[#3b3a3a]">
            <ArrowRight
              size={18}
              className="group-hover:rotate-45 ease-in-out transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WrapButton;
