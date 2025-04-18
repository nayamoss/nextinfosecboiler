
import React from 'react';
import { Link } from 'react-router-dom';

const SiteFooter = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Security for the Rest of Us</h3>
            <p className="text-muted-foreground">
              Essential security guides and best practices for developers
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
              <li><Link to="/newsletters" className="text-muted-foreground hover:text-foreground">Newsletters</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link to="/write-for-us" className="text-muted-foreground hover:text-foreground">Write for Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
              <li><Link to="/search" className="text-muted-foreground hover:text-foreground">Search</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <p className="text-muted-foreground mb-2">
              Have questions or feedback? Reach out to us.
            </p>
            <Link to="/contact" className="text-primary hover:underline">Contact Us</Link>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Security for the Rest of Us. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
