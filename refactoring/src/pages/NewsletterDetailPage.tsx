
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import PostDate from '@/components/PostDate';
import PostTag from '@/components/PostTag';
import ReadingTime from '@/components/ReadingTime';
import { Button } from '@/components/ui/button';

// Reuse the Newsletter type and dummy data from NewsletterPage
interface Newsletter {
  id: string;
  title: string;
  description: string;
  publish_date: string;
  content: string;
  tag: string;
}

const dummyNewsletters = [
  {
    id: "n1",
    title: "Security Weekly: New Vulnerabilities & Mitigations",
    description: "Your weekly digest of the latest security vulnerabilities, patches, and best practices.",
    publish_date: "2025-04-01T10:00:00Z",
    content: "# This Week in Security\n\nWelcome to our weekly security newsletter! Here's what happened this week:\n\n## Critical Vulnerabilities\n\n- CVE-2025-1234: A critical SQL injection vulnerability was discovered in PostgreSQL affecting versions prior to 16.2\n- CVE-2025-5678: Remote code execution vulnerability in a popular JavaScript library\n\n## Security Best Practices\n\n- Enable multi-factor authentication across all your services\n- Update your dependencies regularly\n- Implement proper error handling to prevent information leakage",
    tag: "Weekly"
  },
  {
    id: "n2",
    title: "AI Security Monthly: March 2025 Edition",
    description: "Monthly insights into AI security threats, research, and defensive techniques.",
    publish_date: "2025-03-15T14:30:00Z",
    content: "# AI Security Monthly\n\n## Emerging Threats\n\nThis month saw several new attack vectors targeting machine learning models:\n\n- Data poisoning attacks becoming more sophisticated\n- Model inversion attacks that can extract training data\n- Prompt injection attacks against LLMs\n\n## Defensive Techniques\n\n- Adversarial training is showing promising results\n- Differential privacy implementations are becoming more practical\n- New model monitoring techniques can detect unusual behavior",
    tag: "Monthly"
  },
  {
    id: "n3",
    title: "CISO Briefing: Q1 2025 Threat Landscape",
    description: "Executive summary of the major security threats and strategic responses for Q1 2025.",
    publish_date: "2025-02-28T09:15:00Z",
    content: "# CISO Quarterly Briefing\n\n## Executive Summary\n\nThe first quarter of 2025 has shown a 23% increase in targeted attacks against financial institutions and healthcare providers. State-sponsored threats continue to evolve, with new sophisticated supply chain attacks being the primary concern.\n\n## Strategic Recommendations\n\n1. Conduct a supply chain security assessment\n2. Implement zero trust architecture\n3. Increase security awareness training frequency\n4. Update incident response playbooks for ransomware scenarios",
    tag: "Quarterly"
  }
];

const useGetNewsletterById = (id: string) => {
  return useQuery({
    queryKey: ["newsletter", id],
    queryFn: async (): Promise<Newsletter | undefined> => {
      // Simulate network request delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return dummyNewsletters.find(newsletter => newsletter.id === id);
    },
    enabled: !!id,
  });
};

const NewsletterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: newsletter, isLoading } = useGetNewsletterById(id || '');

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!newsletter) {
    return (
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Newsletter not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 mb-4">
            <PostTag tag={newsletter.tag} />
            <PostDate dateString={newsletter.publish_date} />
            <ReadingTime content={newsletter.content} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{newsletter.title}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">{newsletter.description}</p>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-8">
          <ReactMarkdown>{newsletter.content}</ReactMarkdown>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mt-8">
          <h3 className="text-lg font-semibold mb-4">Subscribe to our Newsletter</h3>
          <p className="mb-4">Get the latest security insights delivered to your inbox</p>
          <div className="flex gap-4">
            <Button>Subscribe Now</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterDetailPage;
