"use client";

import React from "react";
import { Faq3, faqItems } from "@/components/ui/faq3";

export function Faq3Demo() {
  return (
    <Faq3
      heading="Questions before we start?"
      items={faqItems}
    />
  );
}

export default Faq3Demo;
