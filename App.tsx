import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import Chatbot from './components/Chatbot';
import BlogPostPage from './pages/BlogPostPage';
import ContactModal from './components/ContactModal';
import Toast from './components/Toast';
import MetaManager from './components/MetaManager';
import { getPageMetadata, PageMetadata } from './seo';

// Admin imports
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import PortfolioManager from './pages/admin/PortfolioManager';
import BlogManager from './pages/admin/BlogManager';
import CareersManager from './pages/admin/CareersManager';

// Add this to avoid TypeScript errors for gtag
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
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
  const [metadata, setMetadata] = useState<PageMetadata>(getPageMetadata(location.pathname));

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
    // Update metadata when route changes
    setMetadata(getPageMetadata(location.pathname));
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
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

