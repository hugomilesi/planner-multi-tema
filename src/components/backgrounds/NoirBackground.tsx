'use client';

export function NoirBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base - deep black with subtle warm tint */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 50%, #050505 100%)',
        }}
      />
      
      {/* Film grain texture */}
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />
      
      {/* Venetian blinds shadow effect */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 30px,
            rgba(255,255,255,0.1) 30px,
            rgba(255,255,255,0.1) 32px,
            transparent 32px,
            transparent 60px
          )`,
          transform: 'rotate(-5deg) scale(1.2)',
        }}
      />
      
      {/* Dramatic spotlight from top-left */}
      <div
        className="absolute -top-20 -left-20 w-[80%] h-[60%] opacity-[0.12]"
        style={{ 
          background: 'radial-gradient(ellipse at 20% 20%, rgba(255,250,240,0.4) 0%, transparent 50%)',
        }}
      />
      
      {/* Secondary light from window */}
      <div
        className="absolute top-0 right-[20%] w-32 h-[120%] opacity-[0.04]"
        style={{ 
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
          transform: 'rotate(15deg)',
        }}
      />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.7) 100%)',
        }}
      />
      
      {/* Smoke/fog hint at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 opacity-20"
        style={{ 
          background: 'linear-gradient(to top, rgba(50,50,50,0.5) 0%, transparent 100%)',
        }}
      />
      
      {/* Corner shadow */}
      <div 
        className="absolute bottom-0 left-0 w-64 h-64"
        style={{
          background: 'radial-gradient(ellipse at 0% 100%, rgba(0,0,0,0.8) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
