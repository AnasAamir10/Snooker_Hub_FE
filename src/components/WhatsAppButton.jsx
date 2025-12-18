import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "923244494986"; 
  const message = "Hello! I’d like to know more about Snooker Hub."; 
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-green-500 text-white rounded-full px-4 py-3 shadow-lg hover:bg-green-600 transition-all duration-300 group"
    >
      <FaWhatsapp className="text-3xl animate-pulse" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap">
        Chat on WhatsApp
      </span>
    </a>
  );
}
