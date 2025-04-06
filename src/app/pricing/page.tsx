import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';

const tiers = [
  {
    name: 'Basic',
    id: 'tier-basic',
    href: '#',
    priceMonthly: '$29',
    description: 'Perfect for small businesses and startups.',
    features: [
      'Up to 3 domains or brand names',
      'Real-time monitoring',
      'Basic sentiment analysis',
      'Email notifications',
      '5,000 mentions per month',
      'Data retention: 3 months',
    ],
    mostPopular: false,
    cta: 'Start free trial',
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '#',
    priceMonthly: '$79',
    description: 'Ideal for growing businesses.',
    features: [
      'Up to 10 domains or brand names',
      'Real-time monitoring',
      'Advanced sentiment analysis',
      'Instant notifications',
      '25,000 mentions per month',
      'Data retention: 12 months',
      'API access',
      'Custom reports',
    ],
    mostPopular: true,
    cta: 'Start free trial',
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '#',
    priceMonthly: 'Custom',
    description: 'For large organizations with advanced needs.',
    features: [
      'Unlimited domains and brand names',
      'Real-time monitoring',
      'Advanced sentiment analysis',
      'Priority notifications',
      'Unlimited mentions',
      'Unlimited data retention',
      'API access',
      'Custom reports',
      'Dedicated support',
      'SLA guarantees',
    ],
    mostPopular: false,
    cta: 'Contact sales',
  },
];

const faqs = [
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes! We offer a 14-day free trial on all our plans. No credit card required.',
  },
  {
    question: 'Can I switch plans later?',
    answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.',
  },
  {
    question: 'Do you offer custom plans?',
    answer: 'Yes, our Enterprise plan can be customized to your specific needs. Contact our sales team to discuss your requirements.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards and can also arrange other payment methods for Enterprise customers.',
  },
  {
    question: 'What happens after my free trial?',
    answer: 'After your trial ends, you can choose to subscribe to any of our plans. We\'ll notify you before the trial ends.',
  },
];

export default function PricingPage() {
  return (
    <main className="bg-white pt-16">
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
        <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2 xl:max-w-none xl:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 ring-1 ring-gray-200 xl:p-10 ${
                tier.mostPopular ? 'bg-gray-900 text-white ring-gray-900' : 'bg-white'
              }`}
            >
              <h3
                id={tier.id}
                className={`text-lg font-semibold leading-8 ${
                  tier.mostPopular ? 'text-white' : 'text-gray-900'
                }`}
              >
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.priceMonthly}</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
              </p>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
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
      <div className="mx-auto max-w-2xl divide-y divide-gray-900/10 px-6 pb-24 sm:pb-32 lg:max-w-7xl lg:px-8 lg:pb-40">
        <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
          Frequently asked questions
        </h2>
        <dl className="mt-10 space-y-8 divide-y divide-gray-900/10">
          {faqs.map((faq) => (
            <div key={faq.question} className="pt-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-5">
                {faq.question}
              </dt>
              <dd className="mt-4 lg:col-span-7 lg:mt-0">
                <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </main>
  );
} 