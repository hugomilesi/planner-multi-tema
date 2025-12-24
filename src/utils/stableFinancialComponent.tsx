import { ComponentType, memo } from 'react';
import { FinancialPageProps } from '@/themes/packs/types';

/**
 * Creates a memoized version of a themed Financial component that prevents
 * re-renders when only the newTransaction state changes.
 * 
 * This is necessary because typing in the transaction form should not cause
 * the entire page (including expensive background renders) to re-render.
 */
export function createStableFinancialComponent<P extends FinancialPageProps>(
    Component: ComponentType<P>
): ComponentType<P> {
    return memo(Component, (prevProps, nextProps) => {
        // Compare all props except newTransaction and setNewTransaction
        const keysToCompare = Object.keys(nextProps).filter(
            key => key !== 'newTransaction' && key !== 'setNewTransaction'
        ) as (keyof P)[];

        for (const key of keysToCompare) {
            if (prevProps[key] !== nextProps[key]) {
                return false; // Props changed, re-render
            }
        }

        return true; // Props are the same, skip re-render
    });
}
