"use client";
/**
 * src/components/views/ChildInfo.tsx
 *
 * Child information form section component with dynamic child management
 * Supports multiple children with add/remove functionality using useFieldArray
 * Each child card contains basic info and medical information with visual separation
 * First child is required and cannot be removed, additional children can be added/removed
 */

import type { FieldPath, UseFormReturn } from "react-hook-form";

import { Minus, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useFieldArray } from "react-hook-form";

import type { RegistrationFormData } from "@/schemas/formSchema";

import { FormInput } from "@/components/form/formInput";
import { FormSelect } from "@/components/form/formSelect";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MedicalInfo } from "@/components/views/medicalInfo";
import { GRADE_OPTIONS } from "@/constants/gradeOptions";
import { YOUTH_OPTIONS } from "@/constants/youthGrades";

type ChildInfoProps = {
  /** React Hook Form instance for the entire registration form */
  form: UseFormReturn<RegistrationFormData>;
};

function useProgram(): "VBS" | "SYO" {
  const pathname = usePathname();
  return pathname.startsWith("/vbs") ? "VBS" : "SYO";
}

export function ChildInfo({ form }: ChildInfoProps) {
  const program = useProgram();
  // useFieldArray hook for dynamic child management
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "children",
  });

  // Add new child with default values
  const addChild = () => {
    append({
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
    });
  };

  // Remove child (only if more than 1 child exists)
  const removeChild = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <Card className="flex flex-col gap-8 bg-white/90 shadow-2xl">
      <CardHeader>
        <CardTitle>Child Information</CardTitle>
        <CardDescription>
          Provide information for each child attending VBS. Children must be 5
          years old and potty trained.
        </CardDescription>
      </CardHeader>

      {/* Child Content Sections */}
      {fields.map((field, index) => (
        <CardContent key={field.id} className="space-y-6">
          {/* Child Number Header */}
          {fields.length > 1 && (
            <div className="pb-2">
              <h3 className="text-lg font-semibold">Child {index + 1}</h3>
            </div>
          )}

          {/* Child Basic Information */}
          <div className="space-y-4">
            {/* Name fields Row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormInput
                form={form}
                name={
                  `children.${index}.firstName` as FieldPath<RegistrationFormData>
                }
                label="First Name"
                placeholder="John"
                required
              />

              <FormInput
                form={form}
                name={
                  `children.${index}.lastName` as FieldPath<RegistrationFormData>
                }
                label="Last Name"
                placeholder="Doe"
                required
              />
            </div>

            {/* Date of Birth and Grade Row */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormInput
                form={form}
                name={
                  `children.${index}.dateOfBirth` as FieldPath<RegistrationFormData>
                }
                label="Date of Birth"
                type="date"
                required
                // No placeholder needed - browser handles format display
              />

              <FormSelect
                form={form}
                name={
                  `children.${index}.classInFall` as FieldPath<RegistrationFormData>
                }
                label="Class in Fall 2025"
                options={program === "VBS" ? GRADE_OPTIONS : YOUTH_OPTIONS}
                placeholder="Select grade level in the Fall"
                required
              />
            </div>

            {/* School Field */}
            <FormInput
              form={form}
              name={
                `children.${index}.school` as FieldPath<RegistrationFormData>
              }
              label="School"
              placeholder="School Name"
            />
          </div>

          {/* Stroke Divider */}
          <div className="border-t border-gray-400" />

          {/* Medical Information Section */}
          <MedicalInfo
            form={form}
            fieldPrefix={`children.${index}.medicalInformation`}
          />

          {/* Action Buttons - Bottom Right */}
          <div className="flex justify-end space-x-2 pt-4">
            {/* Remove Button - only show if more than 1 child */}
            {fields.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeChild(index)}
                className="border-gray-300 bg-gray-600/50 text-gray-600 hover:bg-gray-50"
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}

            {/* Add Button - always present on last child */}
            {index === fields.length - 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addChild}
                className="border-gray-300 bg-gray-600/50 text-gray-600 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Separator between children (except for last child) */}
          {index < fields.length - 1 && (
            <div className="border-b border-gray-300 pb-6" />
          )}
        </CardContent>
      ))}
    </Card>
  );
}
