"use client";

/**
 * src/components/RegistrationForm.tsx
 *
 * Main registration form wrapper part that handles all form logic
 * Contains useForm hook, validation, submission, and renders all form sections
 * This is a client component that wraps server-rendered page content
 * Handles multistep form flow and state management
 */

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { RegistrationFormData } from "@/schemas/formSchema";

import { FormInput } from "@/components/form/formInput";
import { Form } from "@/components/ui/form";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ChildInfo } from "@/components/views/childInfo";
import { Consent } from "@/components/views/consent";
import { EmergencyContact } from "@/components/views/emergencyContact";
import { GuardianInfo } from "@/components/views/guardianInfo";
import { trackEvent, trackFormStep, trackRegistration } from "@/lib/analytics";
import { registrationSchema } from "@/schemas/formSchema";
import { createRegistration } from "@/server/actions/createRegistration";

function useProgram(): "VBS" | "SYO" {
  const pathname = usePathname();
  return pathname.startsWith("/vbs") ? "VBS" : "SYO";
}

export function RegistrationForm({
  eventCategory,
}: {
  eventCategory: "VBS Registration" | "SYO Registration";
}) {
  const program = useProgram();
  // Initialize form with react-hook-form and Zod validation
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: "all",
    defaultValues: {
      program,
      guardians: {
        firstName: "",
        lastName: "",
        email: "",
        phonePrimary: "",
        phoneAlternate: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
      },
      children: [
        {
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          classInFall: "",
          school: "",
          medicalInformation: {
            foodAllergies: "",
            dietaryRestrictions: "",
            emergencyMedical: "",
          },
        },
      ],
      emergencyContacts: [
        {
          firstName: "",
          lastName: "",
          phonePrimary: "",
          relationship: "",
        },
      ],
      consent: {
        photoRelease: false,
        consentGiven: false,
      },
      honeypot: "",
      honeypot2: "",
    },
  });

  // Server action hook for form submission
  const { execute, status } = useAction(createRegistration, {
    onSuccess: (data) => {
      // Track successful registration
      const childrenCount = form.getValues("children").length;
      trackRegistration(childrenCount);

      toast.success(`✅ ${data?.data?.message}`, {
        style: {
          background: "#059669",
          color: "white",
          border: "none",
        },
      });
      form.reset();
    },
    onError: (error) => {
      // Track form errors
      trackEvent("registration_error", {
        event_category: eventCategory,
        error_message: error.error?.serverError || "Unknown error",
      });
      toast.error(
        `❌ ${error.error?.serverError || "Registration failed. Please try again"}`,
        {
          style: {
            background: "#DC2626", // muted red
            color: "white",
            border: "none",
          },
        },
      );
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (
        name?.startsWith("guardians.firstName") &&
        value.guardians?.firstName
      ) {
        trackFormStep("guardian_info_started");
      }
      if (
        name?.startsWith("children.0.firstName") &&
        value.children?.[0]?.firstName
      ) {
        trackFormStep("child_info_started");
      }
      if (
        name?.startsWith("emergencyContacts.0.firstName") &&
        value.emergencyContacts?.[0]?.firstName
      ) {
        trackFormStep("emergency_contact_started");
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // Form submission handler
  const onSubmit = (data: RegistrationFormData) => {
    execute({
      ...data,
      children: data.children.map((child) => ({ ...child, program })),
    });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      {/* Registration Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="font-family-inter space-y-8"
        >
          {/* Guardian Information Section */}
          <GuardianInfo form={form} />

          {/* Child Information Section */}
          <ChildInfo form={form} />

          {/* Emergency Contact Section */}
          <EmergencyContact form={form} />

          {/* Consent Section */}
          <Consent form={form} />

          {/* Submit Button */}
          <div className="justify-start-safe flex pt-4">
            <InteractiveHoverButton
              type="submit"
              disabled={status === "executing"}
              className="min-w-48"
            >
              {status === "executing" ? "Submitting..." : "Submit Registration"}
            </InteractiveHoverButton>
          </div>
          {/* In your RegistrationForm.tsx, add hidden fields: */}
          <div style={{ display: "none" }}>
            <FormInput
              form={form}
              name="honeypot"
              label="Leave this blank"
              placeholder=""
            />
            <FormInput
              form={form}
              name="honeypot2"
              label="Do not fill this field"
              placeholder=""
            />
          </div>
        </form>
      </Form>
      {/* Add a privacy notice to your form */}
      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50/80 p-4">
        <h4 className="font-semibold text-blue-800">Privacy Notice</h4>
        <p className="mt-2 text-sm text-blue-700">
          We collect this information solely for VBS registration and safety
          purposes. Your data is not shared with third parties and is deleted
          after the program ends.
        </p>
      </div>
    </div>
  );
}
