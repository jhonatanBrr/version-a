export interface CartLine {
  productId: string;
  editionId: string;
  quantity: number;
}

export interface CartState {
  lines: CartLine[];
}

export type CartAction =
  | { type: "add"; productId: string; editionId: string; quantity: number }
  | { type: "setQuantity"; productId: string; editionId: string; quantity: number }
  | { type: "remove"; productId: string; editionId: string }
  | { type: "clear" }
  | { type: "hydrate"; state: CartState };

export const MAX_QUANTITY = 20;

const clamp = (value: number) => Math.min(MAX_QUANTITY, Math.max(1, Math.floor(value)));
const sameLine = (line: CartLine, productId: string, editionId: string) =>
  line.productId === productId && line.editionId === editionId;

export const emptyCart: CartState = { lines: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const existing = state.lines.find((l) => sameLine(l, action.productId, action.editionId));
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l === existing ? { ...l, quantity: clamp(l.quantity + action.quantity) } : l,
          ),
        };
      }
      return {
        lines: [...state.lines, { productId: action.productId, editionId: action.editionId, quantity: clamp(action.quantity) }],
      };
    }
    case "setQuantity":
      return {
        lines: state.lines.map((l) =>
          sameLine(l, action.productId, action.editionId) ? { ...l, quantity: clamp(action.quantity) } : l,
        ),
      };
    case "remove":
      return { lines: state.lines.filter((l) => !sameLine(l, action.productId, action.editionId)) };
    case "clear":
      return emptyCart;
    case "hydrate":
      return action.state;
  }
}

export function cartCount(state: CartState): number {
  return state.lines.reduce((sum, line) => sum + line.quantity, 0);
}
