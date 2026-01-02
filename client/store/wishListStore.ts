import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'

interface Actions {
    addWishList: (item: IProduct) => void;
    removeWishList: (productId: number) => void;
    toggleWishList: (item: IProduct) => void;
    // isWishList: (productId: number) => boolean;
    clearWishLists: () => void;
    setHydrating: (v: boolean) => void;
}

interface State {
    favoriteItems: IProduct[];
    isHydrating: boolean;
    actions: Actions;
}

const useWishListStore = create<State>()(
    persist(
        (set, get) => ({
            favoriteItems: [],
            isHydrating: true,
            actions: {
                setHydrating: (v) => set({ isHydrating: v }),
                addWishList: (item) => {
                    const exists = get().favoriteItems.find(fi => fi.id === item.id);
                    if (!exists) {
                        set({
                            favoriteItems: [...get().favoriteItems, item],
                        });
                    }
                },
                removeWishList: (productId) => {
                    set({
                        favoriteItems: get().favoriteItems.filter(item => item.id !== productId),
                    });
                },
                toggleWishList: (item) => {
                    const exists = get().favoriteItems.find(fi => fi.id === item.id);
                    if (exists) {
                        get().actions.removeWishList(item.id);
                    } else {
                        get().actions.addWishList(item);
                    }
                },
                clearWishLists: () => {
                    set({ favoriteItems: [] });
                }
            }
        }),
        {
            name: "shoply_whishList",
            partialize: (state) => ({ favoriteItems: state.favoriteItems }),
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => {
                return (state, error) => {
                    if (error) {
                        console.warn('hydrate error', error);
                    }
                    setTimeout(() => {
                        useWishListStore.getState().actions.setHydrating(false);
                    }, 0);
                };
            },
        }
    )
);

export const useWishListItems = () => useWishListStore((state) => state.favoriteItems);
export const useWishListHydrating = () => useWishListStore((state) => state.isHydrating);
export const useWishListActions = () => useWishListStore((state) => state.actions);

// Reactive computed selector
export const useWishListCount = () => useWishListStore((state) => state.favoriteItems.length);
export const useIsWishList = (productId: number) => useWishListStore((state) => state.favoriteItems.some(item => item.id === productId));