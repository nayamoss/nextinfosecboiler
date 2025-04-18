import { Post } from "@/hooks/use-posts";
import { EnrichedPost } from "@/hooks/use-research";

export interface Newsletter {
  id: string;
  title: string;
  description: string;
  publish_date: string;
  content: string;
  tag: string;
  status: string;
}

export const dummyPosts: Post[] = [
  {
    id: "1",
    title: "Securing Your Web Applications Against Common Vulnerabilities",
    meta_description: "Learn about the OWASP Top 10 and how to protect your applications from common security threats.",
    publish_date: "2025-03-15T10:00:00Z",
    header_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    slug: "web-app-security-basics",
    tag: "Basics",
    status: "golive",
    content: "# Securing Your Web Applications\n\nIn this guide, we'll explore the most common security vulnerabilities and how to prevent them.\n\n## The OWASP Top 10\n\nThe OWASP Top 10 is a standard awareness document for developers about the most critical security risks to web applications.\n\n1. Injection\n2. Broken Authentication\n3. Sensitive Data Exposure\n4. XML External Entities\n5. Broken Access Control\n6. Security Misconfiguration\n7. Cross-Site Scripting\n8. Insecure Deserialization\n9. Using Components with Known Vulnerabilities\n10. Insufficient Logging & Monitoring"
  },
  {
    id: "2",
    title: "Best Practices for API Security",
    meta_description: "Essential guidelines for building and maintaining secure APIs in modern applications.",
    publish_date: "2025-03-10T14:30:00Z",
    header_image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
    slug: "api-security-best-practices",
    tag: "Best Practice",
    status: "golive",
    content: "# API Security Best Practices\n\nSecuring your APIs is critical for protecting sensitive data and ensuring the integrity of your application.\n\n## Key Security Measures\n\n- Use HTTPS for all API endpoints\n- Implement proper authentication and authorization\n- Rate limiting to prevent abuse\n- Input validation to prevent injection attacks\n- Monitor API usage for suspicious activity"
  },
  {
    id: "3",
    title: "Understanding Encryption in Modern Applications",
    meta_description: "A deep dive into encryption methods and how to implement them in your applications.",
    publish_date: "2025-02-28T09:15:00Z",
    header_image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    slug: "encryption-explained",
    tag: "Encryption",
    status: "golive",
    content: "# Understanding Encryption\n\nEncryption is the process of encoding information to prevent unauthorized access.\n\n## Types of Encryption\n\n### Symmetric Encryption\nUses the same key for encryption and decryption. Examples include AES, DES, and Blowfish.\n\n### Asymmetric Encryption\nUses a pair of keys (public and private). Examples include RSA, ECC, and DSA.\n\n### Hashing\nOne-way transformation of data. Examples include SHA-256, MD5 (not recommended), and bcrypt."
  },
  {
    id: "4",
    title: "Secure Coding Practices for JavaScript Developers",
    meta_description: "Learn how to write more secure JavaScript code and avoid common security pitfalls.",
    publish_date: "2025-02-15T11:45:00Z",
    header_image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    slug: "secure-javascript-coding",
    tag: "Coding",
    status: "golive",
    content: "# Secure JavaScript Coding Practices\n\nJavaScript security is critical for both front-end and back-end development.\n\n## Best Practices\n\n- Avoid eval() and new Function()\n- Use Content Security Policy (CSP)\n- Sanitize user input\n- Use HTTPS for all communications\n- Keep dependencies updated\n- Implement proper authentication and authorization"
  },
  {
    id: "5",
    title: "AI Security Challenges and Solutions",
    meta_description: "Explore the unique security challenges posed by AI systems and how to address them.",
    publish_date: "2025-01-20T16:00:00Z",
    header_image: "https://images.unsplash.com/photo-1677442135193-675d169624a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
    slug: "ai-security-challenges",
    tag: "AI",
    status: "golive",
    content: "# AI Security Challenges and Solutions\n\nAs AI becomes more prevalent, understanding its security implications is critical.\n\n## Key Challenges\n\n- Data poisoning attacks\n- Model inversion attacks\n- Adversarial examples\n- Privacy concerns\n- Bias and fairness issues\n\n## Solutions\n\n- Robust model training\n- Differential privacy\n- Regular security audits\n- Explainable AI\n- Human oversight"
  },
  {
    id: "6",
    title: "Securing Containerized Applications",
    meta_description: "Best practices for securing Docker containers and Kubernetes deployments.",
    publish_date: "2025-04-05T13:20:00Z",
    header_image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    slug: "container-security",
    tag: "Deployments",
    status: "golive",
    content: "# Securing Containerized Applications\n\nContainers offer many benefits but require specific security considerations.\n\n## Docker Security\n\n- Use minimal base images\n- Run containers as non-root\n- Implement least privilege principles\n- Scan images for vulnerabilities\n- Keep images updated\n\n## Kubernetes Security\n\n- Network policies\n- Pod security policies\n- RBAC implementation\n- Secrets management\n- Regular security audits"
  },
  {
    id: "7",
    title: "Data Protection Strategies for Applications",
    meta_description: "Comprehensive approaches to protecting sensitive data in your applications.",
    publish_date: "2024-12-10T08:30:00Z",
    header_image: "https://images.unsplash.com/photo-1563968743333-044cef800172?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    slug: "data-protection-strategies",
    tag: "Data Protection",
    status: "golive",
    content: "# Data Protection Strategies\n\nProtecting sensitive data is a critical aspect of application security.\n\n## Key Strategies\n\n- Data classification\n- Encryption at rest and in transit\n- Access controls\n- Data minimization\n- Regular security audits\n- Compliance with regulations (GDPR, CCPA, etc.)"
  },
  {
    id: "8",
    title: "Authentication Methods Compared",
    meta_description: "An analysis of different authentication methods and their security implications.",
    publish_date: "2025-01-05T15:45:00Z",
    header_image: "https://images.unsplash.com/photo-1633265486501-0cf524a07213?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    slug: "authentication-methods-compared",
    tag: "Basics",
    status: "draft",
    content: "# Authentication Methods Compared\n\nChoosing the right authentication method is critical for application security.\n\n## Common Methods\n\n### Username/Password\n- Pros: Familiar to users\n- Cons: Password fatigue, poor password habits\n\n### Multi-Factor Authentication (MFA)\n- Pros: Significantly improves security\n- Cons: Added friction for users\n\n### OAuth and OpenID Connect\n- Pros: Delegated authorization, reduced password fatigue\n- Cons: Reliance on third-party providers\n\n### Passwordless Authentication\n- Pros: Improved user experience, can be more secure\n- Cons: Implementation complexity, device dependencies"
  }
];

