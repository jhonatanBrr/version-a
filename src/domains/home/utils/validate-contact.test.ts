import { describe, expect, it } from "vitest";
import { hasErrors, validateContact } from "./validate-contact";

const VALID = { name: "Giulia Rossi", email: "giulia@example.it", message: "Vorrei informazioni sul corso." };

describe("validateContact", () => {
  it("returns no errors for valid input", () => {
    const errors = validateContact(VALID);
    expect(errors).toEqual({});
    expect(hasErrors(errors)).toBe(false);
  });

  it("requires the name", () => {
    expect(validateContact({ ...VALID, name: "" }).name).toBe("nameRequired");
  });

  it("rejects a name shorter than 2 characters", () => {
    expect(validateContact({ ...VALID, name: "G" }).name).toBe("nameTooShort");
  });

  it("requires the email", () => {
    expect(validateContact({ ...VALID, email: "" }).email).toBe("emailRequired");
  });

  it("rejects an invalid email format", () => {
    for (const email of ["giulia", "giulia@", "giulia@example", "gi ulia@example.it", "@example.it"]) {
      expect(validateContact({ ...VALID, email }).email).toBe("emailInvalid");
    }
  });

  it("requires the message", () => {
    expect(validateContact({ ...VALID, message: "" }).message).toBe("messageRequired");
  });

  it("rejects a message shorter than 10 characters", () => {
    expect(validateContact({ ...VALID, message: "Ciao ciao" }).message).toBe("messageTooShort");
  });

  it("trims whitespace before validating", () => {
    const errors = validateContact({ name: "  G  ", email: "  giulia@example.it  ", message: "   breve    " });
    expect(errors).toEqual({ name: "nameTooShort", message: "messageTooShort" });
    expect(validateContact({ name: "   ", email: "   ", message: "   " })).toEqual({
      name: "nameRequired",
      email: "emailRequired",
      message: "messageRequired",
    });
  });
});
