
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface SeoSettings {
  siteTitle: string;
  siteDescription: string;
  ogImageUrl: string;
  twitterHandle: string;
  publisherName: string;
  publisherLogo: string;
  publisherDescription: string;
  robotsTxt: string;
  pageMetaTemplate: string;
  postMetaTemplate: string;
  newsletterMetaTemplate: string;
  blogSchema: string;
  articleSchema: string;
  organizationSchema: string;
  canonicalFormat: string;
}

const defaultSettings: SeoSettings = {
  siteTitle: 'Security for the Rest of Us',
  siteDescription: 'Essential security guides and best practices for developers',
  ogImageUrl: '',
  twitterHandle: '',
  publisherName: 'Security for the Rest of Us',
  publisherLogo: '',
  publisherDescription: '',
  robotsTxt: '',
  pageMetaTemplate: '<title>{title} | {site_name}</title>',
  postMetaTemplate: '<title>{title} | {site_name}</title>',
  newsletterMetaTemplate: '<title>{title} | {site_name}</title>',
  blogSchema: '{"@context":"https://schema.org","@type":"Blog"}',
  articleSchema: '{"@context":"https://schema.org","@type":"Article"}',
  organizationSchema: '{"@context":"https://schema.org","@type":"Organization"}',
  canonicalFormat: 'https://yourdomain.com/{slug}'
};

export const useSeoSettings = () => {
  const [settings, setSettings] = useState<SeoSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // You would typically fetch this from a Supabase table or another storage
      // For now, we'll just use the default settings
      // This can be extended to actually fetch from a real data source
      
      // Simulate an API call
      setTimeout(() => {
        setSettings(defaultSettings);
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error('Error fetching SEO settings:', err);
      setError('Failed to load SEO settings');
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: Partial<SeoSettings>) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, you would save these to your database
      // For now, we'll just update the local state
      setSettings({ ...settings, ...newSettings });
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error updating SEO settings:', err);
      setError('Failed to update SEO settings');
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    updateSettings,
    refreshSettings: fetchSettings
  };
};
