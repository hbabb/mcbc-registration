import type { AdapterAccountType } from 'next-auth/adapters';

import { relations } from 'drizzle-orm';
import {
  boolean,
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

/* ─────────────────────────── VBS / SYO TABLES ─────────────────────────── */

export const programEnum = pgEnum('program', ['VBS', 'SYO']);

// Guardian table (no changes needed)
export const guardians = pgTable('guardians', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name').notNull(),
  email: varchar('email').unique().notNull(),
  phonePrimary: varchar('phone').unique().notNull(),
  phoneAlternate: varchar('phone_alternate'),
  address1: varchar('address1').notNull(),
  address2: varchar('address2'),
  city: varchar('city').notNull(),
  state: varchar('state', { length: 2 }).notNull(),
  zip: varchar('zip', { length: 10 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Child table (no changes needed)
export const children = pgTable('children', {
  id: uuid('id').primaryKey().defaultRandom(),
  guardianId: uuid('guardian_id')
    .notNull()
    .references(() => guardians.id),

  program: programEnum('program').notNull(),

  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name').notNull(),
  dateOfBirth: date('date_of_birth').notNull(),
  classInFall: varchar('class_in_fall').notNull(),
  school: varchar('school'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Emergency Contact table - UPDATED (removed email, kept only phonePrimary)
export const emergencyContacts = pgTable('emergency_contacts', {
  id: uuid('id').primaryKey().defaultRandom(),
  childId: uuid('child_id')
    .notNull()
    .references(() => children.id),
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name').notNull(),
  phonePrimary: varchar('phone').notNull(),
  relationship: varchar('relationship').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Medical Information table - UPDATED with new field names
export const medicalInformation = pgTable('medical_information', {
  id: uuid('id').primaryKey().defaultRandom(),
  childId: uuid('child_id')
    .notNull()
    .references(() => children.id),
  foodAllergies: varchar('food_allergies'),
  dietaryRestrictions: varchar('dietary_restrictions'),
  emergencyMedical: varchar('emergency_medical'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Consent table - RENAMED from permissions, removed pickupNotes
export const consent = pgTable('consent', {
  id: uuid('id').primaryKey().defaultRandom(),
  childId: uuid('child_id')
    .notNull()
    .references(() => children.id),
  photoRelease: boolean('photo_release').notNull(),
  consentGiven: boolean('consent_given').notNull(),
  consentTimestamp: timestamp('consent_timestamp', { withTimezone: true })
    .notNull()
    .defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// Relations - UPDATED
export const guardiansRelations = relations(guardians, ({ many }) => ({
  children: many(children),
}));

export const childrenRelations = relations(children, ({ one, many }) => ({
  guardians: one(guardians, {
    fields: [children.guardianId],
    references: [guardians.id],
  }),
  emergencyContacts: many(emergencyContacts),
  medicalInformation: many(medicalInformation),
  consent: many(consent),
}));

export const emergencyContactsRelations = relations(
  emergencyContacts,
  ({ one }) => ({
    children: one(children, {
      fields: [emergencyContacts.childId],
      references: [children.id],
    }),
  }),
);

export const medicalInformationRelations = relations(
  medicalInformation,
  ({ one }) => ({
    children: one(children, {
      fields: [medicalInformation.childId],
      references: [children.id],
    }),
  }),
);

export const consentRelations = relations(consent, ({ one }) => ({
  children: one(children, {
    fields: [consent.childId],
    references: [children.id],
  }),
}));

/* ───────── AUTH.JS TABLES + RELATIONS — all fields varchar or uuid ───────── */

/* users */
export const users = pgTable('user', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
  email: varchar('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: varchar('image'),
});

/* accounts */
export const accounts = pgTable(
  'account',
  {
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: varchar('type').$type<AdapterAccountType>().notNull(),
    provider: varchar('provider').notNull(),
    providerAccountId: varchar('providerAccountId').notNull(),
    refresh_token: varchar('refresh_token'),
    access_token: varchar('access_token'),
    expires_at: integer('expires_at'),
    token_type: varchar('token_type'),
    scope: varchar('scope'),
    id_token: varchar('id_token'),
    session_state: varchar('session_state'),
  },
  t => [primaryKey({ columns: [t.provider, t.providerAccountId] })],
);

/* sessions */
export const sessions = pgTable('session', {
  sessionToken: varchar('sessionToken').primaryKey(),
  userId: uuid('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

/* verificationTokens */
export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: varchar('identifier').notNull(),
    token: varchar('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  t => [primaryKey({ columns: [t.identifier, t.token] })],
);

/* authenticators */
export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: varchar('credentialID').notNull().unique(),
    userId: uuid('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: varchar('providerAccountId').notNull(),
    credentialPublicKey: varchar('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: varchar('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: varchar('transports'),
  },
  t => [primaryKey({ columns: [t.userId, t.credentialID] })],
);

/* relations */
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  authenticators: many(authenticators),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const authenticatorsRelations = relations(authenticators, ({ one }) => ({
  user: one(users, {
    fields: [authenticators.userId],
    references: [users.id],
  }),
}));