export const dummyEnrichedPosts: EnrichedPost[] = [
  {
    ...dummyPosts[0],
    enriched_data: {
      github: {
        stars: 2345,
        forks: 540,
        lastCommit: "2025-03-01",
        contributors: 42
      },
      related_resources: [
        {
          title: "OWASP Top 10",
          url: "https://owasp.org/www-project-top-ten/"
        },
        {
          title: "Web Security Academy",
          url: "https://portswigger.net/web-security"
        }
      ],
      reading_time: "8 min"
    }
  },
  {
    ...dummyPosts[1],
    enriched_data: {
      github: {
        stars: 1820,
        forks: 320,
        lastCommit: "2025-02-15",
        contributors: 28
      },
      related_resources: [
        {
          title: "API Security Checklist",
          url: "https://github.com/shieldfy/API-Security-Checklist"
        },
        {
          title: "REST API Security",
          url: "https://restfulapi.net/security-essentials/"
        }
      ],
      reading_time: "7 min"
    }
  },
  {
    ...dummyPosts[2],
    enriched_data: {
      github: {
        stars: 3280,
        forks: 780,
        lastCommit: "2025-01-20",
        contributors: 65
      },
      related_resources: [
        {
          title: "Cryptography Basics",
          url: "https://www.crypto101.io/"
        },
        {
          title: "Modern Encryption Standards",
          url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-175Br.pdf"
        }
      ],
      reading_time: "10 min"
    }
  },
  {
    ...dummyPosts[3],
    enriched_data: {
      github: {
        stars: 1590,
        forks: 280,
        lastCommit: "2025-02-05",
        contributors: 31
      },
      related_resources: [
        {
          title: "JavaScript Security Best Practices",
          url: "https://snyk.io/learn/javascript-security/"
        },
        {
          title: "OWASP JavaScript Security Guide",
          url: "https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html"
        }
      ],
      reading_time: "6 min"
    }
  },
  {
    ...dummyPosts[4],
    enriched_data: {
      github: {
        stars: 2760,
        forks: 520,
        lastCommit: "2024-12-10",
        contributors: 48
      },
      related_resources: [
        {
          title: "AI Security and Privacy Guide",
          url: "https://www.microsoft.com/en-us/research/project/ai-security-and-privacy-guide/"
        },
        {
          title: "Adversarial Machine Learning",
          url: "https://adversarial-ml-tutorial.org/"
        }
      ],
      reading_time: "9 min"
    }
  }
];

