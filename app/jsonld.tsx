export default function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Pedal Generator Simulator',
    description: 'Interactive pedal-powered generator simulator that calculates energy output, battery restoration, calories burned, and power output based on user inputs.',
    url: 'https://pedal-generator.vercel.app',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Real-time energy calculations',
      'Battery capacity restoration calculator',
      'Calorie burn estimation',
      'Power output calculation',
      'Multi-language support',
      'Dark mode support',
    ],
    screenshot: 'https://pedal-generator.vercel.app/og-image.png',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

