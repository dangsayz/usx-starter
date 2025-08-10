
import React from "react";

export default function DemoPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-bold mb-6">USX Demo</h1>
      <p className="text-muted-foreground">
        {`If you placed catalyst-ui-kit.zip in the project root before running one-click.sh, components are now available under src/catalyst/ and base styles are loaded.`}
      </p>
      <div className="mt-8 rounded-xl border p-6">
        <p className="mb-2 font-medium">Try importing a Catalyst button in a page:</p>
        <pre className="text-sm bg-muted rounded p-4 overflow-auto">{`import { Button } from "@/src/components/ui/button";

export default function Example(){
  return <Button>Click me</Button>
}`}</pre>
      </div>
    </main>
  );
}