export const dummyDashboardPosts = [
  ...dummyPosts,
  {
    id: "9",
    title: "Implementing Zero Trust Architecture",
    meta_description: "A comprehensive guide to implementing Zero Trust security principles in your organization.",
    publish_date: "2025-04-10T10:00:00Z",
    header_image: "https://images.unsplash.com/photo-1491975474562-1f4e30bc9468?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    slug: "zero-trust-architecture",
    tag: "Best Practice",
    status: "review",
    content: "# Zero Trust Architecture Implementation\n\nThe Zero Trust security model assumes no user or system is trusted by default, whether inside or outside the network perimeter.\n\n## Core Principles\n\n- Verify explicitly\n- Use least privilege access\n- Assume breach\n\n## Implementation Steps\n\n1. Identify sensitive data and assets\n2. Map the transaction flows\n3. Architect a Zero Trust network\n4. Create a strong policy\n5. Monitor and maintain the environment"
  },
  {
    id: "10",
    title: "Quantum Computing and Cryptography",
    meta_description: "How quantum computing will impact current cryptographic standards and what to do about it.",
    publish_date: "",
    header_image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    slug: "quantum-cryptography",
    tag: "Encryption",
    status: "draft",
    content: "# Quantum Computing and Cryptography\n\nQuantum computing poses significant challenges to current cryptographic standards.\n\n## Impact on Current Cryptography\n\n- RSA and ECC potentially vulnerable to Shor's algorithm\n- Symmetric encryption less affected but requires larger key sizes\n- Hash functions potentially weakened\n\n## Post-Quantum Cryptography\n\n- Lattice-based cryptography\n- Hash-based cryptography\n- Code-based cryptography\n- Multivariate polynomial cryptography\n- Supersingular elliptic curve isogeny cryptography"
  }
];

export const dummyNewsletters: Newsletter[] = [
  {
    id: "n1",
    title: "Security Weekly: New Vulnerabilities & Mitigations",
    description: "Your weekly digest of the latest security vulnerabilities, patches, and best practices.",
    publish_date: "2025-04-01T10:00:00Z",
    content: "# This Week in Security\n\nWelcome to our weekly security newsletter! Here's what happened this week:\n\n## Critical Vulnerabilities\n\n- CVE-2025-1234: A critical SQL injection vulnerability was discovered in PostgreSQL affecting versions prior to 16.2\n- CVE-2025-5678: Remote code execution vulnerability in a popular JavaScript library\n\n## Security Best Practices\n\n- Enable multi-factor authentication across all your services\n- Update your dependencies regularly\n- Implement proper error handling to prevent information leakage",
    tag: "Weekly",
    status: "published"
  },
  {
    id: "n2",
    title: "AI Security Monthly: March 2025 Edition",
    description: "Monthly insights into AI security threats, research, and defensive techniques.",
    publish_date: "2025-03-15T14:30:00Z",
    content: "# AI Security Monthly\n\n## Emerging Threats\n\nThis month saw several new attack vectors targeting machine learning models:\n\n- Data poisoning attacks becoming more sophisticated\n- Model inversion attacks that can extract training data\n- Prompt injection attacks against LLMs\n\n## Defensive Techniques\n\n- Adversarial training is showing promising results\n- Differential privacy implementations are becoming more practical\n- New model monitoring techniques can detect unusual behavior",
    tag: "Monthly",
    status: "published"
  },
  {
    id: "n3",
    title: "CISO Briefing: Q1 2025 Threat Landscape",
    description: "Executive summary of the major security threats and strategic responses for Q1 2025.",
    publish_date: "2025-02-28T09:15:00Z",
    content: "# CISO Quarterly Briefing\n\n## Executive Summary\n\nThe first quarter of 2025 has shown a 23% increase in targeted attacks against financial institutions and healthcare providers. State-sponsored threats continue to evolve, with new sophisticated supply chain attacks being the primary concern.\n\n## Strategic Recommendations\n\n1. Conduct a supply chain security assessment\n2. Implement zero trust architecture\n3. Increase security awareness training frequency\n4. Update incident response playbooks for ransomware scenarios",
    tag: "Quarterly",
    status: "published"
  },
  {
    id: "n4",
    title: "Ransomware Defense Bulletin",
    description: "Urgent updates on emerging ransomware threats and effective countermeasures.",
    publish_date: "2025-01-20T12:00:00Z",
    content: "# Ransomware Defense Bulletin\n\n## Alert: New Ransomware Strain Detected\n\nA new ransomware strain, dubbed 'CryptoLock', has been detected targeting healthcare and financial sectors. This ransomware uses advanced encryption techniques and exploits zero-day vulnerabilities.\n\n## Mitigation Strategies\n\n- Apply the latest security patches immediately\n- Implement application whitelisting\n- Ensure offline backups are current and tested\n- Conduct employee training on phishing awareness",
    tag: "Alert",
    status: "draft"
  },
  {
    id: "n5",
    title: "Cloud Security Insights",
    description: "Best practices and guidance for securing multi-cloud environments.",
    publish_date: "",
    content: "# Cloud Security Insights\n\n## Multi-Cloud Security Challenges\n\nOrganizations using multiple cloud providers face unique security challenges including:\n\n- Inconsistent security controls across providers\n- Difficulty maintaining visibility across environments\n- Complex identity and access management\n\n## Recommended Approaches\n\n- Implement cloud security posture management\n- Use infrastructure as code with security checks\n- Establish consistent security policies across clouds\n- Deploy cloud-native security tools with multi-cloud support",
    tag: "Cloud",
    status: "draft"
  }
];
