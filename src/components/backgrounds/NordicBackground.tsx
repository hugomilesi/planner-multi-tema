'use client';

export function NordicBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Clean light gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 100%)',
        }}
      />
      
      {/* Subtle geometric pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(30deg, #64748b 12%, transparent 12.5%, transparent 87%, #64748b 87.5%, #64748b),
            linear-gradient(150deg, #64748b 12%, transparent 12.5%, transparent 87%, #64748b 87.5%, #64748b),
            linear-gradient(30deg, #64748b 12%, transparent 12.5%, transparent 87%, #64748b 87.5%, #64748b),
            linear-gradient(150deg, #64748b 12%, transparent 12.5%, transparent 87%, #64748b 87.5%, #64748b)
          `,
          backgroundSize: '80px 140px',
          backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px',
        }}
      />
      
      {/* Mountain silhouette */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 opacity-[0.04]"
        style={{
          background: `
            linear-gradient(165deg, transparent 40%, #475569 40%, #475569 42%, transparent 42%),
            linear-gradient(195deg, transparent 40%, #475569 40%, #475569 42%, transparent 42%),
            linear-gradient(170deg, transparent 50%, #64748b 50%, #64748b 52%, transparent 52%),
            linear-gradient(190deg, transparent 50%, #64748b 50%, #64748b 52%, transparent 52%)
          `,
          backgroundSize: '300px 100%, 300px 100%, 400px 100%, 400px 100%',
          backgroundPosition: '0 0, 150px 0, 200px 0, 500px 0',
        }}
      />
      
      {/* Pine tree silhouettes */}
      <div className="absolute bottom-0 left-[10%] opacity-[0.05]">
        <div 
          className="w-0 h-0"
          style={{
            borderLeft: '15px solid transparent',
            borderRight: '15px solid transparent',
            borderBottom: '40px solid #334155',
          }}
        />
        <div 
          className="w-0 h-0 -mt-3"
          style={{
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderBottom: '50px solid #334155',
            marginLeft: '-5px',
          }}
        />
      </div>
      
      <div className="absolute bottom-0 left-[15%] opacity-[0.04]">
        <div 
          className="w-0 h-0"
          style={{
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderBottom: '35px solid #475569',
          }}
        />
        <div 
          className="w-0 h-0 -mt-2"
          style={{
            borderLeft: '16px solid transparent',
            borderRight: '16px solid transparent',
            borderBottom: '45px solid #475569',
            marginLeft: '-4px',
          }}
        />
      </div>
      
      <div className="absolute bottom-0 right-[12%] opacity-[0.05]">
        <div 
          className="w-0 h-0"
          style={{
            borderLeft: '18px solid transparent',
            borderRight: '18px solid transparent',
            borderBottom: '50px solid #334155',
          }}
        />
        <div 
          className="w-0 h-0 -mt-4"
          style={{
            borderLeft: '24px solid transparent',
            borderRight: '24px solid transparent',
            borderBottom: '60px solid #334155',
            marginLeft: '-6px',
          }}
        />
      </div>
      
      {/* Soft blue accent */}
      <div
        className="absolute top-[20%] right-[20%] w-64 h-64 rounded-full opacity-[0.04]"
        style={{ 
          background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
        }}
      />
      
      {/* Soft sage accent */}
      <div
        className="absolute bottom-[40%] left-[15%] w-48 h-48 rounded-full opacity-[0.03]"
        style={{ 
          background: 'radial-gradient(circle, #6b8e6b 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
