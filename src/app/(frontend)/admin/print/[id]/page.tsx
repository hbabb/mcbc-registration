/**
 *  src/app/(frontend)/admin/print/[id]/page.tsx
 *
 *  Printable registration form for ONE child.
 *  Schema rules applied exactly:
 *  - children            : master record
 *  - guardians (1-to-1)  : REQUIRED
 *  - emergencyContacts   : REQUIRED (1-to-many) → fetched as array
 *  - consent  (1-to-1)   : REQUIRED
 *  - medicalInformation  : OPTIONAL (0-or-1)
 *
 *  Semantic HTML (<section><h2><dl><dt><dd>) for form-like layout.
 *  No runtime fall-backs on required tables; only medicalInformation is optional.
 */

import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { db } from "@/db";
import {
  children,
  consent,
  emergencyContacts,
  guardians,
  medicalInformation,
} from "@/db/schema";

export default async function PrintChildPage({
  params,
}: {
  params: { id: string };
}) {
  /* ───────────────────────── 1. core one-to-one data ───────────────────── */
  const [core] = await db
    .select({
      children,
      guardians,
      consent,
      medicalInformation, // optional, camelCase matches JSX
    })
    .from(children)
    .innerJoin(guardians, eq(children.guardianId, guardians.id)) // required
    .innerJoin(consent, eq(children.id, consent.childId)) // required
    .leftJoin(medicalInformation, eq(children.id, medicalInformation.childId))
    .where(eq(children.id, params.id));

  if (!core) 
return notFound();

  /* ──────────────────────── 2. all emergency contacts ──────────────────── */
  const ecList = await db
    .select()
    .from(emergencyContacts)
    .where(eq(emergencyContacts.childId, params.id));

  if (ecList.length === 0) 
return notFound(); // contacts are mandatory

  /* ───────────────────────── 3. destructure for JSX ────────────────────── */
  const {
    children: child,
    guardians: guardian,
    consent: consentData,
    medicalInformation: medical,
  } = core;

  /* ───────────────────────────── 4. printable form ─────────────────────── */
  return (
    <div className="mx-auto max-w-3xl space-y-6 bg-white p-8 text-black">
      <h1 className="mb-6 text-center text-2xl font-bold underline">
        {child.program} Registration Form
      </h1>

      {/* CHILD INFO */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-center text-xl font-semibold">
          Child Information
        </h2>
        <dl className="grid grid-cols-[15rem_1fr] gap-y-1">
          <dt className="font-medium">Name:</dt>
          <dd>
            {child.firstName} {child.lastName}
          </dd>

          <dt className="font-medium">Date of Birth:</dt>
          <dd>{child.dateOfBirth}</dd>

          <dt className="font-medium">Class in Fall:</dt>
          <dd>{child.classInFall}</dd>

          <dt className="font-medium">School:</dt>
          <dd>{child.school || "—"}</dd>
        </dl>
      </section>

      {/* MEDICAL INFO (optional) */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-center text-xl font-semibold">
          Medical Information
        </h2>
        <dl className="grid grid-cols-[15rem_1fr] gap-y-1">
          <dt className="font-medium">Food Allergies:</dt>
          <dd>{medical?.foodAllergies || "N/A"}</dd>

          <dt className="font-medium">Dietary Restrictions:</dt>
          <dd>{medical?.dietaryRestrictions || "N/A"}</dd>

          <dt className="font-medium">Emergency Medical Notes:</dt>
          <dd>{medical?.emergencyMedical || "N/A"}</dd>
        </dl>
      </section>

      {/* GUARDIAN INFO */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-center text-xl font-semibold">
          Guardian Information
        </h2>
        <dl className="grid grid-cols-[15rem_1fr] gap-y-1">
          <dt className="font-medium">Name:</dt>
          <dd>
            {guardian.firstName} {guardian.lastName}
          </dd>

          <dt className="font-medium">Email:</dt>
          <dd>{guardian.email}</dd>

          <dt className="font-medium">Phone:</dt>
          <dd>{guardian.phonePrimary}</dd>

          <dt className="font-medium">Alt Phone:</dt>
          <dd>{guardian.phoneAlternate || "—"}</dd>

          <dt className="font-medium">Address:</dt>
          <dd>
            {guardian.address1} {guardian.address2 || ""}
          </dd>

          <dt className="font-medium">City / State / ZIP:</dt>
          <dd>
            {guardian.city}, {guardian.state} {guardian.zip}
          </dd>
        </dl>
      </section>

      {/* EMERGENCY CONTACTS (required, array) */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-center text-xl font-semibold">
          Emergency Contacts
        </h2>
        {ecList.map((ec, i) => (
          <div key={i} className={i !== 0 ? "mt-3 border-t pt-3" : ""}>
            <dl className="mb-3 grid grid-cols-[15rem_1fr] gap-y-1 last:mb-0">
              <dt className="font-medium">Name:</dt>
              <dd>
                {ec.firstName} {ec.lastName}
              </dd>

              <dt className="font-medium">Phone:</dt>
              <dd>{ec.phonePrimary}</dd>

              <dt className="font-medium">Relationship:</dt>
              <dd>{ec.relationship}</dd>
            </dl>
          </div>
        ))}
      </section>

      {/* CONSENT (required) */}
      <section className="rounded border p-4">
        <h2 className="mb-2 text-center text-xl font-semibold">Consent</h2>
        <dl className="grid grid-cols-[15rem_1fr] gap-y-1">
          <dt className="font-medium">Photo Release:</dt>
          <dd
            className={
              consentData.photoRelease === true
                ? "font-bold text-red-700"
                : undefined
            }
          >
            {consentData.photoRelease === false ? "Yes" : "No"}
          </dd>

          <dt className="font-medium">General Consent:</dt>
          <dd>{consentData.consentGiven ? "Yes" : "No"}</dd>
        </dl>
      </section>

      {/* Signature Block */}
      <section className="mt-12 border-t border-gray-300 pt-6">
        <p className="mb-4">
          I confirm that the above information is correct to the best of my
          knowledge. I agree to update staff if any information changes.
        </p>
        <div className="mt-12 flex flex-col gap-12">
          <div className="flex flex-col">
            <span className="w-80 border-b border-black"></span>
            <span className="mt-1 text-sm">Parent/Guardian Signature</span>
          </div>
          <div className="flex flex-col">
            <span className="w-80 border-b border-black"></span>
            <span className="mt-1 text-sm">Date</span>
          </div>
        </div>
      </section>
    </div>
  );
}
