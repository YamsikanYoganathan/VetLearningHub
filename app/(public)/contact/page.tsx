import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Vetulan Service",
  description: "Contact the Vetulan Service team.",
};

export default function ContactPage() {
  return (
    <div className="container-page py-12 md:py-20 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-8">
        Contact Us
      </h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="lead">
          We would love to hear from you. Whether you have feedback, questions about our content, or partnership inquiries.
        </p>
        <p>
          <strong>Email:</strong> support@vetulanservice.com<br />
          <strong>Address:</strong> Veterinary Sciences Building, 123 University Road
        </p>
        <p>
          Our academic team typically responds within 48 hours to all content-related inquiries. For urgent technical support, please include "Urgent" in your email subject line.
        </p>
      </div>
    </div>
  );
}
