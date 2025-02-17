import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '19',
    features: [
      '3 social media platforms',
      '30 scheduled posts/month',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '49',
    features: [
      'All social platforms',
      'Unlimited scheduled posts',
      'Advanced analytics',
      'Priority support',
      'Team collaboration',
    ],
    popular: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '99',
    features: [
      'All Professional features',
      'Custom integrations',
      'Dedicated account manager',
      'API access',
      'Custom analytics',
    ],
  },
];

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    navigate('/signup', { state: { plan: planId } });
  };

  return (
    <div id="pricing" className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-lg transition-all duration-300 h-full ${
                selectedPlan === plan.id
                  ? 'ring-4 ring-primary transform scale-105'
                  : plan.popular
                  ? 'ring-2 ring-primary'
                  : 'hover:shadow-lg'
              } shadow-lg`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-0 px-3 py-1 bg-primary text-white text-sm font-semibold rounded-tr-lg rounded-bl-lg">
                  Popular
                </span>
              )}
              <div className="p-8 flex flex-col h-full">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                  <p className="mt-4">
                    <span className="text-4xl font-extrabold">${plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </p>
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg
                          className="h-5 w-5 text-green-500"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span className="ml-3 text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto pt-8">
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full rounded-md px-4 py-2 transition-colors ${
                      selectedPlan === plan.id
                        ? 'bg-primary text-white'
                        : 'bg-primary/90 text-white hover:bg-primary'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
