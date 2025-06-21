'use client';

/**
 * src/app/terms-conditions/page.tsx
 *
 * Hidden Terms & Conditions page - printable letterhead format
 * Only accessible via direct link, not in navigation
 */

import Image from 'next/image';

import McbcLogo from '@/assets/mcbc-logo/McbcTransparentLogoSymbol.png';

export function TermsConditions() {
  return (
    <div className="min-h-screen bg-white">
      {/* Print Styles */}
      <style jsx>
        {`
                @media print {
                    body {
                        margin: 0;
                    }
                    .no-print {
                        display: none;
                    }
                    .print-page {
                        padding: 0.5in;
                        font-size: 12pt;
                        line-height: 1.4;
                    }
                }
            `}
      </style>

      {/* Print Button - Hidden when printing */}
      <div className="no-print fixed top-4 right-4 z-10">
        <button
          onClick={() => window.print()}
          className="bg-primary hover:bg-primary/90 rounded px-4 py-2 text-white"
        >
          Print Document
        </button>
      </div>
      {/* Letterhead Document */}
      <div className="print-page mx-auto max-w-4xl p-8">
        {/* Church Letterhead */}
        <div className="mb-8 gap-0 border-b-2 border-gray-300 pb-6 text-center">
          <div className="mb-0 flex flex-row items-center justify-center pb-0">
            <Image
              src={McbcLogo}
              alt="Motlow Creek Baptist Church Logo"
              width={500}
              height={500}
              className="mr-4 h-20 w-20"
            />
            <h1 className="text-church-navy text-2xl font-bold">
              Motlow Creek Baptist Church
            </h1>
          </div>
          <p className="text-liver mt-0 pt-0">
            2300 Motlow Creek Road
            <br />
            Campobello, SC 29322
            <br />
            (864) 572-1499
          </p>
        </div>

        {/* Document Title */}
        <div className="mb-8 text-center">
          <h2 className="text-marian-blue font-subheading text-xl font-bold">
            Vacation Bible School 2025
          </h2>
          <h3 className="text-dartmouth-green font-subheading text-lg font-semibold">
            TERMS & CONDITIONS
          </h3>
        </div>

        {/* Terms Content */}
        <div className="text-liver space-y-6 leading-relaxed">
          <section>
            <h4 className="text-marian-blue mb-2 font-bold">
              1. PARTICIPATION AGREEMENT
            </h4>
            <p>
              By registering your child for Vacation Bible School
              (VBS) 2025 at Motlow Creek Baptist Church, you
              acknowledge that participation is voluntary and at
              your own risk.
            </p>
          </section>

          <section>
            <h4 className="text-marian-blue mb-2 font-bold">
              2. LIABILITY WAIVER
            </h4>
            <p>
              You acknowledge that VBS activities may involve
              physical activities, crafts, games, and group
              interactions. Motlow Creek Baptist Church, its
              staff, volunteers, and leadership are not liable for
              any injuries, accidents, or damages that may occur
              during VBS activities. You assume all risks
              associated with your child&apos;s participation.
            </p>
          </section>

          <section>
            <h4 className="text-marian-blue mb-2 font-bold">
              3. INDEMNIFICATION
            </h4>
            <p>
              You agree to indemnify and hold harmless Motlow
              Creek Baptist Church, its staff, volunteers, and
              leadership from any claims, damages, or expenses
              arising from your child&apos;s participation in VBS
              activities.
            </p>
          </section>

          <section>
            <h4 className="text-marian-blue mb-2 font-bold">
              4. MEDICAL EMERGENCY AUTHORIZATION
            </h4>
            <p>
              You authorize Motlow Creek Baptist Church staff to
              seek emergency medical treatment for your child if
              you cannot be reached immediately. You are
              responsible for all medical expenses incurred.
            </p>
          </section>

          <section>
            <h4 className="text-marian-blue mb-2 font-bold">
              5. PHOTO & VIDEO RELEASE
            </h4>
            <p>
              Unless you have opted out during registration, you
              grant Motlow Creek Baptist Church permission to
              photograph and video your child during VBS
              activities. These images may be used for church
              marketing, social media, websites, newsletters, and
              promotional materials without compensation.
            </p>
          </section>

          <section>
            <h4 className="text-marian-blue mb-2 font-bold">
              6. CODE OF CONDUCT
            </h4>
            <p>
              Children are expected to follow VBS rules and show
              respect for staff, volunteers, and other
              participants. Disruptive behavior may result in
              removal from the program without refund or
              compensation.
            </p>
          </section>

          <section>
            <h4 className="text-marian-blue mb-2 font-bold">
              7. DROP-OFF & PICK-UP
            </h4>
            <p>
              Children must be dropped off and picked up by
              authorized individuals only. Photo ID may be
              required for pick-up verification.
            </p>
          </section>

          <section>
            <h4 className="text-marian-blue mb-2 font-bold">
              8. DATA PRIVACY
            </h4>
            <p>
              Registration information will be used solely for VBS
              purposes and church communication. Information will
              not be shared with third parties.
            </p>
          </section>

          <section>
            <h4 className="text-marian-blue mb-2 font-bold">
              9. PROGRAM CHANGES
            </h4>
            <p>
              Motlow Creek Baptist Church reserves the right to
              modify VBS activities, dates, or cancel the program
              if necessary. Participants will be notified of any
              changes.
            </p>
          </section>

          <section>
            <h4 className="text-marian-blue mb-2 font-bold">
              10. AGREEMENT
            </h4>
            <p>
              By completing registration and checking the consent
              box, you acknowledge that you have read, understood,
              and agree to these Terms & Conditions.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="text-muted-foreground mt-12 border-t border-gray-300 pt-6 text-center text-sm">
          <p>Motlow Creek Baptist Church • VBS 2025</p>
          <p>For questions, contact: support@motlowministries.com</p>
        </div>
      </div>
    </div>
  );
}
