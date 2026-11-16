import { describe, expect, it } from "vitest";
import type { CheckoutValues } from "../interfaces/checkout";
import { emptyCheckoutValues, isTaxId, validateCheckout } from "./validate-checkout";

const valid: CheckoutValues = {
  email: "giulia.rossi@example.it",
  firstName: "Giulia",
  lastName: "Rossi",
  taxId: "RSSGLI85M41H501Z",
  sdi: "",
  address: "Via Roma 1",
  postalCode: "50121",
  city: "Firenze",
};

const withValue = (patch: Partial<CheckoutValues>) => validateCheckout({ ...valid, ...patch });

describe("validateCheckout", () => {
  it("returns no errors for a complete valid form", () => {
    expect(validateCheckout(valid)).toEqual({});
  });

  it("reports every required field when the form is empty", () => {
    expect(validateCheckout(emptyCheckoutValues)).toEqual({
      email: "required",
      firstName: "required",
      lastName: "required",
      taxId: "required",
      address: "required",
      postalCode: "required",
      city: "required",
    });
  });

  it.each(["email", "firstName", "lastName", "taxId", "address", "postalCode", "city"] as const)(
    "requires %s",
    (field) => {
      expect(withValue({ [field]: "" })[field]).toBe("required");
    },
  );

  it("rejects a malformed email", () => {
    expect(withValue({ email: "giulia@" }).email).toBe("email");
    expect(withValue({ email: "giulia.example.it" }).email).toBe("email");
  });

  it("requires at least 2 characters for first and last name", () => {
    expect(withValue({ firstName: "G" }).firstName).toBe("minLength");
    expect(withValue({ lastName: "R" }).lastName).toBe("minLength");
  });

  it("requires a CAP of exactly 5 digits", () => {
    expect(withValue({ postalCode: "5012" }).postalCode).toBe("postalCode");
    expect(withValue({ postalCode: "501211" }).postalCode).toBe("postalCode");
    expect(withValue({ postalCode: "5012A" }).postalCode).toBe("postalCode");
  });

  it("rejects an invalid tax id", () => {
    expect(withValue({ taxId: "RSSGLI85M41H501" }).taxId).toBe("taxId");
  });

  it("accepts an empty optional SDI/PEC", () => {
    expect(withValue({ sdi: "" }).sdi).toBeUndefined();
  });

  it("trims whitespace before validating", () => {
    expect(withValue({ email: "  giulia.rossi@example.it  ", postalCode: " 50121 ", firstName: "   " })).toEqual({
      firstName: "required",
    });
  });
});

describe("isTaxId", () => {
  it("accepts a valid Italian codice fiscale, case-insensitive", () => {
    expect(isTaxId("RSSGLI85M41H501Z")).toBe(true);
    expect(isTaxId("rssgli85m41h501z")).toBe(true);
  });

  it("accepts a valid Partita IVA of 11 digits", () => {
    expect(isTaxId("01234567890")).toBe(true);
  });

  it("rejects values with the wrong length", () => {
    expect(isTaxId("0123456789")).toBe(false);
    expect(isTaxId("012345678901")).toBe(false);
    expect(isTaxId("RSSGLI85M41H501ZZ")).toBe(false);
  });

  it("rejects a 16-character value with the wrong pattern", () => {
    expect(isTaxId("1234567890123456")).toBe(false);
  });
});
