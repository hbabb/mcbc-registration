/**
 * src/constants/GradeOptions.ts
 *
 * Grade/Class options for VBS registration
 * Contains age-appropriate grade levels for VBS participants
 */

export type GradeOption = {
  value: string;
  label: string;
};

export const GRADE_OPTIONS: GradeOption[] = [
  // { value: 'Pre-K', label: 'Pre-K (Ages 3-4)' },
  { value: 'Kindergarten', label: 'Kindergarten (Age 4-5)' },
  { value: '1st Grade', label: '1st Grade (Age 6)' },
  { value: '2nd Grade', label: '2nd Grade (Age 7)' },
  { value: '3rd Grade', label: '3rd Grade (Age 8)' },
  { value: '4th Grade', label: '4th Grade (Age 9)' },
  { value: '5th Grade', label: '5th Grade (Age 10-11)' },
  // { value: '6th Grade', label: '6th Grade (Age 11)' },
  // { value: '7th Grade', label: '7th Grade (Age 12)' },
  // { value: '8th Grade', label: '8th Grade (Age 13)' },
];
