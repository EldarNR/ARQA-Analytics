// libraries
import type { ReactNode } from 'react';

// providers
import { LocalesProvider } from '@/providers/LocalesProvider';
import QueryProvider from '@/providers/QueryProvider';
import { ThemeProvider } from 'next-themes';

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProvider>
      <LocalesProvider>
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </LocalesProvider>
    </QueryProvider>
  );
};

export default AppProvider;
