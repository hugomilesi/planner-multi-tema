'use client';

export function OceanBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep ocean gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0c4a6e 0%, #0e7490 30%, #155e75 60%, #164e63 100%)',
        }}
      />
      
      {/* Light rays from surface - no blur for performance */}
      <div 
        className="absolute top-0 left-[20%] w-40 h-[80%] opacity-[0.06]"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
          transform: 'rotate(5deg)',
        }}
      />
      <div 
        className="absolute top-0 left-[50%] w-32 h-[70%] opacity-[0.04]"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
          transform: 'rotate(-3deg)',
        }}
      />
      <div 
        className="absolute top-0 right-[25%] w-28 h-[60%] opacity-[0.04]"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)',
          transform: 'rotate(8deg)',
        }}
      />
      
      {/* Caustic light patterns */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 100px 60px at 20% 30%, rgba(255,255,255,0.3), transparent),
            radial-gradient(ellipse 80px 50px at 60% 20%, rgba(255,255,255,0.2), transparent),
            radial-gradient(ellipse 120px 70px at 80% 50%, rgba(255,255,255,0.25), transparent),
            radial-gradient(ellipse 90px 55px at 40% 60%, rgba(255,255,255,0.2), transparent)
          `,
        }}
      />
      
      {/* Bubble hints */}
      <div className="absolute bottom-[30%] left-[15%] w-3 h-3 rounded-full border border-white/20 bg-white/5" />
      <div className="absolute bottom-[45%] left-[20%] w-2 h-2 rounded-full border border-white/15 bg-white/5" />
      <div className="absolute bottom-[25%] right-[30%] w-4 h-4 rounded-full border border-white/20 bg-white/5" />
      <div className="absolute bottom-[50%] right-[20%] w-2.5 h-2.5 rounded-full border border-white/15 bg-white/5" />
      <div className="absolute bottom-[60%] left-[40%] w-2 h-2 rounded-full border border-white/10 bg-white/5" />
      
      {/* Seaweed silhouettes */}
      <div 
        className="absolute bottom-0 left-[10%] w-8 h-40 opacity-20"
        style={{
          background: 'linear-gradient(to top, #0f766e 0%, transparent 100%)',
          borderRadius: '50% 50% 0 0',
          transform: 'rotate(-5deg)',
        }}
      />
      <div 
        className="absolute bottom-0 left-[15%] w-6 h-32 opacity-15"
        style={{
          background: 'linear-gradient(to top, #0f766e 0%, transparent 100%)',
          borderRadius: '50% 50% 0 0',
          transform: 'rotate(8deg)',
        }}
      />
      <div 
        className="absolute bottom-0 right-[12%] w-7 h-36 opacity-18"
        style={{
          background: 'linear-gradient(to top, #0f766e 0%, transparent 100%)',
          borderRadius: '50% 50% 0 0',
          transform: 'rotate(-3deg)',
        }}
      />
      
      {/* Sandy bottom hint */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-20 opacity-30"
        style={{
          background: 'linear-gradient(to top, #854d0e 0%, transparent 100%)',
        }}
      />
      
      {/* Fish silhouette */}
      <div 
        className="absolute top-[40%] right-[15%] opacity-10"
        style={{
          width: '30px',
          height: '12px',
          background: '#0f172a',
          borderRadius: '50% 20% 20% 50%',
          position: 'relative',
        }}
      >
        <div 
          style={{
            position: 'absolute',
            right: '-8px',
            top: '2px',
            width: '0',
            height: '0',
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: '10px solid #0f172a',
          }}
        />
      </div>
    </div>
  );
}
