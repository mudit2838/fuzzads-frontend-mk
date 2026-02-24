import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
      <a href="#" className="bg-[#25D366] p-3.5 rounded-full text-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
        <MessageCircle size={28} fill="white" />
      </a>
      <a href="#" className="bg-[#0088cc] p-3.5 rounded-full text-white shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
        <Send size={26} className="ml-0.5" />
      </a>
    </div>
  );
};

export default FloatingButtons;