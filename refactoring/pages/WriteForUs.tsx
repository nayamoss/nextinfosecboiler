
import React from 'react';
import SiteLayout from '@/components/SiteLayout';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Pen, CheckCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const WriteForUs = () => {
  return (
    <SiteLayout>
      <Helmet>
        <title>Write for Us | Security for the Rest of Us</title>
        <meta name="description" content="Join our team of contributors and share your security knowledge with our audience." />
      </Helmet>

      <div className="container max-w-4xl py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Write for Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your security expertise with our audience and help make security knowledge more accessible to everyone.
          </p>
        </div>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Why Write for Security for the Rest of Us?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Reach a Growing Audience</h3>
                <p className="text-muted-foreground">
                  Our articles reach thousands of developers and security enthusiasts every month.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Build Your Reputation</h3>
                <p className="text-muted-foreground">
                  Establish yourself as a thought leader in the security space.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-lg mb-2">Get Compensated</h3>
                <p className="text-muted-foreground">
                  We pay competitive rates for high-quality security content.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">What We're Looking For</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We publish content that makes security concepts accessible to developers and non-specialists. Some of our popular topics include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
              <li>Web application security best practices</li>
              <li>Secure coding tutorials</li>
              <li>Explanations of common vulnerabilities</li>
              <li>Security tool reviews and comparisons</li>
              <li>Case studies and real-world security incidents</li>
              <li>Security for specific frameworks and technologies</li>
            </ul>
            <p className="text-lg text-muted-foreground">
              Our ideal content is practical, actionable, and written in plain language. We value tutorials, step-by-step guides, and concrete examples over theoretical discussions.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6">How to Submit</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="text-lg mb-4">
                Ready to contribute? Send us a brief pitch outlining your article idea, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Proposed title</li>
                <li>Brief outline (2-3 paragraphs)</li>
                <li>Why our audience would find it valuable</li>
                <li>Your relevant experience/expertise</li>
              </ul>
              <div className="flex justify-center">
                <Button asChild size="lg">
                  <Link to="/contact">
                    <Mail className="mr-2 h-5 w-5" /> Submit Your Pitch
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
};

export default WriteForUs;
