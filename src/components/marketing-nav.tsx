import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";
import { Button } from "./ui/button";

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link to="/sample" className="hover:text-foreground">
            Sample report
          </Link>
          <Link to="/checklist" className="hover:text-foreground">
            Checklist
          </Link>
          <a href="/#pricing" className="hover:text-foreground">
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/app">Open workspace</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/app/new">Run a Launch Check</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Launch verification for AI-built Next.js applications. Not a security guarantee.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <Link to="/sample" className="hover:text-foreground">
            Sample report
          </Link>
          <Link to="/checklist" className="hover:text-foreground">
            Checklist
          </Link>
          <Link to="/app" className="hover:text-foreground">
            Workspace
          </Link>
        </div>
      </div>
    </footer>
  );
}
