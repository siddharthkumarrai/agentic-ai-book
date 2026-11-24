"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribeToStore = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeToStore,
    () => true,
    () => false,
  );

  const options = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ] as const;

  return (
    <fieldset className="inline-flex items-center rounded-lg border border-[var(--border)] p-0.5">
      <legend className="sr-only">Theme preference</legend>
      {options.map(({ value, label, icon: Icon }) => (
        <button
          type="button"
          key={value}
          onClick={() => setTheme(value)}
          aria-label={`${label} theme`}
          aria-pressed={mounted && theme === value}
          className={`grid size-8 place-items-center rounded-md ${
            mounted && theme === value
              ? "bg-[var(--surface-active)] text-[var(--ink)]"
              : "text-[var(--muted)] hover:text-[var(--ink)]"
          }`}
        >
          <Icon aria-hidden="true" size={15} />
        </button>
      ))}
    </fieldset>
  );
}
