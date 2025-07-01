"use client";

import CookieConsent from "react-cookie-consent";

export function CookieConsentBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      cookieName="churchWebsiteConsent"
      style={{ background: "#2b373b" }}
      buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
    >
      This website uses cookies to enhance your experience and help us improve
      our services.
    </CookieConsent>
  );
}
