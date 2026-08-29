import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  FolderKanban,
  GitPullRequest,
  History,
  Settings,
  Shield,
  BarChart3,
} from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { ORG } from "@/lib/demo-data";
import { useAppStore } from "@/lib/store";

const NAV = [
  { to: "/app", label: "Projects", icon: FolderKanban, exact: true },
  { to: "/app/runs", label: "Runs", icon: History },
  { to: "/app/fixes", label: "Fixes", icon: GitPullRequest },
  { to: "/app/policies", label: "Policies", icon: Shield },
  { to: "/app/usage", label: "Usage", icon: BarChart3 },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const usage = useAppStore((s) => s.usage);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="flex min-h-dvh">
        <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-border bg-background md:flex">
          <div className="flex h-14 items-center px-4">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col gap-0.5 px-2 py-2">
            {NAV.map((item) => {
              const active = item.exact
                ? pathname === item.to
                : pathname === item.to || pathname.startsWith(item.to + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex min-h-11 items-center gap-2.5 rounded-md px-3 text-sm transition-colors",
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-border p-3">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              {ORG.name}
            </p>
            <p className="mt-0.5 text-sm">{ORG.member}</p>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Studio · {usage.checksUsed}/{usage.checksLimit} checks
            </p>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur md:hidden">
            <Link to="/">
              <Logo />
            </Link>
            <Link
              to="/app/new"
              className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
            >
              Launch Check
            </Link>
          </header>
          <main className="flex-1">{children}</main>
          <nav className="sticky bottom-0 z-30 grid grid-cols-4 border-t border-border bg-background md:hidden">
            {NAV.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const active = item.exact
                ? pathname === item.to
                : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex min-h-12 flex-col items-center justify-center gap-0.5 text-[10px]",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
