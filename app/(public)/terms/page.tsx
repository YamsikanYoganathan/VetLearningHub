import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Vetulan Service",
  description: "Terms of service and usage conditions for Vetulan Service.",
};

export default function TermsPage() {
  return (
    <div className="container-page py-12 md:py-20 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-8">
        Terms of Service
      </h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="text-sm text-muted-foreground mb-8">Last updated: August 2026</p>
        <h2>1. Agreement to Terms</h2>
        <p>
          By viewing or using this website, which can be accessed at www.vetulanservice.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws.
        </p>
        <h2>2. Medical Disclaimer</h2>
        <p>
          The content on Vetulan Service is for educational and informational purposes only. It does not constitute professional veterinary advice, diagnosis, or treatment. Always seek the advice of a qualified veterinary provider with any questions you may have regarding a medical condition in an animal.
        </p>
        <h2>3. Intellectual Property Rights</h2>
        <p>
          Other than the content you own, under these Terms, Vetulan Service and/or its licensors own all the intellectual property rights and materials contained in this Website.
        </p>
        <h2>4. Restrictions</h2>
        <p>
          You are specifically restricted from all of the following:
        </p>
        <ul>
          <li>publishing any Website material in any other media without prior attribution;</li>
          <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
          <li>using this Website in any way that is or may be damaging to this Website;</li>
          <li>using this Website contrary to applicable laws and regulations.</li>
        </ul>
      </div>
    </div>
  );
}
