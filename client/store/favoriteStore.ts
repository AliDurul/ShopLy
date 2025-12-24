import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'

export interface FavoriteItem {
    id: number;
    name: string;
    price: number;
    discountPrice?: number;
    image: string;
    category?: string;
    brand?: string;
}

interface Actions {
    addFavorite: (item: FavoriteItem) => void;
    removeFavorite: (productId: number) => void;
    toggleFavorite: (item: FavoriteItem) => void;
    isFavorite: (productId: number) => boolean;
    clearFavorites: () => void;
    setHydrating: (v: boolean) => void;
}

interface State {
    favoriteItems: FavoriteItem[];
    isHydrating: boolean;
    actions: Actions;
}

const useFavoriteStore = create<State>()(
    persist(
        (set, get) => ({
            favoriteItems: [],
            isHydrating: true,
            actions: {
                setHydrating: (v) => set({ isHydrating: v }),
                addFavorite: (item) => {
                    const exists = get().favoriteItems.find(fi => fi.id === item.id);
                    if (!exists) {
                        set({
                            favoriteItems: [...get().favoriteItems, item],
                        });
                    }
                },
                removeFavorite: (productId) => {
                    set({
                        favoriteItems: get().favoriteItems.filter(item => item.id !== productId),
                    });
                },
                toggleFavorite: (item) => {
                    const exists = get().favoriteItems.find(fi => fi.id === item.id);
                    if (exists) {
                        get().actions.removeFavorite(item.id);
                    } else {
                        get().actions.addFavorite(item);
                    }
                },
                isFavorite: (productId) => {
                    return get().favoriteItems.some(item => item.id === productId);
                },
                clearFavorites: () => {
                    set({ favoriteItems: [] });
                }
            }
        }),
        {
            name: "shoply_favorites",
            partialize: (state) => ({ favoriteItems: state.favoriteItems }),
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => {
                return (state, error) => {
                    if (error) {
                        console.warn('hydrate error', error);
                    }
                    setTimeout(() => {
                        useFavoriteStore.getState().actions.setHydrating(false);
                    }, 0);
                };
            },
        }
    )
);

export const useFavoriteItems = () => useFavoriteStore((state) => state.favoriteItems);
export const useFavoriteHydrating = () => useFavoriteStore((state) => state.isHydrating);
export const useFavoriteActions = () => useFavoriteStore((state) => state.actions);

// Reactive computed selector
export const useFavoriteCount = () => useFavoriteStore((state) => state.favoriteItems.length);
