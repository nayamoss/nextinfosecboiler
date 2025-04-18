
import React from 'react';
import SiteNavigation from './SiteNavigation';
import SiteFooter from './SiteFooter';

type SiteLayoutProps = {
  children: React.ReactNode;
};

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNavigation />
      <main className="flex-grow">{children}</main>
      <SiteFooter />
    </div>
  );
};

export default SiteLayout;
