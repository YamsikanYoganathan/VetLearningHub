import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Vetulan Service",
  description: "Learn about Vetulan Service and our mission.",
};

export default function AboutPage() {
  return (
    <div className="container-page py-12 md:py-20 max-w-3xl">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-8">
        About Vetulan Service
      </h1>
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="lead">
          Vetulan Service is a premium veterinary learning and knowledge platform designed for veterinary students, professionals, and academics.
        </p>
        <p>
          Our mission is to provide evidence-based veterinary medicine in a simplified, accessible, and structured format. By organizing comprehensive clinical knowledge across multiple academic disciplines, we aim to be the definitive clinical reference for veterinary professionals.
        </p>
        <h2>Our Platform</h2>
        <p>
          The platform is structured to reflect actual academic curriculums, starting from broad Academic Areas, drilling down into specific Subjects and Topics, and finally providing detailed, peer-reviewed clinical Notes and Protocols.
        </p>
        <p>
          Whether you are revising for an exam or seeking point-of-care references during clinical practice, Vetulan is built to be fast, accurate, and easy to navigate.
        </p>
      </div>
    </div>
  );
}
