import { describe, expect, it } from "vitest";
import { cartCount, cartReducer, emptyCart, MAX_QUANTITY } from "./cart-reducer";

const add = (quantity: number, editionId = "kit") =>
  ({ type: "add", productId: "p02", editionId, quantity }) as const;

describe("cartReducer", () => {
  it("adds a new line", () => {
    const state = cartReducer(emptyCart, add(1));
    expect(state.lines).toEqual([{ productId: "p02", editionId: "kit", quantity: 1 }]);
  });

  it("merges quantities for the same product and edition", () => {
    const state = cartReducer(cartReducer(emptyCart, add(1)), add(2));
    expect(state.lines).toHaveLength(1);
    expect(state.lines[0].quantity).toBe(3);
  });

  it("keeps different editions as separate lines", () => {
    const state = cartReducer(cartReducer(emptyCart, add(1)), add(1, "manual"));
    expect(state.lines).toHaveLength(2);
  });

  it("clamps quantities between 1 and the maximum", () => {
    const big = cartReducer(emptyCart, add(999));
    expect(big.lines[0].quantity).toBe(MAX_QUANTITY);
    const low = cartReducer(big, { type: "setQuantity", productId: "p02", editionId: "kit", quantity: 0 });
    expect(low.lines[0].quantity).toBe(1);
  });

  it("removes a line and clears the cart", () => {
    const state = cartReducer(cartReducer(emptyCart, add(1)), add(1, "manual"));
    const removed = cartReducer(state, { type: "remove", productId: "p02", editionId: "kit" });
    expect(removed.lines.map((l) => l.editionId)).toEqual(["manual"]);
    expect(cartReducer(removed, { type: "clear" })).toEqual(emptyCart);
  });

  it("counts items across lines", () => {
    const state = cartReducer(cartReducer(emptyCart, add(2)), add(3, "manual"));
    expect(cartCount(state)).toBe(5);
  });
});
