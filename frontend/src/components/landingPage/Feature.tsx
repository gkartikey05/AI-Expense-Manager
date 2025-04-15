import { ReceiptText, Wallet, Target, BarChart3 } from "lucide-react";

const features = [
  {
    name: "Expense Tracking",
    icon: ReceiptText,
    description:
      "Monitor where your money goes with categorized expense logging and real-time updates.",
  },
  {
    name: "Budgeting",
    icon: Wallet,
    description:
      "Set monthly or category-based budgets to control overspending and stay financially disciplined.",
  },
  {
    name: "Goal Tracking",
    icon: Target,
    description:
      "Create and track financial goals like saving for a trip or emergency fund with progress visualization.",
  },
  {
    name: "Reports",
    icon: BarChart3,
    description:
      "Gain insights with detailed reports and visual summaries to understand spending habits and trends.",
  },
];

export default function Feature() {
  return (
    <div className="bg-white py-18 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">
            Manage Better
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Everything you need to Manage your Finance
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            With Fundly, managing your finances becomes effortless.Get a clear view of where your
            money goes, and make smarter decisions with easy-to-understand
            reports and budgeting tools, all tailored to help you take control
            of your financial journey.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      aria-hidden="true"
                      className="size-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
