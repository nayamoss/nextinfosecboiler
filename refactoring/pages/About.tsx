
import React from 'react';
import SiteLayout from '@/components/SiteLayout';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <SiteLayout>
      <Helmet>
        <title>About Us | Security for the Rest of Us</title>
        <meta name="description" content="Learn about our mission to make security accessible to everyone." />
      </Helmet>

      <div className="container max-w-4xl py-12">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground">
              At Security for the Rest of Us, we believe security knowledge should be accessible to everyone, not just specialists. 
              Our mission is to demystify cybersecurity and provide practical, straightforward guidance for developers, 
              business owners, and everyday users.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
            <p className="text-lg text-muted-foreground">
              We're a team of security professionals who are passionate about education. 
              We've worked in the trenches of application security, network defense, and cyber risk management, 
              and now we're translating that experience into clear, actionable advice.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <p className="text-lg text-muted-foreground">
              Through our blog posts, newsletters, and resources, we cover essential security topics in plain language. 
              We focus on practical advice that you can implement today to improve your security posture.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc pl-6 text-lg text-muted-foreground space-y-2">
              <li><span className="font-medium">Accessibility:</span> Security advice should be understandable by everyone.</li>
              <li><span className="font-medium">Practicality:</span> We focus on real-world solutions, not theoretical perfection.</li>
              <li><span className="font-medium">Honesty:</span> We're transparent about risks and tradeoffs.</li>
              <li><span className="font-medium">Empowerment:</span> Our goal is to help you make informed decisions about your security.</li>
            </ul>
          </section>
        </div>
      </div>
    </SiteLayout>
  );
};

export default About;
