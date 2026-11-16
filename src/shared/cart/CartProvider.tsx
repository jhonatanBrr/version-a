"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import { PRODUCTS } from "@/shared/catalog/products";
import type { Product, ProductEdition } from "@/shared/catalog/types";
import { cartCount, cartReducer, emptyCart, type CartAction, type CartLine, type CartState } from "./cart-reducer";

interface ProviderState {
  cart: CartState;
  hydrated: boolean;
}

/** Wraps the pure cart reducer and records when storage has been read. */
function providerReducer(state: ProviderState, action: CartAction): ProviderState {
  if (action.type === "hydrate") return { cart: action.state, hydrated: true };
  return { ...state, cart: cartReducer(state.cart, action) };
}

const STORAGE_KEY = "gp-cart";

export interface ResolvedCartLine extends CartLine {
  product: Product;
  edition: ProductEdition;
  lineTotal: number;
  lineListTotal: number;
}

interface CartContextValue {
  lines: ResolvedCartLine[];
  count: number;
  total: number;
  listTotal: number;
  hydrated: boolean;
  add: (productId: string, editionId: string, quantity: number) => void;
  setQuantity: (productId: string, editionId: string, quantity: number) => void;
  remove: (productId: string, editionId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function resolve(state: CartState): ResolvedCartLine[] {
  return state.lines.flatMap((line) => {
    const product = PRODUCTS.find((p) => p.id === line.productId);
    const edition = product?.editions.find((e) => e.id === line.editionId);
    if (!product || !edition) return [];
    return [{ ...line, product, edition, lineTotal: edition.salePrice * line.quantity, lineListTotal: edition.price * line.quantity }];
  });
}

function isCartState(value: unknown): value is CartState {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as CartState).lines) &&
    (value as CartState).lines.every(
      (l) => typeof l.productId === "string" && typeof l.editionId === "string" && typeof l.quantity === "number",
    )
  );
}

/** Client-side cart persisted in localStorage (no backend in this test). */
export function CartProvider({ children }: { children: ReactNode }) {
  const [{ cart: state, hydrated }, dispatch] = useReducer(providerReducer, { cart: emptyCart, hydrated: false });

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      dispatch({ type: "hydrate", state: isCartState(saved) ? saved : emptyCart });
    } catch {
      /* corrupted or unavailable storage: start with an empty cart */
      dispatch({ type: "hydrate", state: emptyCart });
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage unavailable: the cart lives only in memory */
    }
  }, [state, hydrated]);

  const add = useCallback((productId: string, editionId: string, quantity: number) => dispatch({ type: "add", productId, editionId, quantity }), []);
  const setQuantity = useCallback((productId: string, editionId: string, quantity: number) => dispatch({ type: "setQuantity", productId, editionId, quantity }), []);
  const remove = useCallback((productId: string, editionId: string) => dispatch({ type: "remove", productId, editionId }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = resolve(state);
    return {
      lines,
      count: cartCount(state),
      total: lines.reduce((sum, l) => sum + l.lineTotal, 0),
      listTotal: lines.reduce((sum, l) => sum + l.lineListTotal, 0),
      hydrated,
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [state, hydrated, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
