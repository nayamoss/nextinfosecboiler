
import React from 'react';
import SiteLayout from '@/components/SiteLayout';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
  return (
    <SiteLayout>
      <Helmet>
        <title>Terms of Service | Security for the Rest of Us</title>
        <meta name="description" content="Terms of service and legal information for Security for the Rest of Us." />
      </Helmet>

      <div className="container max-w-4xl py-12">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Agreement to Terms</h2>
            <p>
              By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. 
              If you do not agree with any of these terms, you are prohibited from using this site.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Use License</h2>
            <p className="mb-3">
              Permission is granted to temporarily view the materials on our website for personal, non-commercial use only. 
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Disclaimer</h2>
            <p>
              The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, 
              and hereby disclaim and negate all other warranties including, without limitation, implied warranties or 
              conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Limitations</h2>
            <p>
              In no event shall our company or its suppliers be liable for any damages (including, without limitation, 
              damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
              to use the materials on our website, even if we have been notified orally or in writing of the possibility of such damage.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Revisions and Errata</h2>
            <p>
              The materials appearing on our website could include technical, typographical, or photographic errors. 
              We do not warrant that any of the materials on our website are accurate, complete or current. 
              We may make changes to the materials contained on our website at any time without notice.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws and you irrevocably 
              submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
};

export default Terms;
