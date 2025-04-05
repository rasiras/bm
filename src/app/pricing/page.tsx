import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';

const tiers = [
  {
    name: 'Starter',
    id: 'starter',
    price: '$29',
    description: 'Perfect for small businesses just getting started with brand monitoring.',
    features: [
      'Up to 1,000 mentions per month',
      'Basic sentiment analysis',
      'Twitter and Reddit monitoring',
      'Email notifications',
      'Basic analytics dashboard',
    ],
    cta: 'Start with Starter',
    mostPopular: false,
  },
  {
    name: 'Professional',
    id: 'professional',
    price: '$99',
    description: 'Ideal for growing businesses that need more comprehensive monitoring.',
    features: [
      'Up to 10,000 mentions per month',
      'Advanced sentiment analysis',
      'All social media platforms',
      'Real-time notifications',
      'Advanced analytics dashboard',
      'Custom alerts and filters',
      'API access',
    ],
    cta: 'Start with Professional',
    mostPopular: true,
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    price: 'Custom',
    description: 'For large organizations requiring full-scale brand monitoring solutions.',
    features: [
      'Unlimited mentions',
      'AI-powered sentiment analysis',
      'All data sources',
      'Priority support',
      'Custom integrations',
      'Dedicated account manager',
      'SLA guarantees',
      'Custom reporting',
    ],
    cta: 'Contact sales',
    mostPopular: false,
  },
];

export default function PricingPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Choose the plan that best fits your needs. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
        <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
      </div>

      {/* Pricing section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 ring-1 ring-gray-200 ${
                tier.mostPopular
                  ? 'bg-gray-900 ring-gray-900'
                  : 'bg-white'
              }`}
            >
              <h3
                className={`text-lg font-semibold leading-8 ${
                  tier.mostPopular ? 'text-white' : 'text-gray-900'
                }`}
              >
                {tier.name}
              </h3>
              <p
                className={`mt-4 text-sm leading-6 ${
                  tier.mostPopular ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={`text-4xl font-bold tracking-tight ${
                    tier.mostPopular ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {tier.price}
                </span>
                {tier.price !== 'Custom' && (
                  <span
                    className={`text-sm font-semibold leading-6 ${
                      tier.mostPopular ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    /month
                  </span>
                )}
              </p>
              <ul
                role="list"
                className={`mt-8 space-y-3 text-sm leading-6 ${
                  tier.mostPopular ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className={`h-6 w-5 flex-none ${
                        tier.mostPopular ? 'text-white' : 'text-indigo-600'
                      }`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.name === 'Enterprise' ? '/contact' : '/sign-up'}
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.mostPopular
                    ? 'bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-white'
                    : 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            <div className="pt-6">
              <dt className="text-lg font-semibold leading-7 text-gray-900">
                What's included in the free trial?
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                All features of the Professional plan are available during your 14-day free trial. No credit card required.
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg font-semibold leading-7 text-gray-900">
                Can I switch plans later?
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </dd>
            </div>
            <div className="pt-6">
              <dt className="text-lg font-semibold leading-7 text-gray-900">
                Do you offer custom plans?
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Yes, our Enterprise plan can be customized to your specific needs. Contact our sales team to learn more.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
} 