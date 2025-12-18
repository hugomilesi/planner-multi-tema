'use client';

export function KawaiiBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Soft pastel gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #fff0f5 0%, #fce7f3 25%, #e0e7ff 50%, #dbeafe 75%, #f0fdf4 100%)',
        }}
      />
      
      {/* Polka dots pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            radial-gradient(circle, #f472b6 4px, transparent 4px),
            radial-gradient(circle, #a78bfa 3px, transparent 3px),
            radial-gradient(circle, #60a5fa 3px, transparent 3px)
          `,
          backgroundSize: '60px 60px, 80px 80px, 100px 100px',
          backgroundPosition: '0 0, 30px 30px, 15px 45px',
        }}
      />
      
      {/* Fluffy cloud 1 */}
      <div className="absolute top-[10%] left-[5%]">
        <div className="relative">
          <div className="w-20 h-12 bg-white/60 rounded-full" />
          <div className="absolute -top-4 left-4 w-14 h-14 bg-white/60 rounded-full" />
          <div className="absolute -top-2 left-12 w-10 h-10 bg-white/60 rounded-full" />
        </div>
      </div>
      
      {/* Fluffy cloud 2 */}
      <div className="absolute top-[20%] right-[10%]">
        <div className="relative">
          <div className="w-24 h-14 bg-white/50 rounded-full" />
          <div className="absolute -top-5 left-5 w-16 h-16 bg-white/50 rounded-full" />
          <div className="absolute -top-3 left-14 w-12 h-12 bg-white/50 rounded-full" />
        </div>
      </div>
      
      {/* Rainbow arc */}
      <div 
        className="absolute bottom-[20%] right-[5%] w-40 h-20 opacity-30"
        style={{
          background: 'linear-gradient(180deg, #ef4444 0%, #f97316 16%, #eab308 32%, #22c55e 48%, #3b82f6 64%, #8b5cf6 80%, #ec4899 100%)',
          borderRadius: '100px 100px 0 0',
          maskImage: 'radial-gradient(ellipse 100% 100% at 50% 100%, transparent 60%, black 61%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 100% at 50% 100%, transparent 60%, black 61%)',
        }}
      />
      
      {/* Cute star decorations */}
      <div 
        className="absolute top-[30%] left-[15%] w-6 h-6 opacity-40"
        style={{
          background: '#fbbf24',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        }}
      />
      <div 
        className="absolute top-[50%] right-[25%] w-4 h-4 opacity-30"
        style={{
          background: '#f472b6',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        }}
      />
      
      {/* Heart decorations */}
      <div 
        className="absolute bottom-[40%] left-[20%] w-5 h-5 opacity-25"
        style={{
          background: '#f472b6',
          transform: 'rotate(-45deg)',
          borderRadius: '0 50% 0 50%',
        }}
      >
        <div className="absolute -top-[10px] left-0 w-5 h-5 bg-[#f472b6] rounded-full" />
        <div className="absolute top-0 left-[10px] w-5 h-5 bg-[#f472b6] rounded-full" />
      </div>
      
      {/* Sparkle dots */}
      <div className="absolute top-[15%] left-[40%] w-2 h-2 bg-yellow-300/50 rounded-full" />
      <div className="absolute top-[45%] left-[70%] w-1.5 h-1.5 bg-pink-300/50 rounded-full" />
      <div className="absolute top-[60%] left-[30%] w-2 h-2 bg-purple-300/40 rounded-full" />
      <div className="absolute top-[25%] right-[30%] w-1.5 h-1.5 bg-blue-300/50 rounded-full" />
    </div>
  );
}
