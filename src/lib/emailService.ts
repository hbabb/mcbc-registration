/**
 * Email Service - Reusable Resend wrapper with Sentry error tracking
 *
 * This service provides a clean interface for sending emails using Resend.
 * It handles authentication, error handling with Sentry integration, and provides
 * a consistent API that can be used across different projects and email types.
 *
 * Features:
 * - Automatic error tracking with Sentry
 * - Type-safe email options
 * - Consistent error handling
 * - Production-ready logging
 *
 * Requirements:
 * - RESEND_API_KEY environment variable must be set
 * - 'from' domain must be verified in the Resend dashboard- * Sentry must be configured in the project
 *
 * @author Heath Babb (HB Consultants, LLC)
 * @version 1.0.0
 */

import * as Sentry from "@sentry/nextjs";
import { Resend } from "resend";

/**
 * Initialize the Resend client with an API key from the environment
 * The API key should be stored in .env.local as RESEND_API_KEY
 */
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Interface defining the structure for email options
 * This ensures type safety and makes it clear what parameters are required
 */
type EmailOptions = {
  /** Recipient email address - must be a valid email format */
  to: string;
  /** Email subject line - will appear in the recipient's inbox */
  subject: string;
  /** HTML content of the email can include styling and formatting */
  html: string;
};

/**
 * Sends an email using the Resend service with Sentry error tracking
 *
 * This function wraps the Resend API call with comprehensive error handling.
 * All errors are automatically reported to Sentry with relevant context.
 *
 * @param options
 * @param options.to
 * @param options.subject
 * @param options.html
 * @returns Promise<{success: boolean, data?: any}> - Success status and optional response data
 * @throws Error if email sending fails - errors are automatically tracked in Sentry
 */
export async function sendEmail({ to, subject, html }: EmailOptions) {
  try {
    // Attempt to send email through Resend API
    const { data, error } = await resend.emails.send({
      // FROM ADDRESS: Update this for each project/organization
      // Domain must be verified in your Resend dashboard
      from: "VBS Registration <noreply@vbs.motlowcreekministries.com>",
      to, // Recipient email address
      subject, // Email subject line
      html, // Email body content (HTML format)
    });

    // Check if Resend returned an error
    if (error) {
      // Capture error in Sentry with context
      Sentry.captureException(new Error("Resend API error"), {
        tags: {
          component: "email-service",
          email_type: "registration-confirmation",
        },
        extra: {
          resendError: error,
          recipientEmail: to,
          subject,
        },
      });

      console.error("Email sending error:", error);
      throw new Error("Failed to send email via Resend API");
    }

    // Log successful email sending (optional - for debugging)
    console.log(`Email sent successfully to ${to}: ${subject}`);

    // Return success response with optional data from Resend
    return { success: true, data };
  } catch (error) {
    // Capture unexpected errors in Sentry
    Sentry.captureException(error, {
      tags: {
        component: "email-service",
        operation: "send-email",
      },
      extra: {
        recipientEmail: to,
        subject,
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      },
    });

    // Log error locally for immediate debugging
    console.error("Email service error:", error);

    // Re-throw error so calling code can handle it appropriately
    throw error;
  }
}

/**
 * Configuration object for email service
 * These values can be modified based on project requirements
 */
export const EMAIL_CONFIG = {
  /** Default sender name that appears in the recipient's inbox */
  DEFAULT_SENDER_NAME: "VBS Registration",

  /** Domain used for sending emails - must be verified in Resend */
  SENDER_DOMAIN: "vbs.motlowcreekministries.com",

  /** Default from email address */
  DEFAULT_FROM_EMAIL:
    "VBS Registration <noreply@vbs.motlowcreekministries.com>",

  /** Timeout for email sending operations (in milliseconds) */
  TIMEOUT_MS: 10000,
} as const;
