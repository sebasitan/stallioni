import React, { useState, useEffect, createContext, useContext, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import ContactModal from './components/ContactModal';
import Toast from './components/Toast';
import MetaManager from './components/MetaManager';
import { getPageMetadata, PageMetadata, defaultMetadata } from './seo';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy Load Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));

// Admin imports (Lazy)
import { AuthProvider as StaticAuthProvider } from './contexts/AuthContext';


const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminHome = lazy(() => import('./pages/admin/AdminHome'));
const PortfolioManager = lazy(() => import('./pages/admin/PortfolioManager'));
const BlogManager = lazy(() => import('./pages/admin/BlogManager'));
const CareersManager = lazy(() => import('./pages/admin/CareersManager'));

// Add this to avoid TypeScript errors for gtag
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
    grecaptcha?: any;
  }
}

// --- Modal Context ---
type ModalType = 'Consultation' | 'Quote';

interface ModalContextType {
  isModalOpen: boolean;
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
// --- End Modal Context ---

// --- Toast Context ---
interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
// --- End Toast Context ---


// Create a context for navigation
interface NavigationContextType {
  navigate: (path: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

// App Content Component (uses hooks)
const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [metadata, setMetadata] = useState<PageMetadata>({
    ...defaultMetadata,
    ogUrl: 'https://stallioni.com',
    structuredData: ''
  });

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('Consultation');

  const openModal = (type: ModalType) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // --- End Modal State ---

  // --- Toast State ---
  const [toast, setToast] = useState<{ id: number; message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    // Use a unique ID to re-trigger the Toast component animation
    setToast({ id: Date.now(), message, type });
  };

  const closeToast = () => {
    setToast(null);
  }
  // --- End Toast State ---

  useEffect(() => {
    // Update metadata when route changes (async)
    getPageMetadata(location.pathname).then(setMetadata);
    window.scrollTo(0, 0);

    // --- Google Analytics SPA Pageview Tracking ---
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-WZ2SZ03V71', {
        'page_path': location.pathname,
      });
    }
  }, [location]);

  const navigationValue = {
    navigate: (path: string) => navigate(path)
  };

  const modalValue = {
    isModalOpen,
    modalType,
    openModal,
    closeModal
  };

  const toastValue = {
    showToast
  };

  return (
    <NavigationContext.Provider value={navigationValue}>
      <ModalContext.Provider value={modalValue}>
        <ToastContext.Provider value={toastValue}>
          <MetaManager {...metadata} />
          <div className="flex flex-col min-h-screen">
            <Header currentRoute={location.pathname} />
            <main className="flex-grow">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:serviceId" element={<ServicesPage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:postId" element={<BlogPostPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* Admin routes */}
                  <Route path="/seba/login" element={<AdminLogin />} />
                  <Route path="/seba" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }>
                    <Route index element={<AdminHome />} />
                    <Route path="portfolio" element={<PortfolioManager />} />
                    <Route path="blog" element={<BlogManager />} />
                    <Route path="careers" element={<CareersManager />} />
                  </Route>
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <Chatbot />
            <ContactModal
              isOpen={isModalOpen}
              onClose={closeModal}
              modalType={modalType}
            />
            {toast && <Toast key={toast.id} message={toast.message} type={toast.type} onClose={closeToast} />}
          </div>
        </ToastContext.Provider>
      </ModalContext.Provider>
    </NavigationContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <StaticAuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </StaticAuthProvider>
  );
};

export default App;

