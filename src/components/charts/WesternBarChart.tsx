'use client';

import { useState } from 'react';

interface WesternBarChartProps {
    data: Array<{
        week: string;
        amount: number;
        pattern?: 'solid' | 'striped';
    }>;
    formatCurrency: (amount: number) => string;
}

export function WesternBarChart({ data, formatCurrency }: WesternBarChartProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Encontrar o valor máximo para normalizar as alturas
    const maxAmount = Math.max(...data.map(d => d.amount), 1);

    return (
        <div className="w-full relative">
            {/* Background com textura de papel envelhecido */}
            <div
                className="absolute inset-0 opacity-30 pointer-events-none rounded-sm"
                style={{
                    backgroundImage: "url('https://www.transparenttextures.com/patterns/old-map.png')",
                    backgroundSize: 'cover',
                }}
            />

            {/* Chart container */}
            <div className="relative h-64 flex items-end justify-around gap-4 px-6 pb-8 pt-4">
                {/* Grid lines horizontais (sutis) */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-6 pb-8 pt-4">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full border-t border-[#2c1810]/10" />
                    ))}
                </div>

                {/* Barras */}
                {data.map((item, index) => {
                    const heightPercentage = (item.amount / maxAmount) * 100;
                    const isHovered = hoveredIndex === index;

                    return (
                        <div
                            key={item.week}
                            className="flex-1 flex flex-col items-center relative group"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Tooltip */}
                            {isHovered && (
                                <div className="absolute -top-12 bg-[#2c1810] text-[#f3e5ab] px-3 py-1 rounded text-xs font-bold whitespace-nowrap z-10 border border-[#d4af37] font-courier-prime"
                                    style={{ boxShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                                    {formatCurrency(item.amount)}
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#2c1810]" />
                                </div>
                            )}

                            {/* Barra */}
                            <div
                                className="w-full relative transition-all duration-300 border-2 border-[#2c1810]"
                                style={{
                                    height: `${heightPercentage}%`,
                                    minHeight: item.amount > 0 ? '20px' : '0px',
                                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                }}
                            >
                                {/* Padrão da barra */}
                                {item.pattern === 'striped' ? (
                                    // Padrão listrado diagonal
                                    <div
                                        className="w-full h-full relative overflow-hidden"
                                        style={{
                                            background: `repeating-linear-gradient(
                                                45deg,
                                                #2c1810,
                                                #2c1810 8px,
                                                transparent 8px,
                                                transparent 16px
                                            )`
                                        }}
                                    />
                                ) : (
                                    // Padrão sólido (cinza claro)
                                    <div className="w-full h-full bg-[#d4d4d4]" />
                                )}
                            </div>

                            {/* Label da semana */}
                            <div className="mt-2 text-xs font-bold text-[#2c1810] font-courier-prime">
                                {item.week}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Linha base */}
            <div className="w-full h-0.5 bg-[#2c1810] relative" />
        </div>
    );
}
