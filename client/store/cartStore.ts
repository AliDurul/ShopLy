import { CartItem } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'
// Cart item shape

interface Actions {
    addCart: (item: IProduct, quantity?: number) => void;
    removeCart: (productId: number) => void;
    updateCart: (productId: number, quantity: number) => void;
    updateItemVariant: (productId: number, patch: Partial<Pick<CartItem, 'size' | 'color'>>) => void;
    clearCarts: () => void;
    setHydrating: (v: boolean) => void;
}

interface State {
    cartProducts: IProduct[];
    isHydrating: boolean;
    actions: Actions;
}

const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cartProducts: [],
            isHydrating: true,
            actions: {
                setHydrating: (v) => set({ isHydrating: v }),
                addCart: (item, quantity = 1) => {
                    const existingItem = get().cartProducts.find(ci => ci.id === item.id);
                    if (existingItem) {
                        set({
                            cartProducts: get().cartProducts.map(ci =>
                                ci.id === item.id ? { ...ci, quantity: ci.quantity + quantity } : ci
                            ),
                        });
                    } else {
                        set({
                            // cartProducts: [
                            //     ...get().cartProducts,
                            //     {
                            //         ...item,
                            //         quantity,
                            //         availableSizes: item.availableSizes || ['XS', 'S', 'M', 'L', 'XL'],
                            //         availableColors: item.availableColors || ['Black', 'White', 'Blue'],
                            //         size: item.size || 'M',
                            //         color: item.color || 'Black',
                            //     }
                            // ],
                            cartProducts: [...get().cartProducts, { ...item, quantity }],
                        });
                    }
                },
                removeCart: (productId) => {
                    set({
                        cartProducts: get().cartProducts.filter(item => item.id !== productId),
                    });
                },
                updateCart: (productId, quantity) => {
                    set({
                        cartProducts: get().cartProducts.map(item =>
                            item.id === productId ? { ...item, quantity } : item
                        ),
                    });
                },
                updateItemVariant: (productId, patch) => {
                    set({
                        cartProducts: get().cartProducts.map(item => item.id === productId ? { ...item, ...patch } : item)
                    });
                },
                clearCarts: () => {
                    set({ cartProducts: [] });
                }
            }
        }),
        {
            name: "shoply_cart",
            // skipHydration: true,
            partialize: (state) => ({ cartProducts: state.cartProducts }),
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => {
                return (state, error) => {
                    if (error) {
                        console.warn('hydrate error', error);
                    }
                    setTimeout(() => {
                        useCartStore.getState().actions.setHydrating(false);
                    }, 0);
                };
            },
        }
    )
);

export const useCartItems = () => useCartStore((state) => state.cartProducts);
export const useCartHydrating = () => useCartStore((state) => state.isHydrating);
export const useCartActions = () => useCartStore((state) => state.actions);

// Reactive computed selectors - these will trigger re-renders
export const useCartItemCount = () => useCartStore((state) => 
    state.cartProducts.reduce((count, item) => count + item.quantity, 0)
);

export const useCartSubtotal = () => useCartStore((state) => 
    state.cartProducts.reduce((total, item) => total + (item?.discountPrice ?? item.price) * item.quantity, 0)
);

export const useCartProduct = (productId: number) => useCartStore((state) => 
    state.cartProducts.find(item => item.id === productId)
);