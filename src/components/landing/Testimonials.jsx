import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  { name: "Rahul", role: "Business Owner", text: "Finding this SMM panel helped me save SO much time and money on building social media accounts! Highly recommend them.", initial: "R" },
  { name: "Vikram", role: "Influencer", text: "I do SMM promotions for different businesses and this panel has been a great discovery! Tasks are done super quickly now.", initial: "V" }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-brand-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Customer reviews</h2>
          <p className="mt-4 text-slate-600">See our customers' reviews below!!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-xl font-bold text-brand-600">{review.initial}</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Hello I Am {review.name}</h4>
                  <div className="flex text-yellow-400 mt-1">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
                </div>
              </div>
              <p className="text-slate-600 italic">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;