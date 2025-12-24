import { memo, ComponentType } from 'react';

/**
 * Creates a memoized wrapper for lazy-loaded themed components.
 * This prevents unnecessary re-renders when parent state changes that don't affect the component.
 * 
 * The memoization compares props shallowly, so props objects should be stable (memoized).
 */
export function createMemoizedThemedComponent<P extends object>(
    Component: ComponentType<P>
): ComponentType<P> {
    return memo(Component, (prevProps, nextProps) => {
        // Custom comparison: ignore newTransaction/newTask changes for performance
        // These are controlled inputs that manage their own re-renders
        const prevKeys = Object.keys(prevProps) as Array<keyof P>;
        const nextKeys = Object.keys(nextProps) as Array<keyof P>;

        if (prevKeys.length !== nextKeys.length) return false;

        for (const key of prevKeys) {
            // Skip comparison for form state objects - they change frequently
            if (key === 'newTransaction' || key === 'newTask') {
                continue;
            }

            if (prevProps[key] !== nextProps[key]) {
                return false;
            }
        }

        return true;
    });
}
