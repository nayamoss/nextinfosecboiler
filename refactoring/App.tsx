
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { AuthProvider } from "@/hooks/use-auth";
import { RolesProvider } from "@/hooks/use-roles";
import { HelmetProvider } from 'react-helmet-async';
import ProtectedRoute from "@/components/ProtectedRoute";

import Index from "./pages/Index";
import ArticlePage from "./pages/ArticlePage";
import Dashboard from "./pages/Dashboard";
import DashboardSettings from "./pages/DashboardSettings";
import SeoSettings from "./pages/SeoSettings";
import ThemeSettings from "./pages/ThemeSettings";
import RoleManagement from "./pages/RoleManagement";
import AdvancedSettings from "./pages/AdvancedSettings";
import IntegrationsSettings from "./pages/IntegrationsSettings";
import DashboardNewsletters from "./pages/DashboardNewsletters";
import DashboardAuthors from "./pages/DashboardAuthors";
import NewsletterPage from "./pages/NewsletterPage";
import NewsletterDetailPage from "./pages/NewsletterDetailPage";
import PostEditForm from "./pages/PostEditForm";
import NewsletterEditForm from "./pages/NewsletterEditForm";
import AuthorEditForm from "./pages/AuthorEditForm";
import PostNewForm from "./pages/PostNewForm";
import NewsletterNewForm from "./pages/NewsletterNewForm";
import AuthorNewForm from "./pages/AuthorNewForm";
import Auth from "./pages/Auth";
import AuthCallback from "./pages/AuthCallback";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import ImageGenerator from "./pages/ImageGenerator";
import PaymentSuccess from "./pages/PaymentSuccess";
import Account from "./pages/Account";
import Sitemap from "./pages/Sitemap";
import AccessDenied from "./pages/AccessDenied";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import WriteForUs from "./pages/WriteForUs";

function App() {
  const queryClient = new QueryClient();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <RolesProvider>
              <ThemeProvider>
                <TooltipProvider>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/articles/:slug" element={<ArticlePage />} />
                    
                    {/* Dashboard routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                    
                    {/* Settings routes */}
                    <Route path="/dashboard/settings" element={<ProtectedRoute><DashboardSettings /></ProtectedRoute>} />
                    <Route path="/dashboard/settings/seo" element={<ProtectedRoute><SeoSettings /></ProtectedRoute>} />
                    <Route path="/dashboard/settings/theme" element={<ProtectedRoute><ThemeSettings /></ProtectedRoute>} />
                    <Route path="/dashboard/settings/roles" element={<ProtectedRoute requiredRoles={['admin']}><RoleManagement /></ProtectedRoute>} />
                    <Route path="/dashboard/settings/integrations" element={<ProtectedRoute requiredRoles={['admin']}><IntegrationsSettings /></ProtectedRoute>} />
                    <Route path="/dashboard/settings/advanced" element={<ProtectedRoute requiredRoles={['admin']}><AdvancedSettings /></ProtectedRoute>} />
                    
                    {/* Newsletter routes */}
                    <Route path="/dashboard/newsletters" element={<ProtectedRoute><DashboardNewsletters /></ProtectedRoute>} />
                    
                    {/* New page routes */}
                    <Route path="/about" element={<About />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/write-for-us" element={<WriteForUs />} />
                    
                    {/* Additional routes */}
                    
                  <Route path="/newsletters" element={<NewsletterPage />} />
                  <Route path="/newsletters/:id" element={<NewsletterDetailPage />} />
                  <Route path="/:slug" element={<ArticlePage />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/auth/callback" element={<AuthCallback />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/sitemap.xml" element={<Sitemap />} />
                  <Route path="/access-denied" element={<AccessDenied />} />
                  
                  {/* Protected routes */}
                  <Route path="/image-generator" element={
                    <ProtectedRoute requiredRoles={['admin', 'editor', 'author', 'professional', 'enterprise']}>
                      <ImageGenerator />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/account" element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  } />
                  
                  {/* Dashboard routes - all protected */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute requiredRoles={['admin', 'editor', 'author']}>
                      <Dashboard />
                    </ProtectedRoute>
                  }>
                    <Route path="settings" element={<DashboardSettings />} />
                    <Route path="settings/seo" element={<SeoSettings />} />
                    <Route path="settings/theme" element={<ThemeSettings />} />
                    <Route path="settings/roles" element={
                      <ProtectedRoute requiredRoles={['admin']}>
                        <RoleManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="settings/advanced" element={
                      <ProtectedRoute requiredRoles={['admin']}>
                        <AdvancedSettings />
                      </ProtectedRoute>
                    } />
                    <Route path="settings/integrations" element={
                      <ProtectedRoute requiredRoles={['admin']}>
                        <IntegrationsSettings />
                      </ProtectedRoute>
                    } />
                    <Route path="newsletters" element={<DashboardNewsletters />} />
                    <Route path="authors" element={<DashboardAuthors />} />
                    <Route path="posts/:id/edit" element={<PostEditForm />} />
                    <Route path="newsletters/:id/edit" element={<NewsletterEditForm />} />
                    <Route path="authors/:id/edit" element={<AuthorEditForm />} />
                    <Route path="newsletters/new" element={<NewsletterNewForm />} />
                    <Route path="posts/new" element={<PostNewForm />} />
                    <Route path="authors/new" element={<AuthorNewForm />} />
                  </Route>
                  
                  {/* Catch-all route for 404 */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                  
                  <Sonner position="top-right" />
                  <Toaster />
                </TooltipProvider>
              </ThemeProvider>
            </RolesProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
