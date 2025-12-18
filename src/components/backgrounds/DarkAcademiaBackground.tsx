'use client';

export function DarkAcademiaBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Rich brown/sepia base */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #2c2416 0%, #1f1a14 50%, #15120e 100%)',
        }}
      />
      
      {/* Aged paper texture */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.6'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Bookshelf pattern hint */}
      <div 
        className="absolute inset-y-0 left-0 w-16 opacity-[0.06]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 80px,
              rgba(139,90,43,0.3) 80px,
              rgba(139,90,43,0.3) 82px
            )
          `,
        }}
      />
      <div 
        className="absolute inset-y-0 right-0 w-16 opacity-[0.06]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              transparent 80px,
              rgba(139,90,43,0.3) 80px,
              rgba(139,90,43,0.3) 82px
            )
          `,
        }}
      />
      
      {/* Warm candlelight glow - no blur */}
      <div
        className="absolute top-[10%] right-[15%] w-60 h-60 opacity-15"
        style={{ 
          background: 'radial-gradient(circle, #d4a574 0%, transparent 50%)',
        }}
      />
      
      {/* Secondary warm light */}
      <div
        className="absolute bottom-[30%] left-[20%] w-48 h-48 opacity-10"
        style={{ 
          background: 'radial-gradient(circle, #c9a86c 0%, transparent 50%)',
        }}
      />
      
      {/* Decorative frame corner - top left */}
      <div 
        className="absolute top-4 left-4 w-20 h-20 opacity-10"
        style={{
          borderTop: '2px solid #8b7355',
          borderLeft: '2px solid #8b7355',
        }}
      />
      
      {/* Decorative frame corner - bottom right */}
      <div 
        className="absolute bottom-4 right-4 w-20 h-20 opacity-10"
        style={{
          borderBottom: '2px solid #8b7355',
          borderRight: '2px solid #8b7355',
        }}
      />
      
      {/* Quill/feather hint */}
      <div 
        className="absolute bottom-[20%] right-[10%] w-1 h-16 opacity-10"
        style={{
          background: 'linear-gradient(to top, #4a3728 0%, transparent 100%)',
          transform: 'rotate(-20deg)',
        }}
      />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(15,12,8,0.7) 100%)',
        }}
      />
    </div>
  );
}
