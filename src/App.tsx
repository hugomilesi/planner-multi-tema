import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/themes/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppShell } from '@/components/layout/AppShell';

// Pages
import DashboardPage from '@/pages/DashboardPage';
import LoginPage from '@/pages/LoginPage';
import TasksPage from '@/pages/TasksPage';
import FinancialPage from '@/pages/FinancialPage';
import SettingsPage from '@/pages/SettingsPage';

// Animated outlet with CSS transitions
function AnimatedOutlet() {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState('fadeIn');

    useEffect(() => {
        if (location.pathname !== displayLocation.pathname) {
            setTransitionStage('fadeOut');
        }
    }, [location, displayLocation]);

    const handleAnimationEnd = () => {
        if (transitionStage === 'fadeOut') {
            setDisplayLocation(location);
            setTransitionStage('fadeIn');
        }
    };

    return (
        <div
            className={`page-transition ${transitionStage}`}
            onAnimationEnd={handleAnimationEnd}
        >
            <Outlet />
        </div>
    );
}

// Layout wrapper with persistent AppShell
function ProtectedLayout() {
    return (
        <AppShell>
            <AnimatedOutlet />
        </AppShell>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />

                        {/* Protected Routes with persistent layout */}
                        <Route element={<ProtectedLayout />}>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/tasks" element={<TasksPage />} />
                            <Route path="/financial" element={<FinancialPage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                        </Route>

                        {/* Fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}
