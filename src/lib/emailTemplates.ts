/**
 * Email Templates - Reusable HTML email templates
 *
 * This module contains all email template functions for the VBS registration system.
 * Each template is a pure function that takes data and returns formatted HTML.
 * Templates are designed to be responsive and work across different email clients.
 *
 * Features:
 * - Responsive design for mobile and desktop
 * - Consistent branding and styling
 * - Accessible HTML structure
 * - Easy to customize colors and content
 *
 * Usage:
 * import { createRegistrationConfirmationEmail } from '@/lib/emailTemplates';
 * const htmlContent = createRegistrationConfirmationEmail(registrationData);
 *
 * @author Heath Babb (HB Consultants, LLC)
 * @version 1.0.0
 */

import type { RegistrationFormData } from "@/schemas/formSchema";

/**
 * Church branding configuration for email templates
 * Modify these values to match your brand colors and information
 */
const CHURCH_BRANDING = {
  /** Primary church color for headers and buttons */
  primaryColor: "#1e40af", // Blue

  /** Secondary color for accents */
  secondaryColor: "#059669", // Green

  /** Church name as it appears in emails */
  churchName: "Motlow Creek Baptist Church",

  /** VBS program name */
  programName: "Vacation Bible School 2025 - Magnified!",

  /** Church contact phone number */
  phoneNumber: "(864) 572-1499",

  /** Church contact email */
  contactEmail: "support@vbs.motlowcreekministries.com",

  /** Church physical address */
  address: "2300 Motlow Creek Road, Campobello, SC 29322",

  /** Church website URL */
  website: "https://motlowcreekministries.com",
} as const;

/**
 * Creates a confirmation email for VBS registration
 *
 * This template generates a professional, branded email that confirms
 * the parent's registration and provides important contact information.
 * The email includes all registered children and next steps.
 *
 * @param registrationData - Complete registration form data
 * @returns string - Formatted HTML email content
 */
export function createRegistrationConfirmationEmail(
  registrationData: RegistrationFormData,
) {
  const { guardians, children } = registrationData;

  // Generate a list of registered children names
  const childrenNames = children
    .map((child) => `${child.firstName} ${child.lastName}`)
    .join(", ");

  // Create plural/singular text based on the number of children
  const childText = children.length === 1 ? "child" : "children";
  const isAre = children.length === 1 ? "is" : "are";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VBS Registration Confirmation</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        /* Reset styles for email clients */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0;
            mso-table-rspace: 0;
        }
        
        /* Base styles */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f9fa;
        }
        
        /* Container styles */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        /* Header styles */
        .email-header {
            background-color: ${CHURCH_BRANDING.primaryColor};
            color: white;
            padding: 30px 20px;
            text-align: center;
        }
        
        .email-header h1 {
            margin: 0 0 10px 0;
            font-size: 24px;
            font-weight: bold;
        }
        
        .email-header p {
            margin: 0;
            font-size: 16px;
            opacity: 0.9;
        }
        
        /* Content styles */
        .email-content {
            padding: 30px 20px;
        }
        
        .email-content h2 {
            color: ${CHURCH_BRANDING.primaryColor};
            margin: 0 0 20px 0;
            font-size: 20px;
        }
        
        .email-content p {
            margin: 0 0 15px 0;
            font-size: 16px;
        }
        
        /* Highlight box styles */
        .highlight-box {
            background-color: #f0f9ff;
            border-left: 4px solid (${CHURCH_BRANDING.secondaryColor});
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        
        .highlight-box h3 {
            margin: 0 0 10px 0;
            color: ${CHURCH_BRANDING.primaryColor};
            font-size: 18px;
        }
        
        /* Contact info styles */
        .contact-info {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
        }
        
        .contact-info h3 {
            margin: 0 0 15px 0;
            color: ${CHURCH_BRANDING.primaryColor};
            font-size: 18px;
        }
        
        .contact-info p {
            margin: 0 0 8px 0;
            font-size: 14px;
        }
        
        /* Footer styles */
        .email-footer {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #666666;
        }
        
        /* Responsive styles */
        @media only screen and (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            
            .email-header, .email-content, .contact-info {
                padding: 20px 15px;
            }
            
            .email-header h1 {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <!-- Main email container -->
    <div class="email-container">
        
        <!-- Email header with church branding -->
        <div class="email-header">
            <h1>${CHURCH_BRANDING.churchName}</h1>
            <h3>${CHURCH_BRANDING.programName}</h3>
        </div>
        
        <!-- Main email content -->
        <div class="email-content">
            <h2>Registration Confirmed! ✅</h2>
            
            <p>Dear ${guardians.firstName} ${guardians.lastName},</p>
            
            <p>Thank you for registering your ${childText} for our Vacation Bible School program! We're excited to welcome <strong>${childrenNames}</strong> to VBS 2025.</p>
            
            <!-- Registration details highlight box -->
            <div class="highlight-box">
                <h3>Your Registration Details:</h3>
                <p><strong>Parent/Guardian:</strong> ${guardians.firstName} ${guardians.lastName}</p>
                <p><strong>Email:</strong> ${guardians.email}</p>
                <p><strong>Phone:</strong> ${guardians.phonePrimary}</p>
                <p><strong>Registered ${childText}:</strong> ${childrenNames}</p>
                <p><strong>Number of children:</strong> ${children.length}</p>
            </div>
            
            <p>Your ${childText} ${isAre} now registered for an amazing week of:</p>
            <ul>
                <li>Interactive Bible stories and lessons</li>
                <li>Fun crafts and activities</li>
                <li>Energetic music and worship</li>
                <li>Healthy snacks and fellowship</li>
                <li>Safe, supervised fun!</li>
            </ul>
            
            <!-- Important program information -->
            <div class="highlight-box">
                <h3>Important VBS Information:</h3>
                <p><strong>Dates:</strong> July 20-24, 2025</p>
                <p><strong>Time:</strong> 6:30 PM–8:45 PM daily</p>
                <p><strong>Ages:</strong> 4 years old to 11 years old</p>
                <p><strong>Cost:</strong> Completely FREE!</p>
                <p><strong>Location:</strong> ${CHURCH_BRANDING.address}</p>
            </div>
            
            <p>We'll be sending you more details about what to bring, daily schedules, and pickup procedures as we get closer to VBS week.</p>
        </div>
        
        <!-- Contact information section -->
        <div class="contact-info">
            <h3>Questions? Need to Make Changes?</h3>
            <p><strong>Phone:</strong> ${CHURCH_BRANDING.phoneNumber}</p>
            <p><strong>Email:</strong> ${CHURCH_BRANDING.contactEmail}</p>
            
            <p style="margin-top: 15px; font-style: italic;">
                If you need to cancel or make changes to your registration, 
                please contact us as soon as possible so we can plan accordingly.
                <br />
                Contact us at support@vbs.motlowcreekministries.com
            </p>
        </div>
        
        <!-- Email footer -->
        <div class="email-footer">
            <p>Blessings,<br>
            <strong>The VBS Team at ${CHURCH_BRANDING.churchName}</strong></p>
            
            <p style="margin-top: 20px; font-size: 12px; color: #999999;">
                You received this email because you registered for VBS 2025. 
                This is a confirmation email and not promotional content.
            </p>
        </div>
        
    </div>
</body>
</html>
    `.trim();
}

/**
 * Export branding configuration for use in other email templates
 * This allows consistent branding across all email types
 */
export { CHURCH_BRANDING };
