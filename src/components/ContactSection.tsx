"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Phone, Send, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
    timeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative w-full text-[#111111] py-14 sm:py-20 lg:py-24 overflow-hidden selection:bg-lime-200"
      style={{
        backgroundColor: "#FAFAF8",
        backgroundImage: `
          radial-gradient(
            ellipse 75% 55% at 80% 40%,
            rgba(183, 227, 106, 0.22) 0%,
            rgba(241, 248, 222, 0.12) 42%,
            transparent 75%
          ),
          radial-gradient(
            ellipse 65% 45% at 15% 75%,
            rgba(183, 227, 106, 0.12) 0%,
            transparent 65%
          )
        `,
      }}
    >
      <div className="w-full max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/5 mb-6 sm:mb-9 shadow-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16]" />
          <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
            12 / CONTACT
          </span>
        </motion.div>

        {/* ===================================================
            TWO-COLUMN GRID (42% Left / 58% Right)
           =================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ===================================================
              LEFT SIDE: Contact Info & 4 Leaf-shaped Cards
             =================================================== */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            {/* Header Content */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-sans text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#84CC16] block mb-2">
                BE IN TOUCH
              </span>
              <h2
                id="contact-heading"
                className="font-sans text-3xl sm:text-4xl lg:text-[40px] font-light text-[#111111] tracking-[-0.03em] leading-[1.14] mb-3"
              >
                Contact Info
              </h2>
              <p className="font-sans text-xs sm:text-[14.5px] text-[#525B64] font-normal leading-relaxed mb-4 max-w-md">
                Planning a new website, building software or an app, improving your marketing, or assessing your digital security? Tell me what you&apos;re working on and where you need support.
              </p>
            </motion.div>

            {/* Quick prompt notice */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#111111]"
            >
              <span className="text-[#64748B]">Prefer a quick conversation?</span>
              <a
                href="#whatsapp"
                className="inline-flex items-center gap-1 font-semibold text-[#65a30d] hover:text-[#4d7c0f] transition-colors"
              >
                Chat on WhatsApp &gt;
              </a>
            </motion.div>

            {/* 4 Asymmetrically Rounded Organic Cards (2x2 Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-1">
              
              {/* Card 01: WhatsApp (Top-Left leaf radius) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white border border-black/[0.08] rounded-tl-[30px] rounded-tr-[10px] rounded-bl-[10px] rounded-br-[10px] p-4 sm:p-5 transition-all duration-300 hover:shadow-md hover:border-[#84CC16]/70 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#84CC16]/15 flex items-center justify-center text-[#65a30d] mb-3 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <h3 className="font-sans font-semibold text-sm sm:text-[15px] text-[#111111] mb-1">
                    WhatsApp
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] text-[#64748B]">
                    Chat on WhatsApp &gt;
                  </p>
                </div>
              </motion.div>

              {/* Card 02: Email (Top-Right leaf radius) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white border border-black/[0.08] rounded-tr-[30px] rounded-tl-[10px] rounded-bl-[10px] rounded-br-[10px] p-4 sm:p-5 transition-all duration-300 hover:shadow-md hover:border-[#84CC16]/70 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#84CC16]/15 flex items-center justify-center text-[#65a30d] mb-3 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <h3 className="font-sans font-semibold text-sm sm:text-[15px] text-[#111111] mb-1">
                    Email
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] text-[#64748B] break-all">
                    [Business email]
                  </p>
                </div>
              </motion.div>

              {/* Card 03: Phone / WhatsApp (Bottom-Left leaf radius) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white border border-black/[0.08] rounded-bl-[30px] rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] p-4 sm:p-5 transition-all duration-300 hover:shadow-md hover:border-[#84CC16]/70 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#84CC16]/15 flex items-center justify-center text-[#65a30d] mb-3 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <h3 className="font-sans font-semibold text-sm sm:text-[15px] text-[#111111] mb-1">
                    Phone / WhatsApp
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] text-[#64748B]">
                    [Verified WhatsApp number]
                  </p>
                </div>
              </motion.div>

              {/* Card 04: Project Enquiry (Bottom-Right leaf radius) */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white border border-black/[0.08] rounded-br-[30px] rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px] p-4 sm:p-5 transition-all duration-300 hover:shadow-md hover:border-[#84CC16]/70 flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#84CC16]/15 flex items-center justify-center text-[#65a30d] mb-3 group-hover:scale-105 transition-transform">
                    <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <h3 className="font-sans font-semibold text-sm sm:text-[15px] text-[#111111] mb-1">
                    Project Enquiry
                  </h3>
                  <p className="font-sans text-xs sm:text-[13px] text-[#64748B]">
                    Send me your project details through the form.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>

          {/* ===================================================
              RIGHT SIDE: Organic Curved Contact Form Panel with Soft Subtle Lime Shade
             =================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative border border-[#84CC16]/25 shadow-[0_10px_35px_rgba(0,0,0,0.03)] p-6 sm:p-8 lg:p-10 
              rounded-tl-[65px] sm:rounded-tl-[90px] 
              rounded-br-[65px] sm:rounded-br-[90px] 
              rounded-tr-[22px] sm:rounded-tr-[28px] 
              rounded-bl-[22px] sm:rounded-bl-[28px] 
              overflow-hidden bg-white"
            style={{
              background: `
                radial-gradient(ellipse 85% 45% at 50% 0%, rgba(163, 230, 53, 0.15) 0%, rgba(217, 249, 157, 0.06) 45%, transparent 75%),
                linear-gradient(180deg, rgba(247, 252, 238, 0.65) 0%, #FFFFFF 50%)
              `,
            }}
          >
            {/* Soft Ambient Glow */}
            <div
              aria-hidden="true"
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#84CC16]/10 rounded-full blur-3xl pointer-events-none"
            />

            <div className="relative z-10">
              {/* Form Eyebrow & Headings */}
              <div className="mb-5 sm:mb-6 text-center sm:text-left">
                <div className="inline-flex items-center justify-center font-mono text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#4d7c0f] bg-[#84CC16]/15 border border-[#84CC16]/30 px-3 py-0.5 rounded-full mb-2.5">
                  LET&apos;S TALK
                </div>
                <h3 className="font-sans text-2xl sm:text-[28px] lg:text-[30px] font-light text-[#111111] tracking-tight leading-[1.2] mb-2">
                  Let&apos;s build your next digital experience.
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#525B64] font-normal leading-relaxed">
                  Planning a new website, building software or an app, improving your marketing, or assessing your digital security? Tell me what you&apos;re working on and where you need support.
                </p>
              </div>

              {/* Form / Submitted Success State */}
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/95 backdrop-blur-xs rounded-2xl p-7 text-center border border-[#84CC16] shadow-xs my-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#84CC16]/20 text-[#65a30d] mx-auto flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-sans text-lg sm:text-xl font-medium text-[#111111] mb-1.5">
                    Enquiry Received!
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#525B64] max-w-sm mx-auto mb-5">
                    Thank you for reaching out. I&apos;ll review your project details and get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        company: "",
                        service: "",
                        message: "",
                        timeline: "",
                      });
                    }}
                    className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#84CC16] hover:bg-[#72b312] text-[#111111] font-semibold text-xs tracking-wide uppercase transition-all shadow-sm"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  {/* Row 1: Your Name & Email Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5 text-left"
                      >
                        Your Name <span className="text-[#84CC16]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full px-4 py-2.5 sm:py-3 bg-white rounded-xl border border-black/[0.08] text-[#111111] placeholder:text-[#94A3B8] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#84CC16]/60 focus:border-[#84CC16] transition-all shadow-2xs"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5 text-left"
                      >
                        Email Address <span className="text-[#84CC16]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full px-4 py-2.5 sm:py-3 bg-white rounded-xl border border-black/[0.08] text-[#111111] placeholder:text-[#94A3B8] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#84CC16]/60 focus:border-[#84CC16] transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company / Website - Optional & Preferred Timeline - Optional */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    <div>
                      <label
                        htmlFor="company"
                        className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5 text-left"
                      >
                        Company / Website - Optional
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company / Website - Optional"
                        className="w-full px-4 py-2.5 sm:py-3 bg-white rounded-xl border border-black/[0.08] text-[#111111] placeholder:text-[#94A3B8] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#84CC16]/60 focus:border-[#84CC16] transition-all shadow-2xs"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="timeline"
                        className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5 text-left"
                      >
                        Preferred Timeline - Optional
                      </label>
                      <input
                        type="text"
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        placeholder="Preferred Timeline - Optional"
                        className="w-full px-4 py-2.5 sm:py-3 bg-white rounded-xl border border-black/[0.08] text-[#111111] placeholder:text-[#94A3B8] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#84CC16]/60 focus:border-[#84CC16] transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service Needed */}
                  <div>
                    <label
                      htmlFor="service"
                      className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5 text-left"
                    >
                      Service Needed <span className="text-[#84CC16]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="service"
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 sm:py-3 bg-white rounded-xl border border-black/[0.08] text-[#111111] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#84CC16]/60 focus:border-[#84CC16] transition-all appearance-none cursor-pointer shadow-2xs"
                      >
                        <option value="" disabled className="text-gray-400">
                          Select Service Needed
                        </option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Software Development">Software Development</option>
                        <option value="App Development">App Development</option>
                        <option value="Performance Marketing">Performance Marketing</option>
                        <option value="Ethical Hacking">Ethical Hacking</option>
                        <option value="Multiple Services">Multiple Services</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#64748B]">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Tell Me About Your Project */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block font-sans text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5 text-left"
                    >
                      Tell Me About Your Project <span className="text-[#84CC16]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell Me About Your Project"
                      className="w-full px-4 py-2.5 sm:py-3 bg-white rounded-xl border border-black/[0.08] text-[#111111] placeholder:text-[#94A3B8] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#84CC16]/60 focus:border-[#84CC16] transition-all resize-none shadow-2xs"
                    />
                  </div>

                  {/* Submit Button Area */}
                  <div className="pt-2 flex justify-center sm:justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 
                        bg-[#84CC16] hover:bg-[#72b312] active:bg-[#65a30d] text-[#111111] font-semibold text-xs sm:text-sm 
                        rounded-tl-[20px] rounded-br-[20px] rounded-tr-[8px] rounded-bl-[8px] 
                        shadow-[0_4px_16px_rgba(132,204,22,0.40)] hover:shadow-[0_6px_22px_rgba(132,204,22,0.55)] 
                        transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-[#111111] border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <span>Send Project Enquiry</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
