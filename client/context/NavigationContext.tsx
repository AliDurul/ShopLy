'use client';
import { createContext, useContext, useTransition, ReactNode } from 'react';

interface NavigationContextType {
    isPending: boolean;
    startTransition: (callback: () => void) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
    const [isPending, startTransition] = useTransition();

    return (
        <NavigationContext.Provider value={{ isPending, startTransition }}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within NavigationProvider');
    }
    return context;
}

// Wrapper component that applies opacity when loading
export function NavigationContent({ 
    children, 
    className = '' 
}: { 
    children: ReactNode;
    className?: string;
}) {
    const { isPending } = useNavigation();

    return (
        <div className={`contents ${isPending ? '*:opacity-60 *:pointer-events-none *:transition-opacity *:duration-200' : ''} ${className}`}>
            {children}
        </div>
    );
}
