import { z } from "zod";

import {
  addressValidation,
  cityValidation,
  emailValidation,
  nameValidation,
  optionalAddressValidation,
  optionalPhoneValidation,
  phoneValidation,
  stateValidation,
  zipValidation,
} from "@/schemas/validationHelpers";

// Zod schema for validation
export const registrationSchema = z.object({
  program: z.enum(["VBS", "SYO"]),

  guardians: z.object({
    firstName: nameValidation,
    lastName: nameValidation,
    email: emailValidation,
    phonePrimary: phoneValidation,
    phoneAlternate: optionalPhoneValidation,
    address1: addressValidation,
    address2: optionalAddressValidation,
    city: cityValidation,
    state: stateValidation,
    zip: zipValidation,
  }),
  children: z
    .array(
      z.object({
        firstName: nameValidation,
        lastName: nameValidation,
        dateOfBirth: z
          .string()
          .min(1, { message: "Date of birth is required" }),
        classInFall: z
          .string()
          .min(1, { message: "Class in fall is required" }),
        school: z.string().optional(),
        medicalInformation: z.object({
          foodAllergies: z.string().optional(),
          dietaryRestrictions: z.string().optional(), // Dietary Restrictions due to Medical Conditions
          emergencyMedical: z.string().optional(), // EpiPens, inhalers, etc.
        }),
      }),
    )
    .min(1, "At least one child is required"),
  emergencyContacts: z
    .array(
      z.object({
        firstName: nameValidation,
        lastName: nameValidation,
        phonePrimary: phoneValidation,
        relationship: z.string().min(1, "Relationship is required"),
      }),
    )
    .min(1, "At least one emergency contact is required")
    .max(3, "Maximum 3 emergency contacts allowed"),
  consent: z.object({
    photoRelease: z.boolean(),
    consentGiven: z.boolean().refine((val) => val, {
      message: "Consent must be given to proceed with registration",
    }),
  }),

  honeypot: z.string().max(0, { message: "Bot detected" }),
  honeypot2: z.string().max(0, { message: "Bot detected" }),
});

// Export the inferred type for TypeScript
export type RegistrationFormData = z.infer<typeof registrationSchema>;
