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
    question:
      "How do I choose the best UI UX designer in Kottayam, Kerala for my project?",
    answer:
      "Look for relevant work, a clear design process, strong communication, and an understanding of your business goals. Ask about the designer's role in previous projects and how they approach user needs. You can explore my selected work and contact me to discuss whether we're a good fit.",
  },
  {
    id: "faq-2",
    question: "What services do you provide?",
    answer:
      "I work with the Manzio Creative Studio team to provide UI/UX design, software development, app development, performance marketing, and ethical hacking. We'll define the deliverables and responsibilities around your project's needs.",
  },
  {
    id: "faq-3",
    question: "What is your role at Manzio Creative Studio?",
    answer:
      "I'm the CEO & Founder of Manzio Creative Studio Pvt Ltd. I lead the team and work across UI/UX design, digital strategy, and performance marketing.",
  },
  {
    id: "faq-4",
    question: "Can I work with you directly?",
    answer:
      "Yes. You can contact me directly to discuss your project. Depending on the scope, I may work on it personally or involve the Manzio team. We'll clarify responsibilities before starting.",
  },
  {
    id: "faq-5",
    question: "Do you offer both design and development?",
    answer:
      "Yes. I provide UI/UX and website design, with software and app development support available through Manzio. The proposal will clearly explain which services are included.",
  },
  {
    id: "faq-6",
    question: "Can you redesign my existing website or app?",
    answer:
      "Yes. We can start by reviewing the existing experience, understanding its challenges, and identifying what needs to improve before defining the redesign scope.",
  },
  {
    id: "faq-7",
    question: "Do you work with clients outside Kerala?",
    answer:
      "Yes. I work remotely with businesses across India and internationally, with communication and review arrangements agreed at the start.",
  },
  {
    id: "faq-8",
    question: "How much will my project cost?",
    answer:
      "Pricing depends on the scope, complexity, deliverables, and level of support required. Once I understand your brief, I'll provide a proposal covering the work, timeline, and fees.",
  },
  {
    id: "faq-9",
    question: "How long will the project take?",
    answer:
      "The timeline depends on the project's size, requirements, and review stages. We'll agree on a realistic schedule before work begins.",
  },
  {
    id: "faq-10",
    question: "How do I get started?",
    answer:
      "Send me a brief description of your business, what you need, and your preferred timeline. I'll review the details and discuss the next steps with you.",
  },
];

export const Faq3 = ({
  heading = "Questions before we start?",
  description,
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
              11 / FREQUENTLY ASKED QUESTIONS
            </span>
          </div>

          <h2
            id="faq-heading"
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#111111] tracking-[-0.03em] leading-[1.12]"
          >
            {heading}
          </h2>
          {description && (
            <p className="font-sans text-sm sm:text-base text-[#525B64] font-normal leading-relaxed max-w-xl text-center mt-4">
              {description}
            </p>
          )}
        </motion.div>

        {/* Accordion Component */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-3xl border-t border-black/[0.08]"
        >
          <Accordion type="single" collapsible className="w-full">
            {items.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-b border-black/[0.08]"
              >
                <AccordionTrigger className="py-5 sm:py-6 transition-all duration-200 hover:no-underline hover:text-[#84CC16]">
                  <span className="font-sans font-medium text-[#111111] text-base sm:text-lg lg:text-xl py-1 tracking-tight text-left">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="font-sans text-[#525B64] text-sm sm:text-base leading-relaxed pt-1 pb-4 text-left">
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
