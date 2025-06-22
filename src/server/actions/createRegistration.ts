"use server";

import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";

import type { RegistrationFormData } from "@/schemas/formSchema";

import { db } from "@/db";
import {
  children,
  consent,
  emergencyContacts,
  guardians,
  medicalInformation,
} from "@/db/schema";
import { sendEmail } from "@/lib/emailService";
import { createRegistrationConfirmationEmail } from "@/lib/emailTemplates";
import { registrationSchema } from "@/schemas/formSchema";
import { actionClient } from "@/server/actions/serverActionClient";

export const createRegistration = actionClient
  .metadata({ actionName: "createRegistration" })
  .schema(registrationSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: formData,
    }: {
      parsedInput: RegistrationFormData;
    }) => {
      // Security checks
      if (formData.honeypot || formData.honeypot2) {
        throw new Error("Invalid submission detected");
      }
      // Guardian data
      const existingGuardian = await db
        .select()
        .from(guardians)
        .where(eq(guardians.email, formData.guardians.email))
        .limit(1);

      if (existingGuardian.length > 0) {
        throw new Error(
          "A registration already exists for this email address. Please contact us if you believe this is an error.",
        );
      }
      // Insert guardian and get the ID
      // We can spread all guardian fields because form structure matches DB schema exactly
      const [guardian] = await db
        .insert(guardians)
        .values({ ...formData.guardians })
        .returning({ id: guardians.id });

      if (!guardian) {
        throw new Error("Failed to create guardian record");
      }

      const childIds: string[] = [];

      // Process each child
      for (const childData of formData.children) {
        // Extract medical info because it goes in a separate table, not the children table
        // childFields will contain: firstName, lastName, dateOfBirth, classInFall, school
        const { medicalInformation: medicalInfo, ...childFields } = childData;

        // Insert child record - spread childFields + add guardianId (not in form)
        const [child] = await db
          .insert(children)
          .values({
            ...childFields, // firstName, lastName, dateOfBirth, classInFall, school
            guardianId: guardian.id, // Foreign key - not in form data
            program: formData.program,
          })
          .returning({ id: children.id });

        if (!child) {
          throw new Error("Failed to create child record");
        }

        childIds.push(child.id);

        // Insert medical information in a separate table if any was provided
        if (
          medicalInfo &&
          (medicalInfo.foodAllergies ||
            medicalInfo.dietaryRestrictions ||
            medicalInfo.emergencyMedical)
        ) {
          await db.insert(medicalInformation).values({
            childId: child.id, // Foreign key - links to child
            foodAllergies: medicalInfo.foodAllergies || null,
            dietaryRestrictions: medicalInfo.dietaryRestrictions || null,
            emergencyMedical: medicalInfo.emergencyMedical || null,
          });
        }
      }

      // Insert consent information for each child (the same consent applies to all)
      for (const childId of childIds) {
        await db.insert(consent).values({
          childId, // Foreign key - not in form (form has consent at top level)
          photoRelease: formData.consent.photoRelease,
          consentGiven: formData.consent.consentGiven,
        });
      }

      // Insert emergency contacts for all children
      for (const emergencyContact of formData.emergencyContacts) {
        for (const childId of childIds) {
          await db.insert(emergencyContacts).values({
            childId, // Foreign key - not in form data
            ...emergencyContact, // firstName, lastName, phonePrimary, relationship
          });
        }
      }

      // Send confirmation email
      try {
        const emailHtml = createRegistrationConfirmationEmail(formData);
        const subject =
          formData.program === "SYO"
            ? "Summer Youth Olympics Registration Confirmation at Motlow Creek Baptist Church"
            : "VBS 2025 Registration Confirmation at Motlow Creek Baptist Church";
        await sendEmail({
          to: formData.guardians.email,
          subject,
          html: emailHtml,
        });
        console.log(`Confirmation email sent to ${formData.guardians.email}`);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
      }

      return {
        success: true,
        message: "Registration completed successfully!",
        data: {
          guardianId: guardian.id,
          childIds,
          childrenCount: childIds.length,
        },
      };
    },
  );
