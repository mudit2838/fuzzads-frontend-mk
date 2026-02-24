import React from 'react';
import { Award, CreditCard, Zap, TrendingDown } from 'lucide-react';

const features = [
  {
    title: "Prime Quality",
    desc: "Enjoy excellent SMM services at amazing prices!! We focus on quality.",
    icon: <Award className="w-8 h-8 text-brand-600" />
  },
  {
    title: "Various Payment Options",
    desc: "You can add funds via any payment option we provide.. Paytm, Cards, Crypto.",
    icon: <CreditCard className="w-8 h-8 text-brand-600" />
  },
  {
    title: "Cheap Services",
    desc: "We always make sure that our services are affordable for resellers.",
    icon: <TrendingDown className="w-8 h-8 text-brand-600" />
  },
  {
    title: "Super Fast Delivery",
    desc: "You can rest assured that your orders will be delivered fast.. Speed is priority!",
    icon: <Zap className="w-8 h-8 text-brand-600" />
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Why order SMM services here?
          </h2>
          <p className="mt-4 text-slate-600 text-lg">
            Learn how you can benefit from ordering SMM services on our panel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;