"use client";

import React from "react";
import { Faq3, faqItems } from "@/components/ui/faq3";

export function Faq3Demo() {
  return (
    <Faq3
      heading="Frequently asked questions"
      description="Find answers to common questions about our design, development, and growth partnerships."
      items={faqItems}
    />
  );
}

export default Faq3Demo;
