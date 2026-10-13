"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import Image from "next/image";
import { Users, RefreshCw, GitBranch, Layers } from "lucide-react";

const content = [
  {
    title: "Collaborative Editing",
    description:
      "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex flex-col items-center justify-center text-white p-6 text-center">
        <Users className="w-12 h-12 mb-3 opacity-90" />
        <span className="text-xl font-semibold tracking-tight">Collaborative Editing</span>
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full relative">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
          width={400}
          height={400}
          className="h-full w-full object-cover"
          alt="Real time team collaboration"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
          <span className="text-white text-sm font-medium flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-emerald-400" /> Real-time Sync
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Version control",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-amber-500 to-orange-600 flex flex-col items-center justify-center text-white p-6 text-center">
        <GitBranch className="w-12 h-12 mb-3 opacity-90" />
        <span className="text-xl font-semibold tracking-tight">Version Control</span>
      </div>
    ),
  },
  {
    title: "Running out of content",
    description:
      "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
    content: (
      <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white p-6 text-center">
        <Layers className="w-12 h-12 mb-3 opacity-90" />
        <span className="text-xl font-semibold tracking-tight">Scalable Architecture</span>
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="w-full">
      <StickyScroll content={content} />
    </div>
  );
}

export default StickyScrollRevealDemo;
