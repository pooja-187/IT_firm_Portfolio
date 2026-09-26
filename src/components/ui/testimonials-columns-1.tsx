"use client";

import React from "react";
import { motion } from "motion/react";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-8 sm:p-9 rounded-3xl border border-black/[0.06] bg-white/95 backdrop-blur-xs shadow-[0_10px_30px_rgba(0,0,0,0.04)] max-w-xs w-full transition-all duration-300 hover:shadow-[0_20px_40px_rgba(132,204,22,0.15)] hover:border-[#84CC16]/40 hover:-translate-y-1 select-none"
                  key={i}
                >
                  <div className="text-sm sm:text-[14.5px] leading-relaxed text-[#334155] font-normal">
                    &ldquo;{text}&rdquo;
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      referrerPolicy="no-referrer"
                      className="h-10 w-10 rounded-full object-cover border border-black/10 shadow-xs"
                    />
                    <div className="flex flex-col">
                      <div className="font-semibold text-sm tracking-tight text-[#111827] leading-5">
                        {name}
                      </div>
                      <div className="text-xs text-[#64748B] leading-5 tracking-tight font-medium">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
