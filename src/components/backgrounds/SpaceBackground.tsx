'use client';

export function SpaceBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep space gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, #1a1033 0%, #0d0d1a 40%, #050510 100%)',
        }}
      />
      
      {/* Star field layer 1 - small stars */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 10%, rgba(255,255,255,0.9), transparent),
            radial-gradient(1px 1px at 20% 50%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 30% 30%, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 50% 20%, rgba(255,255,255,0.9), transparent),
            radial-gradient(1px 1px at 60% 80%, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 80% 60%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 90% 25%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 85% 15%, rgba(255,255,255,0.9), transparent),
            radial-gradient(1px 1px at 45% 45%, rgba(255,255,255,0.7), transparent)
          `,
          backgroundSize: '250px 250px',
        }}
      />
      
      {/* Star field layer 2 - medium stars */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 5% 35%, rgba(200,220,255,0.9), transparent),
            radial-gradient(1.5px 1.5px at 25% 65%, rgba(255,220,200,0.8), transparent),
            radial-gradient(2px 2px at 55% 15%, rgba(200,200,255,1), transparent),
            radial-gradient(1.5px 1.5px at 75% 85%, rgba(255,255,220,0.9), transparent),
            radial-gradient(2px 2px at 95% 45%, rgba(220,200,255,0.8), transparent)
          `,
          backgroundSize: '400px 400px',
        }}
      />
      
      {/* Nebula - purple */}
      <div
        className="absolute top-0 left-0 w-[80%] h-[60%] opacity-15"
        style={{ 
          background: 'radial-gradient(ellipse at 30% 30%, #6b21a8 0%, transparent 40%)',
        }}
      />
      
      {/* Nebula - blue */}
      <div
        className="absolute bottom-0 right-0 w-[60%] h-[50%] opacity-10"
        style={{ 
          background: 'radial-gradient(ellipse at 70% 70%, #1e40af 0%, transparent 40%)',
        }}
      />
      
      {/* Distant planet */}
      <div
        className="absolute top-[15%] right-[20%] w-16 h-16 rounded-full"
        style={{ 
          background: 'radial-gradient(circle at 30% 30%, #fbbf24 0%, #d97706 50%, #92400e 100%)',
          boxShadow: '0 0 40px rgba(251,191,36,0.3), inset -4px -4px 10px rgba(0,0,0,0.5)',
        }}
      />
      
      {/* Planet ring */}
      <div
        className="absolute top-[15%] right-[20%] w-24 h-6"
        style={{ 
          transform: 'translateX(-16px) translateY(20px) rotateX(70deg)',
          background: 'linear-gradient(90deg, transparent 0%, rgba(251,191,36,0.2) 20%, rgba(251,191,36,0.4) 50%, rgba(251,191,36,0.2) 80%, transparent 100%)',
          borderRadius: '50%',
        }}
      />
      
      {/* Shooting star hint */}
      <div
        className="absolute top-[30%] left-[10%] w-20 h-[1px] opacity-40"
        style={{ 
          background: 'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)',
          transform: 'rotate(35deg)',
        }}
      />
    </div>
  );
}
