import Script from "next/script";

export default function GoogleAnalytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  if (!GA_ID && !ADS_ID) return null;

  const primaryId = GA_ID || ADS_ID;

  const configCode = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    ${GA_ID ? `gtag('config', '${GA_ID}', { anonymize_ip: true });` : ""}
    ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ""}
  `;

  return (
    <>
      <Script
        id="gtag-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`}
      />
      <Script
        id="gtag-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: configCode }}
      />
    </>
  );
}
