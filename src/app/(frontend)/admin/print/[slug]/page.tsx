/* src/app/(frontend)/admin/print/[slug]/page.tsx
 *
 * ONE route – handles both:
 *   /admin/print/VBS   → every VBS child (one form per page)
 *   /admin/print/<id>  → one specific child
 *
 * Assumptions:
 *   • Every child always has ≥1 emergency-contact row (required on submission).
 *   • Only “VBS” or “SYO” will ever be used as program slugs.
 */

import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { db } from "@/db/index";
import {
  children,
  consent,
  emergencyContacts,
  guardians,
  medicalInformation,
} from "@/db/schema";
import "@/app/(frontend)/admin/print/[slug]/page.scss";
import { formatDate, formatPhoneNumber } from "@/lib/formatHelpers";

export default async function PrintPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const isProgram = slug === "VBS" || slug === "SYO";

  const rows = await db
    .select({
      child: children,
      guardian: guardians,
      medical: medicalInformation,
      consent,
      ec: emergencyContacts,
    })
    .from(children)
    .innerJoin(guardians, eq(guardians.id, children.guardianId))
    .innerJoin(emergencyContacts, eq(emergencyContacts.childId, children.id))
    .leftJoin(medicalInformation, eq(medicalInformation.childId, children.id))
    .innerJoin(consent, eq(consent.childId, children.id))
    .where(
      isProgram
        ? eq(children.program, slug as "VBS" | "SYO")
        : eq(children.id, slug),
    );

  if (!rows.length) 
return notFound();

  /**
   * -----------------------------
   *  Group rows → one entry / child
   *  -----------------------------
   */
  type ChildGroup = {
    child: typeof children.$inferSelect;
    guardian: typeof guardians.$inferSelect;
    medical: typeof medicalInformation.$inferSelect | null;
    consent: typeof consent.$inferSelect;
    contacts: (typeof emergencyContacts.$inferSelect)[];
  };

  const grouped: Record<string, ChildGroup> = {};
  rows.forEach(({ child, guardian, medical, consent: c, ec }) => {
    if (!grouped[child.id]) {
      grouped[child.id] = {
        child,
        guardian,
        medical,
        consent: c,
        contacts: [],
      };
    }
    grouped[child.id].contacts.push(ec);
  });

  /** ------------- Render ------------- */
  return (
    <main className="space-y-12 bg-white p-12 text-black print:space-y-4 print:p-0">
      {Object.values(grouped).map(
        ({ child, guardian, medical, consent: c, contacts }) => (
          <div
            key={child.id}
            className="page-break-after mx-auto max-w-3xl space-y-6 border-2 border-black p-8"
          >
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
                <dd>{formatDate(child.dateOfBirth)}</dd>

                <dt className="font-medium">Class in Fall:</dt>
                <dd>{child.classInFall}</dd>

                <dt className="font-medium">School:</dt>
                <dd>{child.school || "—"}</dd>
              </dl>
            </section>

            {/* MEDICAL INFO */}
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
                <dd>{formatPhoneNumber(guardian.phonePrimary)}</dd>

                <dt className="font-medium">Alt Phone:</dt>
                <dd>{formatPhoneNumber(guardian.phoneAlternate) || "—"}</dd>

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

            {/* EMERGENCY CONTACTS */}
            <section className="rounded border p-4">
              <h2 className="mb-2 text-center text-xl font-semibold">
                Emergency Contacts
              </h2>
              {contacts.map((ec, i) => (
                <div key={ec.id} className={i ? "mt-3 border-t pt-3" : ""}>
                  <dl className="mb-3 grid grid-cols-[15rem_1fr] gap-y-1 last:mb-0">
                    <dt className="font-medium">Name:</dt>
                    <dd>
                      {ec.firstName} {ec.lastName}
                    </dd>
                    <dt className="font-medium">Phone:</dt>
                    <dd>{formatPhoneNumber(ec.phonePrimary)}</dd>
                    <dt className="font-medium">Relationship:</dt>
                    <dd>{ec.relationship}</dd>
                  </dl>
                </div>
              ))}
            </section>

            {/* CONSENT */}
            <section className="rounded border p-4">
              <h2 className="mb-2 text-center text-xl font-semibold">
                Consent
              </h2>
              <dl className="grid grid-cols-[15rem_1fr] gap-y-1">
                <dt className="font-medium">Photo Release:</dt>
                <dd
                  className={
                    c.photoRelease ? "font-bold text-red-700" : undefined
                  }
                >
                  {c.photoRelease ? "No" : "Yes"}
                </dd>
                <dt className="font-medium">General Consent:</dt>
                <dd>{c.consentGiven ? "Yes" : "No"}</dd>
              </dl>
            </section>

            {/* SIGNATURE */}
            <section className="mt-12 border-t border-gray-300 pt-6">
              <p className="mb-4">
                I confirm that the above information is correct to the best of
                my knowledge.
              </p>
              <div className="mt-12 flex flex-col gap-12">
                <div className="flex flex-col">
                  <span className="w-80 border-b border-black"></span>
                  <span className="mt-1 text-sm">
                    Parent/Guardian Signature
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="w-80 border-b border-black"></span>
                  <span className="mt-1 text-sm">Date</span>
                </div>
              </div>
            </section>
          </div>
        ),
      )}
    </main>
  );
}

/* Add this in globals.css
@media print {
  .page-break-after {
    page-break-after: always;
  }
}
*/
