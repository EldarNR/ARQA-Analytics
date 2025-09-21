// libraries
import { ReactNode } from 'react';
// style
import '@/style/index.css';

//components
import Sidebar from '@/components/SideBar';
// providers
import AppProvider from '@/providers';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>
          <div className="flex h-screen">
            <Sidebar />

            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;
