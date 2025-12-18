'use client';

export function SynthwaveBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Sky gradient - purple to orange horizon */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1a0533 0%, #2d1b4e 20%, #4a1942 40%, #7c2d5b 55%, #d4548a 70%, #ff9a56 85%, #ffcc70 100%)',
        }}
      />
      
      {/* Stars in the sky */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 5% 8%, white, transparent),
            radial-gradient(1.5px 1.5px at 15% 12%, rgba(255,255,255,0.9), transparent),
            radial-gradient(1px 1px at 25% 5%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 35% 18%, rgba(255,255,255,0.8), transparent),
            radial-gradient(1.5px 1.5px at 50% 10%, white, transparent),
            radial-gradient(1px 1px at 65% 15%, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 75% 8%, rgba(255,255,255,0.9), transparent),
            radial-gradient(1.5px 1.5px at 85% 20%, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 95% 12%, rgba(255,255,255,0.8), transparent)
          `,
          backgroundSize: '100% 45%',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Sun with horizontal lines */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[32%]">
        {/* Sun glow - no blur */}
        <div 
          className="absolute -inset-16 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #ff6b35 0%, transparent 60%)',
          }}
        />
        {/* Sun body */}
        <div 
          className="w-32 h-32 rounded-full overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #ff1493 0%, #ff6b35 40%, #ffcc00 100%)',
          }}
        >
          {/* Sun stripes */}
          <div className="absolute inset-0" style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 8px,
                rgba(26,5,51,0.3) 8px,
                rgba(26,5,51,0.3) 12px
              )
            `,
          }} />
        </div>
      </div>
      
      {/* Horizon line */}
      <div 
        className="absolute left-0 right-0 bottom-[30%] h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #ff6ec7 20%, #ff6ec7 80%, transparent 100%)',
          boxShadow: '0 0 20px #ff6ec7',
        }}
      />
      
      {/* Perspective grid */}
      <div 
        className="absolute inset-x-0 bottom-0 h-[30%]"
        style={{
          background: '#0a0a15',
        }}
      />
      <div 
        className="absolute inset-x-0 bottom-0 h-[30%]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, transparent 0px, transparent 59px, rgba(255,110,199,0.4) 59px, rgba(255,110,199,0.4) 60px),
            repeating-linear-gradient(0deg, transparent 0px, transparent 29px, rgba(255,110,199,0.25) 29px, rgba(255,110,199,0.25) 30px)
          `,
          transform: 'perspective(300px) rotateX(65deg)',
          transformOrigin: 'center top',
        }}
      />
      
      {/* Mountain silhouettes */}
      <div 
        className="absolute bottom-[30%] left-0 right-0 h-20"
        style={{
          background: `
            linear-gradient(135deg, transparent 40%, #1a0533 40%, #1a0533 42%, transparent 42%),
            linear-gradient(225deg, transparent 40%, #1a0533 40%, #1a0533 42%, transparent 42%),
            linear-gradient(150deg, transparent 50%, #0f0320 50%, #0f0320 52%, transparent 52%),
            linear-gradient(210deg, transparent 50%, #0f0320 50%, #0f0320 52%, transparent 52%)
          `,
          backgroundSize: '100px 100%, 100px 100%, 150px 100%, 150px 100%',
          backgroundPosition: '0 0, 50px 0, 80px 0, 180px 0',
        }}
      />
      
      {/* Palm tree silhouette left */}
      <div className="absolute bottom-[30%] left-[8%]">
        <div className="w-2 h-24 bg-[#0a0a15]" style={{ transform: 'rotate(-5deg)' }} />
        <div className="absolute -top-2 -left-6 w-14 h-6 bg-[#0a0a15]" style={{ 
          borderRadius: '0 100% 0 100%',
          transform: 'rotate(-30deg)',
        }} />
        <div className="absolute -top-1 -left-4 w-12 h-5 bg-[#0a0a15]" style={{ 
          borderRadius: '0 100% 0 100%',
          transform: 'rotate(-60deg)',
        }} />
        <div className="absolute -top-2 left-0 w-14 h-6 bg-[#0a0a15]" style={{ 
          borderRadius: '100% 0 100% 0',
          transform: 'rotate(30deg)',
        }} />
      </div>
    </div>
  );
}
