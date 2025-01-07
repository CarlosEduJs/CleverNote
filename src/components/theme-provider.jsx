"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }) {

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider defaultTheme="system" attribute="class"  enableSystem>
      {children}
    </NextThemesProvider>
  );
}
