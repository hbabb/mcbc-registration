/**
 * Email Preview API Route - Complete test data
 */

import { NextResponse } from "next/server";

import type { RegistrationFormData } from "@/schemas/formSchema";

import { createRegistrationConfirmationEmail } from "@/lib/emailTemplates";

export async function GET(request: Request) {
  const programParam = new URL(request.url).searchParams.get("program");

  if (programParam !== "VBS" && programParam !== "SYO") {
    return new NextResponse("program must be VBS or SYO", { status: 400 });
  }

  // Complete test data matching RegistrationFormData type
  const testRegistrationData: RegistrationFormData = {
    program: programParam,
    guardians: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phonePrimary: "(555) 123-4567",
      phoneAlternate: "(555) 987-6543",
      address1: "123 Main Street",
      address2: "Apt 4B",
      city: "Campobello",
      state: "SC",
      zip: "29322",
    },
    children: [
      {
        firstName: "Jane",
        lastName: "Doe",
        dateOfBirth: "2018-05-15",
        classInFall: "Kindergarten",
        school: "Campobello Elementary",
        medicalInformation: {
          foodAllergies: "Peanuts, tree nuts",
          dietaryRestrictions: "No dairy",
          emergencyMedical: "EpiPen in backpack",
        },
      },
      {
        firstName: "Jimmy",
        lastName: "Doe",
        dateOfBirth: "2016-08-22",
        classInFall: "2nd Grade",
        school: "Campobello Elementary",
        medicalInformation: {
          foodAllergies: "",
          dietaryRestrictions: "",
          emergencyMedical: "",
        },
      },
    ],
    emergencyContacts: [
      {
        firstName: "Jane",
        lastName: "Smith",
        phonePrimary: "(555) 444-3333",
        relationship: "Grandmother",
      },
    ],
    consent: {
      photoRelease: false,
      consentGiven: true,
    },
    honeypot: "",
    honeypot2: "",
  };

  return new NextResponse(
    createRegistrationConfirmationEmail(testRegistrationData),
    {
      headers: {
        "Content-Type": "text/html",
      },
    },
  );
}
