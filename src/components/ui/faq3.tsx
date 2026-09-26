"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Faq3Props {
  heading?: string;
  description?: string;
  items?: FaqItem[];
}

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "What is your design and development process?",
    answer:
      "We begin by understanding your core business goals and user requirements, then move into interactive wireframing, high-fidelity UI design, production-ready development, and comprehensive quality testing.",
  },
  {
    id: "faq-2",
    question: "How long does a typical project take?",
    answer:
      "Timelines vary depending on scope. A focused marketing website typically takes 2–4 weeks, while complex SaaS products, mobile apps, or custom platforms typically range from 6–12 weeks.",
  },
  {
    id: "faq-3",
    question: "Do you work with startups and established businesses?",
    answer:
      "Yes, we collaborate with early-stage founders launching new MVPs as well as established companies seeking to redesign, optimize, or scale their existing digital systems.",
  },
  {
    id: "faq-4",
    question: "How do we communicate throughout the engagement?",
    answer:
      "You collaborate directly with Nashim Nazar and our team through weekly video syncs, asynchronous Loom updates, and a dedicated Slack/WhatsApp channel for real-time clarity.",
  },
  {
    id: "faq-5",
    question: "Do you provide post-launch support and maintenance?",
    answer:
      "Yes. After launch, we offer continuous support, performance monitoring, feature expansions, and technical optimization to ensure your digital presence thrives.",
  },
  {
    id: "faq-6",
    question: "How do we get started?",
    answer:
      "Simply reach out via our contact form or schedule a discovery call to discuss your goals, scope, and timeline.",
  },
];

export const Faq3 = ({
  heading = "Frequently asked questions",
  description = "Find answers to common questions about our services, workflow, and collaboration.",
  items = faqItems,
}: Faq3Props) => {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative w-full py-16 sm:py-24 lg:py-32 overflow-hidden selection:bg-lime-200"
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage: `
          radial-gradient(
            ellipse 75% 50% at 50% 35%,
            rgba(163, 230, 53, 0.18) 0%,
            rgba(190, 242, 100, 0.08) 38%,
            rgba(217, 249, 157, 0.02) 65%,
            transparent 78%
          ),
          radial-gradient(
            ellipse 85% 60% at 50% 65%,
            rgba(163, 230, 53, 0.06) 0%,
            transparent 70%
          )
        `,
      }}
    >
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 sm:space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex max-w-3xl flex-col text-center items-center"
        >
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/5 mb-5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              11 / FAQ
            </span>
          </div>

          <h2
            id="faq-heading"
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#111111] tracking-[-0.03em] leading-[1.12] mb-4"
          >
            {heading}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#525B64] font-normal leading-relaxed max-w-xl text-center">
            {description}
          </p>
        </motion.div>

        {/* Accordion Component */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-3xl bg-white/70 backdrop-blur-xs rounded-3xl p-6 sm:p-8 md:p-10 border border-black/[0.06] shadow-[0_15px_40px_rgba(0,0,0,0.03)]"
        >
          <Accordion type="single" collapsible className="w-full">
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="transition-all duration-200 hover:no-underline hover:text-[#84CC16]">
                  <span className="font-sans font-medium text-[#111111] text-base sm:text-lg lg:text-xl py-1 tracking-tight">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="font-sans text-[#525B64] text-sm sm:text-base leading-relaxed pt-1 pb-2">
                    {item.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default Faq3;
