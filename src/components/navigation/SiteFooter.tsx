
import * as React from "react";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Elyndor — All rights reserved.
      </div>
    </footer>
  );
}
