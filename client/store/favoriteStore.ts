import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'

interface Actions {
    addFavorite: (item: IProduct) => void;
    removeFavorite: (productId: number) => void;
    toggleFavorite: (item: IProduct) => void;
    // isFavorite: (productId: number) => boolean;
    clearFavorites: () => void;
    setHydrating: (v: boolean) => void;
}

interface State {
    favoriteItems: IProduct[];
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
export const useIsFavorite = (productId: number) => useFavoriteStore((state) => state.favoriteItems.some(item => item.id === productId));