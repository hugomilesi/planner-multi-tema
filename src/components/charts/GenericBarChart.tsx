'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface GenericBarChartProps {
    data: Array<{
        week: string;
        amount: number;
        pattern?: 'solid' | 'striped';
    }>;
    formatCurrency: (amount: number) => string;
    barColor?: string;
    highlightColor?: string;
    borderColor?: string;
    backgroundColor?: string;
    className?: string;
}

export function GenericBarChart({
    data,
    formatCurrency,
    barColor = '#6b7280',
    highlightColor = '#3b82f6',
    borderColor = '#1f2937',
    backgroundColor = 'transparent',
    className = ''
}: GenericBarChartProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const maxAmount = Math.max(...data.map(d => d.amount), 1);

    return (
        <div className={cn("w-full relative", className)}>
            {/* Chart container */}
            <div className="relative h-64 flex items-end justify-around gap-4 px-6 pb-8 pt-4" style={{ backgroundColor }}>
                {/* Grid lines horizontais (sutis) */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-6 pb-8 pt-4">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-full border-t opacity-10" style={{ borderColor }} />
                    ))}
                </div>

                {/* Barras */}
                {data.map((item, index) => {
                    let heightPercentage = 0;

                    if (item.amount > 0) {
                        const sqrtValue = Math.sqrt(item.amount);
                        const sqrtMax = Math.sqrt(maxAmount);
                        heightPercentage = (sqrtValue / sqrtMax) * 100;

                        if (heightPercentage < 10) heightPercentage = 10;
                    }

                    const isHovered = hoveredIndex === index;
                    const isHighlighted = item.pattern === 'striped';

                    return (
                        <div
                            key={item.week}
                            className="flex-1 flex flex-col items-center justify-end h-full relative group"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Tooltip */}
                            {isHovered && (
                                <div className="absolute -top-12 bg-gray-900 text-white px-3 py-1 rounded text-xs font-bold whitespace-nowrap z-10 border"
                                    style={{ borderColor, boxShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                                    {formatCurrency(item.amount)}
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                                </div>
                            )}

                            {/* Barra */}
                            <div
                                className="w-full relative transition-all duration-300 border-2"
                                style={{
                                    height: item.amount > 0 ? `${heightPercentage}%` : '0px',
                                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                    borderColor: isHighlighted ? highlightColor : borderColor,
                                    backgroundColor: isHighlighted ? `${highlightColor}40` : `${barColor}40`,
                                }}
                            >
                                {isHighlighted && (
                                    <div
                                        className="w-full h-full relative overflow-hidden"
                                        style={{
                                            background: `repeating-linear-gradient(
                                                45deg,
                                                ${highlightColor},
                                                ${highlightColor} 8px,
                                                transparent 8px,
                                                transparent 16px
                                            )`
                                        }}
                                    />
                                )}
                            </div>

                            {/* Label */}
                            <div className="mt-2 text-xs font-bold" style={{ color: borderColor }}>
                                {item.week}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Linha base */}
            <div className="w-full h-0.5 relative" style={{ backgroundColor: borderColor }} />
        </div>
    );
}
