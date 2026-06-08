export function track(eventName, params = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  try {
    window.gtag("event", eventName, params);
  } catch {}
}

export function trackConversion(sendTo, params = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  try {
    window.gtag("event", "conversion", { send_to: sendTo, ...params });
  } catch {}
}

export function trackLead(source = "form") {
  track("generate_lead", { source });
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;
  if (adsId && label) {
    trackConversion(`${adsId}/${label}`, { source });
  }
}

export function trackPhoneClick(source = "tel_link") {
  track("phone_click", { source });
  const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const label = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL;
  if (adsId && label) {
    trackConversion(`${adsId}/${label}`, { source });
  }
}

export function trackEmailClick(source = "mailto_link") {
  track("email_click", { source });
}
