'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/themes/ThemeContext';
import { cn } from '@/lib/utils';

interface SplashScreenProps {
  isVisible: boolean;
}

export function SplashScreen({ isVisible }: SplashScreenProps) {
  const { reduceMotion } = useTheme();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: reduceMotion ? 0.1 : 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          }}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: Math.random() * 4 + 2,
                  height: Math.random() * 4 + 2,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: `rgba(${Math.random() > 0.5 ? '139, 92, 246' : '236, 72, 153'}, ${Math.random() * 0.5 + 0.2})`,
                }}
                animate={reduceMotion ? {} : {
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Gradient orbs */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
              top: '-20%',
              right: '-20%',
            }}
            animate={reduceMotion ? {} : {
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full opacity-30 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
              bottom: '-10%',
              left: '-10%',
            }}
            animate={reduceMotion ? {} : {
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Main content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0.1 : 0.8,
              delay: reduceMotion ? 0 : 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* Logo container */}
            <motion.div
              animate={reduceMotion ? {} : { 
                rotateY: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ perspective: 1000 }}
              className="relative mb-8"
            >
              <motion.div
                animate={reduceMotion ? {} : {
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 blur-lg opacity-60" />
                
                {/* Main icon container */}
                <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-2xl border border-white/20">
                  <span className="text-5xl">🦎</span>
                </div>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                  }}
                  animate={reduceMotion ? {} : {
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0.1 : 0.6,
                delay: reduceMotion ? 0 : 0.3,
              }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                Chamaleon
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: reduceMotion ? 0.1 : 0.5,
                  delay: reduceMotion ? 0 : 0.5,
                }}
                className="text-purple-200/80 text-lg font-light"
              >
                Multi-Theme Planner
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0.1 : 0.5,
              delay: reduceMotion ? 0 : 0.7,
            }}
            className="absolute bottom-16 w-48"
          >
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: 1.3,
                  ease: 'easeInOut',
                }}
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8 }}
              className="text-center text-white/50 text-xs mt-3"
            >
              Loading your workspace...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
