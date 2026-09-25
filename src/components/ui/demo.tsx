"use client"

import React from "react"
import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from "@/components/blocks/animated-gallery"

const IMAGES_1 = [
  "https://cdn.21st.dev/assets/mirror/db/db8e72b6f6e2f325ec74898fdab6a02f3c0ba7962f3cf0b89f0ee3b22aa2a083.jpg",
  "https://cdn.21st.dev/assets/mirror/77/777c9bd220f0c47c9eb699ebbd77fb0c6c9a8d8b0cd77f089bab93a18586d578.jpg",
  "https://cdn.21st.dev/assets/mirror/f9/f992831c368ea7e12c51417be55fda812d1502e9bb6730d94bc6b1e0c6a2ae57.jpg",
  "https://cdn.21st.dev/assets/mirror/8c/8c0a104646b9b9d6680c2222cf84cfd3e4e10ada11fd0d0759093db9a69cfd3d.jpg",
]
const IMAGES_2 = [
  "https://cdn.21st.dev/assets/mirror/4e/4eb85747c8113c6edcbec2671a5aa4e62d0569488ad75652c16dd7598a1196e1.jpg",
  "https://cdn.21st.dev/assets/mirror/ab/ab1fd4fd007ecad2ad9a5350341b1013589f05f8f30b8fdd4a35728a800e9fce.jpg",
  "https://cdn.21st.dev/assets/mirror/4d/4de1f4952d0420f95ade25fc723d8042ece00762429cdccb79fd3a29ffe5f33d.jpg",
  "https://cdn.21st.dev/assets/mirror/53/53f281293f06536d7f60b1786b0a39404390a55e1675e99e089d2b72234cf8cb.jpg",
]
const IMAGES_3 = [
  "https://cdn.21st.dev/assets/mirror/35/358a63f0c4cb478488bdf1bfb90ed5fd785c28bcddbf058b4a7287fe8ed75fff.jpg",
  "https://cdn.21st.dev/assets/mirror/e8/e81126a3c16766e36ed84d2226b0b11507e86b999d4d07cd7e88c0f04e14c0eb.jpg",
  "https://cdn.21st.dev/assets/mirror/77/777c9bd220f0c47c9eb699ebbd77fb0c6c9a8d8b0cd77f089bab93a18586d578.jpg",
  "https://cdn.21st.dev/assets/mirror/85/85a98f8253097be06cfdaa5a312c644d4df00749aad17dda4468ab8d3dce7bd0.jpg",
]

export const DemoVariant1 = () => {
  return (
    <div id="work" className="relative bg-[#FAFAF8] pt-16 sm:pt-20 overflow-hidden">
      {/* Soft Lime Atmospheric Background Glow behind heading */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-[650px] sm:h-[750px] z-0"
        style={{
          background: `
            radial-gradient(
              ellipse 65% 50% at 50% 42%,
              rgba(190, 235, 120, 0.18) 0%,
              rgba(190, 235, 120, 0.10) 28%,
              rgba(190, 235, 120, 0.045) 48%,
              transparent 72%
            ),
            radial-gradient(
              ellipse 95% 60% at 50% 40%,
              rgba(215, 240, 175, 0.07) 0%,
              transparent 68%
            )
          `,
        }}
      />

      <ContainerStagger className="relative z-10 max-w-4xl mx-auto px-6 text-center mb-8 sm:mb-12">
        {/* Section Label */}
        <ContainerAnimated className="flex justify-center mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" />
            <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#64748B]">
              03 — SELECTED WORK
            </span>
          </div>
        </ContainerAnimated>

        {/* Main Heading */}
        <ContainerAnimated>
          <h2 className="font-sans font-normal tracking-[-0.03em] text-[#111111] text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] leading-[1.12]">
            Selected work where{" "}
            <span className="font-serif italic font-normal text-[#84CC16]">
              design
            </span>
            , technology and{" "}
            <span className="text-[#64748B]">business come together.</span>
          </h2>
        </ContainerAnimated>

        {/* Supporting Text */}
        <ContainerAnimated className="mt-4 sm:mt-5 max-w-2xl mx-auto">
          <p className="font-sans text-sm sm:text-base text-[#64748B] font-normal leading-relaxed">
            A selection of projects shaped through thoughtful design, technology and business-focused thinking.
          </p>
        </ContainerAnimated>
      </ContainerStagger>

      <ContainerScroll className="relative h-[350vh]">
        <ContainerSticky className="h-svh">
          <GalleryContainer className="">
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
              {IMAGES_1.map((imageUrl, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full  rounded-md  object-cover shadow"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
            <GalleryCol className="mt-[-50%]" yRange={["15%", "5%"]}>
              {IMAGES_2.map((imageUrl, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full  rounded-md  object-cover shadow"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2">
              {IMAGES_3.map((imageUrl, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full  rounded-md  object-cover shadow"
                  src={imageUrl}
                  alt="gallery item"
                />
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  )
}
