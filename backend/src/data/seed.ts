import { PortfolioDataset } from "../types/index.js";

export const INITIAL_PORTFOLIO_DATA: PortfolioDataset = {
  hero: {
    name: "Nashim Nazar",
    headlineLine1: "Kerala's Best",
    headlineLine2: "UI/UX",
    headlineLine3: "Designer",
    mainText:
      "UI/UX Designer, Software & Digital Product Professional. Crafting high-conversion digital experiences and scalable interfaces.",
    readMoreLink: "#expertise",
    imageSrc: "/images/projects/ChatGPT Image Sep 28, 2026, 03_14_07 PM.png",
    imageAlt: "Nashim Nazar - UI/UX Designer",
    locationText: "Kottayam, Kerala",
    availabilityText: "AVAILABLE WORLDWIDE",
    ctaText: "View My Work",
    ctaUrl: "#selected-work",
  },

  expertise: {
    statementLine1: "Design expertise.",
    statementLine2: "Marketing perspective.",
    statementLine3: "Founder-led execution.",
    pills: [
      {
        id: "ui-ux",
        name: "UI/UX Design",
        iconBg: "bg-[#FF6B00]",
        rotation: -4.5,
        side: "left",
        displayOrder: 1,
        isActive: true,
      },
      {
        id: "software-dev",
        name: "Software Development",
        iconBg: "bg-[#00A3FF]",
        rotation: 3.5,
        side: "left",
        displayOrder: 2,
        isActive: true,
      },
      {
        id: "app-dev",
        name: "App Development",
        iconBg: "bg-[#262626]",
        rotation: -3.5,
        side: "left",
        displayOrder: 3,
        isActive: true,
      },
      {
        id: "performance-mkt",
        name: "Performance Marketing",
        iconBg: "bg-[#FFD600]",
        rotation: 4,
        side: "right",
        displayOrder: 4,
        isActive: true,
      },
      {
        id: "ethical-hacking",
        name: "Ethical Hacking",
        iconBg: "bg-[#00E676]",
        rotation: -4,
        side: "right",
        displayOrder: 5,
        isActive: true,
      },
    ],
  },

  projects: [
    {
      id: "proj-1",
      title: "Travinno",
      slug: "travinno",
      client: "Travinno AI Travel",
      category: "AI Travel Platform",
      year: "2026",
      shortDescription:
        "AI-driven conversational travel planning and personalized flight & stay booking platform.",
      coverImage: "/images/projects/travinno.jpg",
      caseStudyImage: "/images/projects/travinno_case_study_1790317600813.jpg",
      galleryImages: [
        "/images/projects/travinno.jpg",
        "/images/projects/travinno_case_study_1790317600813.jpg",
      ],
      projectUrl: "#selected-work",
      isFeatured: true,
      isPublished: true,
      displayOrder: 1,
    },
    {
      id: "proj-2",
      title: "Manzio Creative Studio",
      slug: "manzio",
      client: "Manzio Creative Studio Pvt Ltd",
      category: "Creative Agency",
      year: "2025",
      shortDescription:
        "Full-cycle digital studio showcase, interactive portfolio, and client conversion engine.",
      coverImage: "/images/projects/manzio.jpg",
      caseStudyImage: "/images/projects/manzio_case_study_1790317623945.jpg",
      galleryImages: [
        "/images/projects/manzio.jpg",
        "/images/projects/manzio_case_study_1790317623945.jpg",
      ],
      projectUrl: "https://manzio.marketing",
      isFeatured: true,
      isPublished: true,
      displayOrder: 2,
    },
    {
      id: "proj-3",
      title: "Faazo",
      slug: "faazo",
      client: "Faazo Smart Delivery",
      category: "Logistics & Delivery",
      year: "2025",
      shortDescription:
        "Enterprise route optimization, driver companion app, and automated fleet dispatcher.",
      coverImage: "/images/projects/faazo.jpg",
      caseStudyImage: "/images/projects/faazo_case_study_1790317552000.jpg",
      galleryImages: [
        "/images/projects/faazo.jpg",
        "/images/projects/faazo_case_study_1790317552000.jpg",
      ],
      projectUrl: "#selected-work",
      isFeatured: false,
      isPublished: true,
      displayOrder: 3,
    },
    {
      id: "proj-4",
      title: "Careva",
      slug: "careva",
      client: "Careva Healthcare",
      category: "Health Portal",
      year: "2025",
      shortDescription:
        "Telemedicine consultation portal, electronic patient health records, and prescription manager.",
      coverImage: "/images/projects/careva.jpg",
      caseStudyImage: "/images/projects/careva_case_study_1790317675921.jpg",
      galleryImages: [
        "/images/projects/careva.jpg",
        "/images/projects/careva_case_study_1790317675921.jpg",
      ],
      projectUrl: "#selected-work",
      isFeatured: false,
      isPublished: true,
      displayOrder: 4,
    },
    {
      id: "proj-5",
      title: "Mangalam Holidays",
      slug: "mangalam",
      client: "Mangalam Group",
      category: "Holiday Experiences",
      year: "2024",
      shortDescription:
        "Custom luxury travel curator, seasonal experiential itinerary booking, and concierge platform.",
      coverImage: "/images/projects/mangalam.jpg",
      caseStudyImage: "/images/projects/mangalam_case_study_1790317714403.jpg",
      galleryImages: [
        "/images/projects/mangalam.jpg",
        "/images/projects/mangalam_case_study_1790317714403.jpg",
      ],
      projectUrl: "#selected-work",
      isFeatured: false,
      isPublished: true,
      displayOrder: 5,
    },
    {
      id: "proj-6",
      title: "Auraluxe",
      slug: "auraluxe",
      client: "Auraluxe Acoustics",
      category: "Luxury Audio",
      year: "2024",
      shortDescription:
        "High-fidelity audiophile hardware e-commerce platform with minimal acoustic product storytelling.",
      coverImage: "/images/projects/auraluxe.jpg",
      caseStudyImage: "/images/projects/auraluxe_case_study_1790317748022.jpg",
      galleryImages: [
        "/images/projects/auraluxe.jpg",
        "/images/projects/auraluxe_case_study_1790317748022.jpg",
      ],
      projectUrl: "#selected-work",
      isFeatured: false,
      isPublished: true,
      displayOrder: 6,
    },
    {
      id: "proj-7",
      title: "Fortune Dentals",
      slug: "fortune-dentals",
      client: "Fortune Clinic Network",
      category: "Dental Healthcare",
      year: "2024",
      shortDescription:
        "Digital patient intake, clinic calendar booking, and interactive dental cosmetic treatment visualizer.",
      coverImage:
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=900&auto=format&fit=crop",
      caseStudyImage:
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1400&auto=format&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=900&auto=format&fit=crop",
      ],
      projectUrl: "#selected-work",
      isFeatured: false,
      isPublished: true,
      displayOrder: 7,
    },
    {
      id: "proj-8",
      title: "Eucalia Glamps",
      slug: "eucalia-glamps",
      client: "Eucalia Hospitality",
      category: "Luxury Glamping",
      year: "2024",
      shortDescription:
        "Nature immersion booking portal featuring 360-degree dome suite reviews and sustainable glamping reserves.",
      coverImage:
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=900&auto=format&fit=crop",
      caseStudyImage:
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1400&auto=format&fit=crop",
      galleryImages: [
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=900&auto=format&fit=crop",
      ],
      projectUrl: "#selected-work",
      isFeatured: false,
      isPublished: true,
      displayOrder: 8,
    },
  ],

  clients: [
    {
      id: "client-1",
      name: "TRAVINNO",
      href: "#selected-work",
      isFeatured: true,
      category: "AI Travel Platform",
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: "client-2",
      name: "MANGALAM TRAVEL AND TOURS",
      category: "Travel & Hospitality",
      displayOrder: 2,
      isPublished: true,
    },
    {
      id: "client-3",
      name: "MANGALAM HOLIDAYS",
      category: "Holiday Experiences",
      displayOrder: 3,
      isPublished: true,
    },
    {
      id: "client-4",
      name: "OPEN VISAS",
      category: "Visa & Immigration",
      displayOrder: 4,
      isPublished: true,
    },
    {
      id: "client-5",
      name: "LAUNDREMAISON",
      category: "Premium Care",
      displayOrder: 5,
      isPublished: true,
    },
    {
      id: "client-6",
      name: "HOTEL PASSION",
      category: "Boutique Hospitality",
      displayOrder: 6,
      isPublished: true,
    },
    {
      id: "client-7",
      name: "OPEN NURSES",
      category: "Healthcare Staffing",
      displayOrder: 7,
      isPublished: true,
    },
    {
      id: "client-8",
      name: "FAZO",
      href: "#selected-work",
      category: "Logistics & Delivery",
      isFeatured: false,
      displayOrder: 8,
      isPublished: true,
    },
    {
      id: "client-9",
      name: "FORTUNE DENTALS",
      category: "Dental Healthcare",
      displayOrder: 9,
      isPublished: true,
    },
    {
      id: "client-10",
      name: "UKNOWTRIP",
      category: "Travel Discovery",
      displayOrder: 10,
      isPublished: true,
    },
    {
      id: "client-11",
      name: "HACK THE SKILL",
      category: "EdTech Platform",
      displayOrder: 11,
      isPublished: true,
    },
    {
      id: "client-12",
      name: "EUCALIA GLAMPS",
      category: "Luxury Glamping",
      displayOrder: 12,
      isPublished: true,
    },
  ],

  services: [
    {
      id: "srv-1",
      serviceKey: "design",
      category: "01 / Design",
      selectorLabel: "01 / UI/UX DESIGN",
      name: "UI/UX Design",
      iconName: "Palette",
      image:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop",
      description:
        "Create websites and applications that are clear, engaging, and easy to use. I turn your business requirements into thoughtful user journeys and interfaces.",
      bullets: [
        "User research and user flows",
        "Wireframing and interactive prototyping",
        "Website and mobile app UI design",
        "Dashboard and SaaS product design",
        "Design systems and usability reviews",
      ],
      ctaText: "Discuss Your Design Project",
      ctaHref: "#contact",
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: "srv-2",
      serviceKey: "development",
      category: "02 / Development",
      selectorLabel: "02 / SOFTWARE DEVELOPMENT",
      name: "Software Development",
      iconName: "Code2",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      description:
        "Build custom software around the way your business works. Through Manzio, we develop solutions that simplify workflows, connect information, and support daily operations.",
      bullets: [
        "Custom business software",
        "CRM and management systems",
        "SaaS product development",
        "Admin dashboards and customer portals",
        "API integrations and workflow automation",
      ],
      ctaText: "Discuss Your Software Idea",
      ctaHref: "#contact",
      displayOrder: 2,
      isPublished: true,
    },
    {
      id: "srv-3",
      serviceKey: "mobile",
      category: "03 / Mobile",
      selectorLabel: "03 / APP DEVELOPMENT",
      name: "App Development",
      iconName: "Smartphone",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
      description:
        "Bring your idea to life with a mobile application built around your users' needs. Our team supports the journey from planning and interface design to development and launch.",
      bullets: [
        "Android and iOS applications",
        "Cross-platform app development",
        "Backend development and API integration",
        "App testing and launch support",
        "App maintenance and improvements",
      ],
      ctaText: "Discuss Your App Idea",
      ctaHref: "#contact",
      displayOrder: 3,
      isPublished: true,
    },
    {
      id: "srv-4",
      serviceKey: "growth",
      category: "04 / Growth",
      selectorLabel: "04 / PERFORMANCE MARKETING",
      name: "Performance Marketing",
      iconName: "TrendingUp",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      description:
        "Reach relevant audiences through measurable advertising campaigns. I combine campaign strategy, creative direction, and landing-page insights to help businesses generate leads and sales.",
      bullets: [
        "Meta Ads and Google Ads",
        "Lead-generation and sales campaigns",
        "Remarketing campaigns",
        "Conversion tracking and reporting",
        "Campaign testing and optimization",
      ],
      ctaText: "Discuss Your Marketing Goals",
      ctaHref: "#contact",
      displayOrder: 4,
      isPublished: true,
    },
    {
      id: "srv-5",
      serviceKey: "security",
      category: "05 / Security",
      selectorLabel: "05 / ETHICAL HACKING",
      name: "Ethical Hacking",
      iconName: "ShieldCheck",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop",
      description:
        "Identify security weaknesses through authorized testing of your digital systems. Get clear findings and practical recommendations to help your team address vulnerabilities.",
      bullets: [
        "Website and web application security assessments",
        "Vulnerability assessment and penetration testing",
        "Authentication and access-control testing",
        "Security findings and remediation guidance",
        "Retesting after fixes",
      ],
      note: "All testing is conducted within an agreed scope and with the system owner's authorization.",
      ctaText: "Discuss a Security Assessment",
      ctaHref: "#contact",
      displayOrder: 5,
      isPublished: true,
    },
  ],

  process: [
    {
      id: "step-1",
      number: "01",
      title: "Understand",
      description:
        "Deeply analyzing your core business goals, target audience, and market context to establish clear direction.",
      rotation: -2,
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: "step-2",
      number: "02",
      title: "Define",
      description:
        "Structuring user journeys, information architecture, and strategic scope into an actionable roadmap.",
      rotation: 1,
      displayOrder: 2,
      isPublished: true,
    },
    {
      id: "step-3",
      number: "03",
      title: "Create",
      description:
        "Crafting high-fidelity UI/UX, refined design systems, and responsive digital interfaces with meticulous attention.",
      rotation: -1,
      displayOrder: 3,
      isPublished: true,
    },
    {
      id: "step-4",
      number: "04",
      title: "Deliver",
      description:
        "Translating designs into clean, production-ready code with seamless responsiveness and peak performance.",
      rotation: 1,
      displayOrder: 4,
      isPublished: true,
    },
    {
      id: "step-5",
      number: "05",
      title: "Review",
      description:
        "Continuous feedback loops, iterative quality assurance, and ongoing optimization for measurable results.",
      rotation: -1,
      displayOrder: 5,
      isPublished: true,
    },
  ],

  about: [
    {
      id: "abt-1",
      tag: "01 / Founder & Creative Lead",
      title: "The person behind the work.",
      subtitle: "Nashim Nazar",
      role: "Founder & CEO, Manzio Creative Studio Pvt Ltd",
      description:
        "I'm Nashim Nazar — a UI/UX designer, performance marketer, and CEO & Founder of Manzio Creative Studio Pvt Ltd. Dedicated to crafting digital experiences that perform, inspire, and drive real business growth.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      displayOrder: 1,
    },
    {
      id: "abt-2",
      tag: "02 / Multidisciplinary Perspective",
      title: "Design, Technology & Marketing",
      subtitle: "Intuitive User Experiences",
      role: "High-fidelity UI/UX & responsive architectures",
      description:
        "My work brings together design, technology, and marketing. I help businesses understand what their customers need and turn those insights into websites and digital products that are clear, useful, and easy to navigate.",
      image:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop",
      displayOrder: 2,
    },
    {
      id: "abt-3",
      tag: "03 / User & Business Alignment",
      title: "User-Centered & Business Strategy",
      subtitle: "Business-Driven Outcomes",
      role: "Conversion optimization & marketing scale",
      description:
        "As a designer, I focus on how an experience works, from the first interaction to the final action. As a founder, I also consider the business behind it: its goals, priorities, and opportunities for sustainable growth.",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
      displayOrder: 3,
    },
    {
      id: "abt-4",
      tag: "04 / End-to-End Execution",
      title: "Full-Cycle Team Delivery",
      subtitle: "Full-Cycle Engineering",
      role: "Web apps, mobile solutions & cybersecurity",
      description:
        "Through Manzio, I lead a creative team working across design, software and app development, marketing, and digital security. Depending on your project, we can support you from the initial idea through launch and ongoing improvement.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
      displayOrder: 4,
    },
  ],

  values: [
    {
      id: "val-1",
      number: "01",
      title: "A design and marketing perspective",
      description:
        "I consider how people discover your business, experience your website, and decide whether to contact you.",
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: "val-2",
      number: "02",
      title: "Direct collaboration",
      description:
        "You work with me to define priorities, review ideas, and make informed decisions throughout the project.",
      displayOrder: 2,
      isPublished: true,
    },
    {
      id: "val-3",
      number: "03",
      title: "Support from a creative team",
      description:
        "When your project needs broader expertise, Manzio brings together design, development, branding, and marketing support.",
      displayOrder: 3,
      isPublished: true,
    },
    {
      id: "val-4",
      number: "04",
      title: "Clear reasoning behind the work",
      description:
        "I explain the thinking behind key decisions so you understand how the design supports your users and goals.",
      displayOrder: 4,
      isPublished: true,
    },
  ],

  testimonials: [
    {
      id: "test-1",
      text: "This platform revolutionized our digital operations, streamlining finance and customer journeys with exceptional UX.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
      name: "Briana Patton",
      role: "Operations Manager",
      company: "Apex Global",
      rating: 5,
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: "test-2",
      text: "Working with Nashim was smooth and quick. The custom design and intuitive interface made team adoption effortless.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      name: "Bilal Ahmed",
      role: "IT Manager",
      company: "Novatech",
      rating: 5,
      displayOrder: 2,
      isPublished: true,
    },
    {
      id: "test-3",
      text: "The strategic design insight is exceptional, guiding us through setup and ongoing improvements with business clarity.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
      name: "Saman Malik",
      role: "Product Lead",
      company: "Careva Health",
      rating: 5,
      displayOrder: 3,
      isPublished: true,
    },
    {
      id: "test-4",
      text: "Seamless brand integration and high-conversion UX enhanced our operations. Highly recommend Nashim's execution.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
      name: "Omar Raza",
      role: "CEO",
      company: "Travinno AI",
      rating: 5,
      displayOrder: 4,
      isPublished: true,
    },
    {
      id: "test-5",
      text: "Robust interface architecture and clean responsive design transformed our user satisfaction and booking metrics.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
      name: "Zainab Hussain",
      role: "Project Director",
      company: "Mangalam Tours",
      rating: 5,
      displayOrder: 5,
      isPublished: true,
    },
    {
      id: "test-6",
      text: "The website redesign implementation exceeded our expectations. It streamlined booking and raised our brand presence.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
      name: "Aliza Khan",
      role: "Business Analyst",
      company: "Laundremaison",
      rating: 5,
      displayOrder: 6,
      isPublished: true,
    },
    {
      id: "test-7",
      text: "Our business functions improved significantly with a user-friendly product experience and great customer retention.",
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop",
      name: "Farhan Siddiqui",
      role: "Marketing Director",
      company: "Faazo",
      rating: 5,
      displayOrder: 7,
      isPublished: true,
    },
    {
      id: "test-8",
      text: "Delivered a digital experience that exceeded expectations, understanding our target demographic with perfection.",
      image:
        "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=300&auto=format&fit=crop",
      name: "Sana Sheikh",
      role: "Growth Lead",
      company: "Open Visas",
      rating: 5,
      displayOrder: 8,
      isPublished: true,
    },
    {
      id: "test-9",
      text: "Our online conversions and inquiries jumped by 40% after launching the new design system developed with Nashim.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
      name: "Hassan Ali",
      role: "Founder",
      company: "Auraluxe",
      rating: 5,
      displayOrder: 9,
      isPublished: true,
    },
  ],

  insights: [
    {
      id: "art-1",
      number: "01",
      category: "INSIGHTS",
      title: "What to Prepare Before Hiring a UI/UX Designer",
      slug: "what-to-prepare-before-hiring-ui-ux-designer",
      description: "Planned article.",
      status: "PLANNED",
      image:
        "https://cdn.21st.dev/assets/mirror/b1/b1177c0755f746a3864277b0a089b7c6a89cf374ed1fe36666e4adf5c473cc1e.jpg",
      publishedDate: "2026-10-15",
      displayOrder: 1,
    },
    {
      id: "art-2",
      number: "02",
      category: "INSIGHTS",
      title: "How I Approach a Business Website Redesign",
      slug: "how-i-approach-business-website-redesign",
      description: "Planned article.",
      status: "PLANNED",
      image:
        "https://cdn.21st.dev/assets/mirror/56/56eec2c41db77472758692502d75accb6c923ecec986bce58bafe1fb9f233b4f.jpg",
      publishedDate: "2026-10-22",
      displayOrder: 2,
    },
    {
      id: "art-3",
      number: "03",
      category: "INSIGHTS",
      title: "Behind the Design: A Recent Client Project",
      slug: "behind-the-design-recent-client-project",
      description: "Planned article.",
      status: "PLANNED",
      image:
        "https://cdn.21st.dev/assets/mirror/c1/c1f7a98c5bf068254308b7dca62217f47a7c852fe792d6e37dbc81f5b262b6e8.jpg",
      publishedDate: "2026-10-29",
      displayOrder: 3,
    },
  ],

  faq: [
    {
      id: "faq-1",
      question:
        "How do I choose the best UI UX designer in Kottayam, Kerala for my project?",
      answer:
        "Look for relevant work, a clear design process, strong communication, and an understanding of your business goals. Ask about the designer's role in previous projects and how they approach user needs. You can explore my selected work and contact me to discuss whether we're a good fit.",
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: "faq-2",
      question: "What services do you provide?",
      answer:
        "I work with the Manzio Creative Studio team to provide UI/UX design, software development, app development, performance marketing, and ethical hacking. We'll define the deliverables and responsibilities around your project's needs.",
      displayOrder: 2,
      isPublished: true,
    },
    {
      id: "faq-3",
      question: "What is your role at Manzio Creative Studio?",
      answer:
        "I'm the CEO & Founder of Manzio Creative Studio Pvt Ltd. I lead the team and work across UI/UX design, digital strategy, and performance marketing.",
      displayOrder: 3,
      isPublished: true,
    },
    {
      id: "faq-4",
      question: "Can I work with you directly?",
      answer:
        "Yes. You can contact me directly to discuss your project. Depending on the scope, I may work on it personally or involve the Manzio team. We'll clarify responsibilities before starting.",
      displayOrder: 4,
      isPublished: true,
    },
    {
      id: "faq-5",
      question: "Do you offer both design and development?",
      answer:
        "Yes. I provide UI/UX and website design, with software and app development support available through Manzio. The proposal will clearly explain which services are included.",
      displayOrder: 5,
      isPublished: true,
    },
    {
      id: "faq-6",
      question: "Can you redesign my existing website or app?",
      answer:
        "Yes. We can start by reviewing the existing experience, understanding its challenges, and identifying what needs to improve before defining the redesign scope.",
      displayOrder: 6,
      isPublished: true,
    },
    {
      id: "faq-7",
      question: "Do you work with clients outside Kerala?",
      answer:
        "Yes. I work remotely with businesses across India and internationally, with communication and review arrangements agreed at the start.",
      displayOrder: 7,
      isPublished: true,
    },
    {
      id: "faq-8",
      question: "How much will my project cost?",
      answer:
        "Pricing depends on the scope, complexity, deliverables, and level of support required. Once I understand your brief, I'll provide a proposal covering the work, timeline, and fees.",
      displayOrder: 8,
      isPublished: true,
    },
    {
      id: "faq-9",
      question: "How long will the project take?",
      answer:
        "The timeline depends on the project's size, requirements, and review stages. We'll agree on a realistic schedule before work begins.",
      displayOrder: 9,
      isPublished: true,
    },
    {
      id: "faq-10",
      question: "How do I get started?",
      answer:
        "Send me a brief description of your business, what you need, and your preferred timeline. I'll review the details and discuss the next steps with you.",
      displayOrder: 10,
      isPublished: true,
    },
  ],

  socialLinks: [
    {
      id: "soc-1",
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/nashimnazar",
      isActive: true,
      displayOrder: 1,
    },
    {
      id: "soc-2",
      platform: "Twitter / X",
      url: "https://twitter.com/nashimnazar",
      isActive: true,
      displayOrder: 2,
    },
    {
      id: "soc-3",
      platform: "Instagram",
      url: "https://instagram.com",
      isActive: true,
      displayOrder: 3,
    },
    {
      id: "soc-4",
      platform: "WhatsApp",
      url: "https://wa.me/919999999999",
      isActive: true,
      displayOrder: 4,
    },
    {
      id: "soc-5",
      platform: "Facebook",
      url: "https://facebook.com",
      isActive: true,
      displayOrder: 5,
    },
  ],

  settings: {
    brandName: "Nashim Nazar",
    contactEmail: "hello@nashimnazar.in",
    contactPhone: "+91 99999 99999",
    whatsappNumber: "+91 99999 99999",
    location: "Kottayam, Kerala",
    availability: "AVAILABLE WORLDWIDE",
    footerBio:
      "UI/UX Designer, Software & Digital Product Professional. Turning complex business ideas into intuitive digital interfaces and high-conversion experiences.",
    copyrightText: "© 2026 Nashim Nazar. All rights reserved.",
  },

  enquiries: [
    {
      id: "enq-1",
      name: "Rahul Menon",
      email: "rahul@keralastartups.in",
      company: "TravelKite Technologies",
      timeline: "Within 1 Month",
      service: "UI/UX Design",
      message:
        "Hi Nashim, we need an intuitive design system and dashboard UI for our new B2B travel booking portal. Love your Travinno project!",
      status: "NEW",
      createdAt: new Date().toISOString(),
      notes: "Follow up via email tomorrow morning.",
    },
  ],
};
