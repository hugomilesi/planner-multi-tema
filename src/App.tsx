import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/themes/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppShell } from '@/components/layout/AppShell';
import { ToastProvider } from '@/components/ui/toast';

// Pages
import DashboardPage from '@/pages/DashboardPage';
import LoginPage from '@/pages/LoginPage';
import TasksPage from '@/pages/TasksPage';
import FinancialPage from '@/pages/FinancialPage';
import SettingsPage from '@/pages/SettingsPage';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <AppShell>{children}</AppShell>
);

function AnimatedRoutes({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  return (
    <div 
      key={location.pathname}
      className="animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      {children}
    </div>
  );
}

export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <ToastProvider>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />

                            {/* Protected Routes wrapped in Layout */}
                            <Route path="/" element={<Layout><AnimatedRoutes><DashboardPage /></AnimatedRoutes></Layout>} />

                            <Route path="/tasks" element={<Layout><AnimatedRoutes><TasksPage /></AnimatedRoutes></Layout>} />
                            <Route path="/financial" element={<Layout><AnimatedRoutes><FinancialPage /></AnimatedRoutes></Layout>} />
                            <Route path="/settings" element={<Layout><AnimatedRoutes><SettingsPage /></AnimatedRoutes></Layout>} />

                            {/* Fallback */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </ToastProvider>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}
