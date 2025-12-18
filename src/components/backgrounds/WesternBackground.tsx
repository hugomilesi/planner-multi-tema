'use client';

export function WesternBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Desert sky gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #87ceeb 0%, #f4a460 40%, #daa520 60%, #cd853f 80%, #8b4513 100%)',
        }}
      />
      
      {/* Sun */}
      <div 
        className="absolute top-[15%] right-[20%] w-20 h-20 rounded-full"
        style={{
          background: 'radial-gradient(circle, #fff5e6 0%, #ffd700 30%, #ff8c00 100%)',
          boxShadow: '0 0 60px rgba(255,200,100,0.6), 0 0 100px rgba(255,150,50,0.3)',
        }}
      />
      
      {/* Distant mountains */}
      <div 
        className="absolute bottom-[35%] left-0 right-0 h-32"
        style={{
          background: `
            linear-gradient(150deg, transparent 30%, #a0522d 30%, #a0522d 32%, transparent 32%),
            linear-gradient(210deg, transparent 30%, #a0522d 30%, #a0522d 32%, transparent 32%),
            linear-gradient(160deg, transparent 40%, #8b4513 40%, #8b4513 42%, transparent 42%),
            linear-gradient(200deg, transparent 40%, #8b4513 40%, #8b4513 42%, transparent 42%)
          `,
          backgroundSize: '200px 100%, 200px 100%, 300px 100%, 300px 100%',
          backgroundPosition: '0 0, 100px 0, 150px 0, 350px 0',
          opacity: 0.6,
        }}
      />
      
      {/* Mesa/butte silhouette */}
      <div 
        className="absolute bottom-[25%] left-[10%] w-32 h-24"
        style={{
          background: '#5d3a1a',
          clipPath: 'polygon(10% 100%, 20% 30%, 30% 20%, 70% 20%, 80% 30%, 90% 100%)',
        }}
      />
      <div 
        className="absolute bottom-[25%] right-[15%] w-24 h-20"
        style={{
          background: '#4a2c0f',
          clipPath: 'polygon(5% 100%, 15% 40%, 25% 25%, 75% 25%, 85% 40%, 95% 100%)',
        }}
      />
      
      {/* Desert ground */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[25%]"
        style={{
          background: 'linear-gradient(180deg, #d2691e 0%, #cd853f 30%, #deb887 100%)',
        }}
      />
      
      {/* Sand texture */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[25%] opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Cactus silhouettes */}
      <div className="absolute bottom-[25%] left-[25%]">
        {/* Main stem */}
        <div className="w-4 h-20 bg-[#2d1810] rounded-t-full" />
        {/* Left arm */}
        <div className="absolute bottom-10 -left-3 w-3 h-8 bg-[#2d1810] rounded-t-full" style={{ transform: 'rotate(-15deg)' }} />
        <div className="absolute bottom-16 -left-4 w-3 h-6 bg-[#2d1810] rounded-t-full" />
        {/* Right arm */}
        <div className="absolute bottom-8 left-3 w-3 h-10 bg-[#2d1810] rounded-t-full" style={{ transform: 'rotate(10deg)' }} />
      </div>
      
      <div className="absolute bottom-[25%] right-[35%]">
        <div className="w-3 h-14 bg-[#3d2815] rounded-t-full" />
        <div className="absolute bottom-6 -left-2 w-2 h-6 bg-[#3d2815] rounded-t-full" style={{ transform: 'rotate(-20deg)' }} />
      </div>
      
      {/* Tumbleweed hint */}
      <div 
        className="absolute bottom-[26%] left-[60%] w-6 h-6 rounded-full opacity-40"
        style={{
          border: '2px solid #5d3a1a',
          background: 'radial-gradient(circle, transparent 40%, rgba(93,58,26,0.3) 100%)',
        }}
      />
      
      {/* Dust/haze at horizon */}
      <div 
        className="absolute bottom-[20%] left-0 right-0 h-20 opacity-30"
        style={{
          background: 'linear-gradient(to top, rgba(222,184,135,0.5) 0%, transparent 100%)',
        }}
      />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(60,30,10,0.3) 100%)',
        }}
      />
    </div>
  );
}
