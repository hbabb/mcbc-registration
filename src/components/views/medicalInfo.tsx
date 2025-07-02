"use client";
/**
 * src/components/views/MedicalInfo.tsx
 *
 * Medical information form section component
 * Reusable component for capturing medical information for children
 * Can be embedded in other components with flexible field naming
 * Contains allergies, medications, medical conditions, and dietary restrictions
 */

import type { FieldPath, UseFormReturn } from "react-hook-form";

import { usePathname } from "next/navigation";

import type { RegistrationFormData } from "@/schemas/formSchema";

import FormTextarea from "@/components/form/formTextarea";

type MedicalInfoProps = {
  // React Hook Form instance for the entire registration form
  form: UseFormReturn<RegistrationFormData>;
  // Field name prefix for nested form fields (e.g., 'children.0.medicalInformation)
  fieldPrefix: string;
};

function useProgram(): "VBS" | "SYO" {
  const pathname = usePathname();
  return pathname.startsWith("/vbs") ? "VBS" : "SYO";
}

export function MedicalInfo({ form, fieldPrefix }: MedicalInfoProps) {
  const program = useProgram();

  const director =
    program === "VBS" ? (
      <>
        VBS Director at (<span>864</span>) <span>909</span>-<span>5377</span>
      </>
    ) : (
      <>
        SYO Director at (<span>864</span>) <span>978</span>-<span>3494</span>
      </>
    );

  return (
    <div className="space-y-6">
      {/* Medical Information Header */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Medical Information</h3>
        <p className="text-muted-foreground text-sm">
          All medical information is kept confidential. <br />
          Leave blank if not applicable
        </p>
      </div>

      {/* Allergies Field */}
      <FormTextarea
        form={form}
        name={`${fieldPrefix}.foodAllergies` as FieldPath<RegistrationFormData>}
        label="Allergies"
        placeholder="Please list any food allergies"
        description="Include food allergies such as tree nut, peanut, etc."
        minHeight="min-h-16"
      />

      {/* dietary Restrictions field */}
      <FormTextarea
        form={form}
        name={
          `${fieldPrefix}.dietaryRestrictions` as FieldPath<RegistrationFormData>
        }
        label="Dietary Restrictions"
        placeholder="Please list any dietary restrictions or special dietary needs..."
        description="Include medical diets such as no dairy, etc."
        minHeight="min-h-16"
      />

      {/* emergency medical conditions */}
      <FormTextarea
        form={form}
        name={
          `${fieldPrefix}.emergencyMedical` as FieldPath<RegistrationFormData>
        }
        label="Emergency Medical Conditions"
        placeholder="Please list any Emergency Medical Conditions and Required Emergency Medicines"
        description="Include required Emergency Medicines such as EpiPens, Inhalers, etc."
        minHeight="min-h-16"
      />

      {/* Emergency Medical Information Notice */}
      <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-medium text-red-800">
              Emergency Medical Information
            </h4>
            <div className="mt-2 text-sm text-red-700">
              <p>
                <strong>Important:</strong> If your child has any
                life-threatening allergies or medical conditions that require
                immediate attention, please also contact the {director} before
                the first day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
