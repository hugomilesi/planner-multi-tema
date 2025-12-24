import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/themes/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppShell } from '@/components/layout/AppShell';

// Pages
import DashboardPage from '@/pages/DashboardPage';
import LoginPage from '@/pages/LoginPage';
import TasksPage from '@/pages/TasksPage';
import FinancialPage from '@/pages/FinancialPage';
import SettingsPage from '@/pages/SettingsPage';

const Layout = ({ children }: { children: React.ReactNode }) => (
    <AppShell>{children}</AppShell>
);

export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />

                        {/* Protected Routes wrapped in Layout */}
                        <Route path="/" element={<Layout><DashboardPage /></Layout>} />

                        <Route path="/tasks" element={<Layout><TasksPage /></Layout>} />
                        <Route path="/financial" element={<Layout><FinancialPage /></Layout>} />
                        <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />

                        {/* Fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}
