import Script from "next/script";

const STORAGE_KEY = "th_cookie_consent_v1";

export default function ConsentInit() {
  const code = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      security_storage: 'granted',
      wait_for_update: 500
    });
    try {
      var stored = localStorage.getItem('${STORAGE_KEY}');
      if (stored) {
        var c = JSON.parse(stored);
        gtag('consent', 'update', {
          ad_storage: c.marketing ? 'granted' : 'denied',
          ad_user_data: c.marketing ? 'granted' : 'denied',
          ad_personalization: c.marketing ? 'granted' : 'denied',
          analytics_storage: c.analytics ? 'granted' : 'denied'
        });
      }
    } catch (e) {}
  `;

  return (
    <Script
      id="consent-init"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}
