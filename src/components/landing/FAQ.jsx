import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { question: "What is an SMM panel?", answer: "SMM panels are online stores that offer SMM services of different kinds. People use them to buy likes, followers, views, etc." },
  { question: "Are SMM services safe to buy?", answer: "Using our SMM services is definitely safe, you won't lose your accounts." },
  { question: "Mass orders — what are they?", answer: "The mass order feature allows placing multiple orders with different links at once to save time." },
  { question: "How does Drip-feed work?", answer: "Drip-feed allows you to build engagement at the speed you want. Get 100/day for 10 days instead of 1000 at once." }
];

const FAQ = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Frequently asked questions</h2>
          <p className="mt-4 text-slate-600">We chose some of the most popular questions and replied to them.</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
              <button onClick={() => setActive(active === index ? null : index)} className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50">
                <span className="text-lg font-bold text-slate-800">{index + 1}. {faq.question}</span>
                {active === index ? <Minus className="text-brand-600" /> : <Plus className="text-slate-400" />}
              </button>
              {active === index && <div className="p-6 pt-0 text-slate-600 border-t border-slate-100">{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;