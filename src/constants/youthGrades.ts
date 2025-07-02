/**
 * src/constants/GradeOptions.ts
 *
 * Grade/Class options for VBS registration
 * Contains age-appropriate grade levels for VBS participants
 */

export type YouthGrades = {
  value: string;
  label: string;
};

export const YOUTH_OPTIONS: YouthGrades[] = [
  { value: "6th Grade", label: "6th Grade (Age 11)" },
  { value: "7th Grade", label: "7th Grade (Age 12)" },
  { value: "8th Grade", label: "8th Grade (Age 13)" },
  { value: "9th Grade", label: "9th Grade (Age 14)" },
  { value: "10th Grade", label: "10th Grade (Age 15)" },
  { value: "11th Grade", label: "11th Grade (Age 16)" },
  { value: "12th Grade", label: "12th Grade (Age 17-18)" },
];
