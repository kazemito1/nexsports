import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find(
          (i) =>
            i.productId === item.productId &&
            i.size === item.size &&
            i.color === item.color
        );

        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId &&
              i.size === item.size &&
              i.color === item.color
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            (i) =>
              !(
                i.productId === productId &&
                i.size === size &&
                i.color === color
              )
          ),
        });
      },
      updateQuantity: (productId, quantity, size, color) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.productId === productId &&
            i.size === size &&
            i.color === color
              ? { ...i, quantity }
              : i
          ),
        });
      },
      clearCart: () => set({ items: [] }),
    }),
    { name: "nexsports-cart" }
  )
);
