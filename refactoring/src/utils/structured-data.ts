
export interface ArticleStructuredData {
  title: string;
  description: string;
  imageUrl: string;
  authorName: string;
  publisherName: string;
  publisherLogo: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}

export interface OrganizationStructuredData {
  name: string;
  url: string;
  logo: string;
  description: string;
  socialProfiles?: string[];
}

export const generateArticleSchema = (data: ArticleStructuredData): object => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.description,
    "image": data.imageUrl,
    "author": {
      "@type": "Person",
      "name": data.authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": data.publisherName,
      "logo": {
        "@type": "ImageObject",
        "url": data.publisherLogo
      }
    },
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    }
  };
};

export const generateOrganizationSchema = (data: OrganizationStructuredData): object => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": data.name,
    "url": data.url,
    "logo": data.logo,
    "description": data.description,
    ...(data.socialProfiles && {
      "sameAs": data.socialProfiles
    })
  };
};

export const generateBreadcrumbSchema = (items: {name: string, url: string}[]): object => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};
