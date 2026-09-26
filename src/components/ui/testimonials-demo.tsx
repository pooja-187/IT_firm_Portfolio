"use client";

import React from "react";
import { TestimonialsColumn, TestimonialItem } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

export const testimonials: TestimonialItem[] = [
  {
    text: "This ERP revolutionized our operations, streamlining finance and inventory. The cloud-based platform keeps us productive, even remotely.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    name: "Briana Patton",
    role: "Operations Manager",
  },
  {
    text: "Implementing this ERP was smooth and quick. The customizable, user-friendly interface made team training effortless.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    name: "Bilal Ahmed",
    role: "IT Manager",
  },
  {
    text: "The support team is exceptional, guiding us through setup and providing ongoing assistance, ensuring our satisfaction.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    name: "Saman Malik",
    role: "Customer Support Lead",
  },
  {
    text: "This ERP's seamless integration enhanced our business operations and efficiency. Highly recommend for its intuitive interface.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    name: "Omar Raza",
    role: "CEO",
  },
  {
    text: "Its robust features and quick support have transformed our workflow, making us significantly more efficient.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    name: "Zainab Hussain",
    role: "Project Manager",
  },
  {
    text: "The smooth implementation exceeded expectations. It streamlined processes, improving overall business performance.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Our business functions improved with a user-friendly design and positive customer feedback.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop",
    name: "Farhan Siddiqui",
    role: "Marketing Director",
  },
  {
    text: "They delivered a solution that exceeded expectations, understanding our needs and enhancing our operations.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=300&auto=format&fit=crop",
    name: "Sana Sheikh",
    role: "Sales Manager",
  },
  {
    text: "Using this ERP, our online presence and conversions significantly improved, boosting business performance.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
    name: "Hassan Ali",
    role: "E-commerce Manager",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative w-full py-20 sm:py-24 lg:py-32 overflow-hidden selection:bg-lime-200"
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage: `
          radial-gradient(
            ellipse 75% 50% at 50% 40%,
            rgba(163, 230, 53, 0.20) 0%,
            rgba(190, 242, 100, 0.10) 38%,
            rgba(217, 249, 157, 0.03) 65%,
            transparent 78%
          ),
          radial-gradient(
            ellipse 85% 60% at 50% 60%,
            rgba(163, 230, 53, 0.08) 0%,
            transparent 72%
          )
        `,
      }}
    >
      <div className="container z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[620px] mx-auto text-center"
        >
          {/* Section Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/5 mb-5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              09 / TESTIMONIALS
            </span>
          </div>

          <h2
            id="testimonials-heading"
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-[#111111] tracking-[-0.03em] leading-[1.12]"
          >
            What our clients say
          </h2>
          <p className="text-sm sm:text-base text-[#525B64] font-normal leading-relaxed mt-4 max-w-md">
            Real feedback from founders and teams we&apos;ve collaborated with to build digital products.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-14 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={16} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={20}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={18}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
