"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { Check, Minus } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const items = [
  { value: "light", label: "Light", image: "/ui-light.png" },
  { value: "dark", label: "Dark", image: "/ui-dark.png" },
  { value: "system", label: "System", image: "/ui-system.png" },
];

export default function ThemeToggle() {
  const id = useId();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-3">
        {items.map((item) => (
          <div
            key={`${id}-${item.value}`}
            className="flex flex-col items-center"
          >
            <Skeleton className="h-[70px] w-[88px] rounded-lg" />
            <Skeleton className="mt-2 h-4 w-[88px]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <RadioGroup className="flex gap-3" defaultValue={theme}>
      {items.map((item) => (
        <label key={`${id}-${item.value}`}>
          <RadioGroupItem
            id={`${id}-${item.value}`}
            value={item.value}
            className="peer sr-only after:absolute after:inset-0"
            onClick={() => setTheme(item.value)}
          />
          <Image
            src={item.image}
            alt={item.label}
            width={88}
            height={70}
            priority
            className="relative cursor-pointer overflow-hidden rounded-lg border border-input shadow-sm shadow-black/5 outline-offset-2 transition-colors peer-[:focus-visible]:outline peer-[:focus-visible]:outline-2 peer-[:focus-visible]:outline-ring/70 peer-data-[disabled]:cursor-not-allowed peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent peer-data-[disabled]:opacity-50"
          />
          <span className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
            <Check
              size={16}
              strokeWidth={2}
              className="peer-data-[state=unchecked]:group-[]:hidden"
              aria-hidden="true"
            />
            <Minus
              size={16}
              strokeWidth={2}
              className="peer-data-[state=checked]:group-[]:hidden"
              aria-hidden="true"
            />
            <span className="text-xs font-medium">{item.label}</span>
          </span>
        </label>
      ))}
    </RadioGroup>
  );
}
