import React from 'react';
import { UserPlus, Wallet, ShoppingCart, BarChart3 } from 'lucide-react';

const steps = [
  { id: 1, title: "Register & Log in", desc: "Begin with signing up and then log in to your account.", icon: <UserPlus size={32} /> },
  { id: 2, title: "Add Funds", desc: "Add funds to your account using a preferred payment method.", icon: <Wallet size={32} /> },
  { id: 3, title: "Place Orders", desc: "Select the services you need to help your business get popular.", icon: <ShoppingCart size={32} /> },
  { id: 4, title: "Amazing Results", desc: "We'll inform you once your order is ready. Enjoy results!!", icon: <BarChart3 size={32} /> }
];

const HowItWorks = () => {
  return (
    // Added 'bg-blue-900' as a fallback if 'bg-brand-900' fails
    <section className="py-24 bg-blue-900 bg-brand-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">How it works</h2>
          <p className="mt-4 text-blue-100 text-lg">Follow these 4 easy steps to learn how to use our panel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-blue-400/50"></div>
          
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-600 border-4 border-blue-700 flex items-center justify-center mb-6 shadow-lg text-white">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.id}. {step.title}</h3>
              <p className="text-blue-100 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;