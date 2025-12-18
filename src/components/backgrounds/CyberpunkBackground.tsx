'use client';

export function CyberpunkBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base dark gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0a0a12 0%, #12081a 50%, #0d0d18 100%)',
        }}
      />
      
      {/* Neon grid floor */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[60%]"
        style={{
          background: `
            linear-gradient(to bottom, transparent 0%, rgba(255,0,255,0.03) 100%),
            repeating-linear-gradient(90deg, transparent 0px, transparent 79px, rgba(255,0,255,0.15) 79px, rgba(255,0,255,0.15) 80px),
            repeating-linear-gradient(0deg, transparent 0px, transparent 39px, rgba(255,0,255,0.1) 39px, rgba(255,0,255,0.1) 40px)
          `,
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top',
        }}
      />
      
      {/* Scanlines overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 4px)',
        }}
      />
      
      {/* Neon glow - magenta - using CSS gradient instead of blur */}
      <div
        className="absolute -left-20 top-1/4 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ 
          background: 'radial-gradient(circle, #ff00ff 0%, transparent 50%)',
        }}
      />
      
      {/* Neon glow - cyan */}
      <div
        className="absolute -right-20 top-1/3 w-[400px] h-[400px] rounded-full opacity-15"
        style={{ 
          background: 'radial-gradient(circle, #00ffff 0%, transparent 50%)',
        }}
      />
      
      {/* City silhouette hint */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 opacity-20"
        style={{
          background: `
            linear-gradient(90deg, 
              transparent 0%, 
              #ff00ff22 10%, 
              transparent 20%,
              #00ffff22 40%,
              transparent 50%,
              #ff00ff22 70%,
              transparent 80%,
              #00ffff22 90%,
              transparent 100%
            )
          `,
        }}
      />
      
      {/* Corner accent */}
      <div 
        className="absolute top-0 right-0 w-64 h-64"
        style={{
          background: 'linear-gradient(225deg, rgba(255,0,255,0.1) 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
