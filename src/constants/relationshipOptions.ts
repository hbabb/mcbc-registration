/**
 * src/constants/RelationshipOptions.ts
 *
 * Relationship options for emergency contacts
 * Contains common relationships for emergency contact selection
 */

export type RelationshipOption = {
  value: string;
  label: string;
};

export const RELATIONSHIP_OPTIONS: RelationshipOption[] = [
  { value: 'Sister', label: 'Sister' },
  { value: 'Brother', label: 'Brother' },
  { value: 'Grandparent', label: 'Grandparent' },
  { value: 'Aunt', label: 'Aunt' },
  { value: 'Uncle', label: 'Uncle' },
  { value: 'Family Friend', label: 'Family Friend' },
];
