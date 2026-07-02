"use client";

import Link from "next/link";
import { CSSProperties, FormEvent, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiAward,
  FiBriefcase,
  FiCode,
  FiCpu,
  FiDatabase,
  FiDownload,
  FiExternalLink,
  FiGithub,
  FiInstagram,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiMessageCircle,
  FiMapPin,
  FiPhone,
  FiSend,
  FiStar,
  FiTool,
  FiTrendingUp,
} from "react-icons/fi";
import dynamic from "next/dynamic";
import { LiquidPortraitReveal } from "@/components/liquid-portrait-reveal";

const Hero3D = dynamic(() => import("@/components/hero/Hero3D").then((mod) => mod.Hero3D), {
  ssr: false,
});

const resumeHref = "/Aravindh_049.pdf";
const whatsappNumber = "919030706558";

const googleFormConfig = {
  formResponseUrl: "",
  fields: {
    name: "",
    phone: "",
    email: "",
    message: "",
  },
} as const;

const isGoogleFormConfigured =
  Boolean(googleFormConfig.formResponseUrl) &&
  Object.values(googleFormConfig.fields).every(Boolean);

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: resumeHref },
] as const;

const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ash04931", icon: FiLinkedin },
  { label: "Instagram", href: "https://www.instagram.com/sunny.verse_37/", icon: FiInstagram },
  { label: "GitHub", href: "https://github.com/cris-pat-37", icon: FiGithub },
] as const;

const highlights = [
  { value: "3.8/4.0", label: "TGPA" },
  { value: "2+", label: "Active client builds" },
  { value: "Rs.50K+", label: "Amount paid by client" },
] as const;

const projects = [
  {
    title: "Restaurant Ordering System",
    description:
      "Built a direct online ordering platform for a restaurant, reducing dependency on third-party delivery apps and increasing direct customer orders.",
    stack: ["React.js", "Tailwind CSS", "Supabase", "Vercel", "Railway", "Razorpay"],
    features: [
      "Single-brand ordering flow similar to Swiggy/Zomato",
      "Payment integration and database-backed order handling",
      "Generated over Rs. 8 Lakhs in total sales/revenue for the client",
      "Improved monthly revenue by approximately Rs. 75,000",
    ],
    role: "Freelance Developer",
    featured: true,
    github: "https://github.com/cris-pat-37",
    live: "https://bangaruvakili.com/",
  },
  {
    title: "Business AI Chatbot",
    description:
      "Developing an automation chatbot that answers customer questions instantly, captures leads, and improves conversion opportunities.",
    stack: ["Python", "FastAPI", "OpenAI API", "WhatsApp API", "n8n", "Webhooks"],
    features: [
      "FAQ automation with prompt-engineered responses",
      "Lead capture workflow for business follow-up",
      "API and webhook integration for faster customer handling",
    ],
    role: "AI Automation Builder",
    featured: false,
    github: "https://github.com/cris-pat-37",
    live: "#contact",
  },
  {
    title: "AI Calling Agent for Hospital",
    description:
      "Built a conversational voice agent for hospital inquiries, appointment support, intent detection, and urgent-case prioritization.",
    stack: ["Python", "Twilio/VAPI", "OpenAI API", "FastAPI", "n8n"],
    features: [
      "24/7 voice support for patient inquiries",
      "Urgency detection and appointment booking",
      "Doctor dashboard updates in real time",
    ],
    role: "Voice AI Builder",
    featured: false,
    github: "https://github.com/cris-pat-37",
    live: "#contact",
  },
  {
    title: "Semantic Search & Vector Embeddings",
    description:
      "Designed an intelligent retrieval pipeline that uses embeddings to return context-aware results beyond keyword matching.",
    stack: ["Python", "LangChain", "FAISS/Pinecone", "OpenAI Embeddings"],
    features: [
      "Intent-aware search over embedded content",
      "Scalable retrieval pipeline for AI applications",
      "Improved relevance compared with keyword search",
    ],
    role: "AI Systems Developer",
    featured: false,
    github: "https://github.com/cris-pat-37",
    live: "#contact",
  },
] as const;

const skills = [
  {
    title: "Programming",
    items: ["Python", "JavaScript", "SQL", "HTML", "CSS"],
    icon: FiCode,
  },
  {
    title: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Figma"],
    icon: FiLayers,
  },
  {
    title: "Backend & Data",
    items: ["FastAPI", "Supabase", "Docker", "Railway", "Vercel"],
    icon: FiDatabase,
  },
  {
    title: "AI & Automation",
    items: ["OpenAI API", "Claude", "Prompt Engineering", "Vector Embeddings", "n8n"],
    icon: FiCpu,
  },
] as const;

const experienceItems = [
  {
    title: "Software Intern",
    company: "Codegres",
    period: "Current",
    detail:
      "Working as a software intern, contributing to software delivery while sharpening production development, team collaboration, and client-focused engineering habits.",
    links: [
      { label: "Website", href: "https://codegres.com/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/codegres/" },
    ],
  },
  {
    title: "Freelance Developer",
    company: "Client Projects",
    period: "2025 - Present",
    detail:
      "Working with two active clients on live business solutions: a restaurant ordering website that increases direct sales and an AI chatbot automation system for customer queries, lead capture, and conversions.",
    links: [{ label: "Live client work", href: "https://bangaruvakili.com/" }],
  },
] as const;

const achievementItems = [
  {
    title: "Innovators Hackathon 2026",
    subtitle: "4th place - NMIET in collaboration with T-Hub",
    detail:
      "Earned a top finish at a national-level hackathon for practical innovation, fast execution, and product thinking under pressure.",
    icon: FiAward,
  },
  {
    title: "Innovation Category Winner",
    subtitle: "1st place in innovation category",
    detail:
      "Recognized for building ideas that translated into compelling real-world value and strong implementation clarity.",
    icon: FiStar,
  },
  {
    title: "T-Hub Incubation Invitation",
    subtitle: "Invited to T-Hub for incubation",
    detail:
      "Selected for further exploration and support around venture potential after innovation-focused work.",
    icon: FiAward,
  },
  {
    title: "State-Level Hackathon Participant",
    subtitle: "NIAT in collaboration with OpenAI",
    detail:
      "Participated in a state-level AI and engineering challenge, strengthening rapid prototyping, teamwork, and applied AI thinking.",
    icon: FiAward,
  },
  {
    title: "Selected for Google Code Round",
    subtitle: "Reached Round 2",
    detail:
      "Advanced to the second round, reflecting consistent problem solving and coding practice.",
    icon: FiCode,
  },
  {
    title: "President, Gen AI Club",
    subtitle: "Community leadership",
    detail:
      "Led initiatives, collaboration, and experimentation around applied generative AI and student learning.",
    icon: FiCpu,
  },
  {
    title: "Class Representative",
    subtitle: "Leadership, workshops, and technical events",
    detail:
      "Represented the class, volunteered in multiple college workshops and technical events, and handled coordination responsibilities.",
    icon: FiBriefcase,
  },
  {
    title: "Entrepreneurship & Extra-Curriculars",
    subtitle: "Freelancing agency, content creation, cricket",
    detail:
      "Co-running a freelancing agency with active client delivery, creating content part-time, and bringing teamwork from state-level cricket into technical work.",
    icon: FiTrendingUp,
  },
] as const;

const languageItems = [
  { language: "English", level: "Professional communication" },
  { language: "Hindi", level: "Fluent conversation" },
  { language: "Telugu", level: "Native / fluent" },
  { language: "German", level: "Beginner" },
] as const;

const activeItems = [
  "Freelancing agency",
  "Technical workshops",
  "Content creation",
  "AI entrepreneurship",
  "State-level cricket",
  "Client communication",
] as const;

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl space-y-4">
      <p className="display-font text-sm uppercase tracking-[0.22em] text-cyan-300/80">
        {eyebrow}
      </p>
      <h2 className="display-font text-3xl font-semibold text-white md:text-5xl">
        {title}
      </h2>
      <p className="max-w-xl text-base leading-8 text-slate-300 md:text-lg">
        {description}
      </p>
    </div>
  );
}

export function PortfolioPage() {
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [lastMessage, setLastMessage] = useState("");

  const maskStyle = useMemo(
    () =>
      ({
        "--mx": `${cursor.x}%`,
        "--my": `${cursor.y}%`,
      }) as CSSProperties,
    [cursor],
  );

  const handleHeroPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setCursor({ x, y });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");

    try {
      if (isGoogleFormConfigured) {
        const body = new FormData();
        body.append(googleFormConfig.fields.name, formState.name);
        body.append(googleFormConfig.fields.phone, formState.phone);
        body.append(googleFormConfig.fields.email, formState.email);
        body.append(googleFormConfig.fields.message, formState.message);

        await fetch(googleFormConfig.formResponseUrl, {
          method: "POST",
          mode: "no-cors",
          body,
        });
      } else {
        console.warn("Google Form is not configured yet. Add the formResponse URL and entry ids.");
      }

      setLastMessage(formState.message);
      setSubmitState("success");
      setFormState({ name: "", phone: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setSubmitState("error");
    }
  };

  const urgentWhatsappHref = useMemo(() => {
    const message = lastMessage || formState.message || "Hi Aravindh, I need urgent help.";
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [formState.message, lastMessage]);

  return (
    <main className="section-grid relative overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(20,184,166,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(250,204,21,0.10),transparent_25%),radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.10),transparent_30%)]" />

      <motion.div
        className="pointer-events-none fixed z-50 hidden h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/12 blur-3xl md:block"
        animate={{
          left: `${cursor.x}vw`,
          top: `${cursor.y}vh`,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.7 }}
      />

      <header className="fixed inset-x-0 top-0 z-40 mx-auto w-full px-4 pt-4 md:px-6">
        <nav className="glass-panel mx-auto flex max-w-7xl items-center justify-between rounded-lg px-5 py-3">
          <Link href="#home" className="display-font text-sm font-semibold tracking-[0.2em] text-white">
            V. ARAVINDH
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-slate-300 hover:text-cyan-200"
                {...(item.href.startsWith("/") ? { download: true } : {})}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="ring-glow rounded-lg border border-white/10 bg-white/5 p-2 text-slate-100 hover:-translate-y-0.5 hover:text-cyan-200"
              >
                <Icon size={16} />
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <section
        id="home"
        className="relative flex min-h-screen items-center px-4 pb-16 pt-28 md:px-6"
        onPointerMove={handleHeroPointerMove}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Hero3D />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(4,5,13,0.22)_38%,rgba(4,5,13,0.82)_100%)]" />
        </div>

        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative">
            <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-cyan-300/10 blur-3xl" />

            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-slate-950/45 p-7 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-12">
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-wrap gap-2"
                >
                  {["Software Intern", "AI Automation", "CSE Data Science"].map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-cyan-300/20 bg-cyan-300/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200"
                    >
                      {item}
                    </span>
                  ))}
                </motion.div>

                <div className="space-y-5">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.05 }}
                    className="display-font text-5xl font-semibold leading-none text-white sm:text-6xl md:text-7xl"
                  >
                    Vishwapathi Aravindh
                  </motion.h1>

                  <div className="space-y-4">
                    <p className="max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                      First-year B.Tech CSE Data Science student building real-world web applications, AI systems, and business automation tools.
                    </p>

                    <div
                      style={maskStyle}
                      className="hero-mask max-w-2xl rounded-lg border border-cyan-300/20 bg-cyan-300/8 p-4"
                    >
                      <p className="text-base leading-8 text-cyan-100 md:text-lg">
                        I like solving practical problems with products that ship: client ordering platforms, AI chatbots, voice agents, and retrieval systems that help businesses move faster.
                      </p>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.18 }}
                  className="flex flex-col gap-4 sm:flex-row"
                >
                  <Link
                    href="#projects"
                    className="ring-glow inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 hover:-translate-y-0.5"
                  >
                    View Work
                    <FiArrowUpRight />
                  </Link>
                  <Link
                    href={resumeHref}
                    download
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-white/6 px-6 py-3 text-sm font-semibold text-white hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-white/10"
                  >
                    Download Resume
                    <FiDownload />
                  </Link>
                </motion.div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-8 gap-y-5 border-t border-white/8 pt-6 text-sm text-slate-300">
                  <div className="min-w-0">
                    <p className="text-slate-500">Email</p>
                    <Link href="mailto:vishwaphathiaravindh@gmail.com" className="mt-1 block break-all hover:text-cyan-200">
                      vishwaphathiaravindh@gmail.com
                    </Link>
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-500">Phone</p>
                    <Link href="tel:+919030706558" className="mt-1 block whitespace-nowrap hover:text-cyan-200">
                      +91 9030706558
                    </Link>
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-500">Location</p>
                    <p className="mt-1">Hyderabad, India</p>
                  </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
                  {highlights.map((item) => (
                    <div key={item.label} className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <p className="display-font text-2xl font-semibold text-white">{item.value}</p>
                      <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.2 }}
              className="absolute -bottom-14 left-1/2 flex -translate-x-1/2 items-center gap-2 text-sm uppercase tracking-[0.22em] text-slate-400"
            >
              Scroll
              <FiArrowDown />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              transform: `perspective(1400px) rotateX(${(50 - cursor.y) / 18}deg) rotateY(${(cursor.x - 50) / 14}deg)`,
            }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_120deg_at_50%_50%,rgba(120,240,255,0.25),rgba(34,197,94,0.18),rgba(250,204,21,0.16),rgba(99,102,241,0.20),rgba(120,240,255,0.25))] blur-3xl" />
            <div className="glass-panel relative overflow-hidden rounded-lg border border-white/12 p-5">
              <div className="absolute inset-x-5 top-5 h-24 rounded-lg bg-cyan-300/20 blur-3xl" />
              <LiquidPortraitReveal
                baseSrc="/images/aravind.png"
                revealSrc="/images/aravind-f1.png"
                alt="Vishwapathi Aravindh portrait"
              />
              <div className="relative mt-4 flex flex-col gap-2 rounded-lg border border-white/10 bg-slate-950/50 px-4 py-3 text-sm text-slate-200 sm:flex-row sm:items-center sm:justify-between">
                <span className="display-font tracking-[0.18em] text-cyan-200/90">CURRENTLY</span>
                <span className="flex items-center gap-2 text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  Software Intern at Codegres
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="px-4 py-24 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionHeading
            eyebrow="About"
            title="Practical engineering with an entrepreneurial edge."
            description="My strongest work sits where software meets a real business problem: clear interfaces, useful automation, and products that can actually run."
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-lg p-8 md:p-10"
          >
            <p className="text-lg leading-9 text-slate-200 md:text-xl">
              I am pursuing B.Tech in Computer Science and Engineering with a Data Science focus at Aurora Deemed to be University (NIAT). Alongside college, I work on live client projects and AI systems, including ordering platforms, customer automation, voice agents, and semantic search pipelines.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/5 p-5">
                <p className="display-font text-lg font-semibold text-white">Education</p>
                <p className="mt-3 leading-7 text-slate-300">
                  B.Tech CSE (Data Science), Aurora Deemed to be University (NIAT), 2025 - Present.
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 p-5">
                <p className="display-font text-lg font-semibold text-white">Strengths</p>
                <p className="mt-3 leading-7 text-slate-300">
                  Problem solving, fast learning, public speaking, entrepreneurship, client handling, and execution focus.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="projects" className="px-4 py-24 md:px-6">
        <div className="mx-auto max-w-7xl space-y-12">
          <SectionHeading
            eyebrow="Selected Work"
            title="Projects tied to business outcomes."
            description="These are the strongest resume-aligned builds: shipped client work, AI automation, voice workflows, and retrieval systems."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className={`group glass-panel relative overflow-hidden rounded-lg p-6 ${
                  project.featured ? "lg:col-span-2" : ""
                }`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,240,255,0.13),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.10),transparent_28%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      {project.featured ? (
                        <span className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/8 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-200">
                          <FiStar />
                          Featured
                        </span>
                      ) : null}
                    </div>
                    <span className="rounded-lg border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                      {project.role}
                    </span>
                  </div>

                  <h3 className="display-font text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-slate-300">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-6 space-y-3 text-sm text-slate-300">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-3 pt-8">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white hover:border-cyan-200/40 hover:text-cyan-100"
                    >
                      <FiGithub />
                      GitHub
                    </Link>
                    <Link
                      href={project.live}
                      target={project.live.startsWith("http") ? "_blank" : undefined}
                      rel={project.live.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 hover:-translate-y-0.5"
                    >
                      {project.live.startsWith("http") ? "Live Site" : "Discuss"}
                      <FiArrowUpRight />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="px-4 py-24 md:px-6">
        <div className="mx-auto max-w-7xl space-y-12">
          <SectionHeading
            eyebrow="Skills"
            title="A stack shaped around shipping useful products."
            description="The site now reflects the resume stack more closely: frontend delivery, backend APIs, data tools, AI integrations, and deployment platforms."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {skills.map(({ title, items, icon: Icon }, index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass-panel rounded-lg p-6"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-300/20">
                  <Icon size={22} />
                </div>
                <h3 className="display-font text-xl font-semibold text-white">{title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ scale: 1.04 }}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="px-4 py-24 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-10">
            <SectionHeading
              eyebrow="Experience"
              title="Internship and client delivery."
              description="Current software internship work and live client products, focused on practical delivery and real business outcomes."
            />

            <div className="space-y-8">
              {experienceItems.map((item, index) => (
                <motion.div
                  key={`${item.title}-${item.company}`}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-300/25 bg-slate-950 ring-4 ring-cyan-300/8">
                    <FiBriefcase className="text-cyan-200" />
                  </div>
                  <div className="glass-panel rounded-lg p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="display-font text-xl font-semibold text-white">{item.title}</p>
                        <p className="mt-2 text-sm uppercase tracking-[0.18em] text-cyan-200/80">
                          {item.company}
                        </p>
                      </div>
                      <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-4 text-base leading-8 text-slate-300">{item.detail}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {item.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/6 px-4 py-2 text-sm text-white hover:border-cyan-200/40 hover:text-cyan-100"
                        >
                          {link.label}
                          <FiExternalLink />
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className="glass-panel rounded-lg p-6"
            >
              <div className="flex items-center gap-3 text-cyan-200">
                <FiMail />
                <p className="display-font text-lg font-semibold text-white">I can communicate in</p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {languageItems.map((item) => (
                  <div key={item.language} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <p className="display-font text-lg font-semibold text-white">{item.language}</p>
                    <p className="mt-1 text-sm text-slate-400">{item.level}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="glass-panel rounded-lg p-6"
            >
              <div className="flex items-center gap-3 text-emerald-200">
                <FiTrendingUp />
                <p className="display-font text-lg font-semibold text-white">Also active in</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-200">
                {activeItems.map((item) => (
                  <span key={item} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <SectionHeading
              eyebrow="Achievements"
              title="Recognition and leadership."
              description="Hackathons, leadership, coding rounds, and innovation milestones from college, community, and real-world building."
            />

            <div className="relative">
              <div className="timeline-line absolute bottom-0 left-5 top-0 w-px" />
              <div className="space-y-6">
                {achievementItems.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.45, delay: index * 0.05 }}
                      className="relative pl-16"
                    >
                      <div className="absolute left-0 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-300/25 bg-slate-950 ring-4 ring-cyan-300/8">
                        <Icon className="text-cyan-200" />
                      </div>
                      <div className="glass-panel rounded-[1.75rem] p-5">
                        <p className="display-font text-lg font-semibold text-white">{item.title}</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.18em] text-cyan-200/80">
                          {item.subtitle}
                        </p>
                        <p className="mt-3 text-sm leading-7 text-slate-300">{item.detail}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-4 py-24 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something practical and ambitious."
              description="Reach out for AI automation, full-stack product work, client platforms, or software internship opportunities."
            />
            <div className="glass-panel rounded-lg p-6 text-slate-200">
              <div className="space-y-4">
                <Link href="mailto:vishwaphathiaravindh@gmail.com" className="flex items-center gap-3 hover:text-cyan-200">
                  <FiMail className="text-cyan-200" />
                  vishwaphathiaravindh@gmail.com
                </Link>
                <Link href="tel:+919030706558" className="flex items-center gap-3 hover:text-cyan-200">
                  <FiPhone className="text-cyan-200" />
                  +91 9030706558
                </Link>
                <p className="flex items-center gap-3 text-slate-300">
                  <FiMapPin className="text-cyan-200" />
                  Hyderabad, India
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/5 px-4 py-2 text-sm hover:border-cyan-200/40 hover:text-cyan-100"
                  >
                    <Icon />
                    {label}
                  </Link>
                ))}
                <Link
                  href={resumeHref}
                  download
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 hover:border-cyan-200/50"
                >
                  <FiDownload />
                  Resume
                </Link>
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="glass-panel rounded-lg p-6 md:p-8"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-300/20">
                <FiTool />
              </div>
              <div>
                <p className="display-font text-xl font-semibold text-white">Start a conversation</p>
                <p className="text-sm text-slate-400">Share your details and I will get back to you.</p>
              </div>
            </div>
            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-200">Name</span>
                <input
                  required
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, name: event.target.value }))
                  }
                  className="rounded-lg border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-300/18"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-200">Phone</span>
                <input
                  type="tel"
                  required
                  value={formState.phone}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, phone: event.target.value }))
                  }
                  className="rounded-lg border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-300/18"
                  placeholder="+91 98765 43210"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-200">Email <span className="text-slate-500">(optional)</span></span>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, email: event.target.value }))
                  }
                  className="rounded-lg border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-300/18"
                  placeholder="you@example.com"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-medium text-slate-200">Message</span>
                <textarea
                  required
                  rows={6}
                  value={formState.message}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, message: event.target.value }))
                  }
                  className="rounded-lg border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-300/18"
                  placeholder="Tell me about the project, idea, or collaboration."
                />
              </label>
              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="ring-glow inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
              >
                {submitState === "submitting" ? "Sending..." : "Send Message"}
                <FiSend />
              </button>
              {submitState === "error" ? (
                <p className="rounded-lg border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
                  Something went wrong. Please try again, or use WhatsApp if it is urgent.
                </p>
              ) : null}
            </div>
          </motion.form>
        </div>
      </section>

      {submitState === "success" ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 px-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-panel w-full max-w-md rounded-[1.75rem] p-6 text-center"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-200 ring-1 ring-cyan-300/20">
              <FiSend />
            </div>
            <h3 className="mt-5 display-font text-2xl font-semibold text-white">
              Thanks, I received it.
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-300">
              I will contact you as soon as possible. If it is urgent, send the same message on WhatsApp.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href={urgentWhatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-300 px-4 py-3 text-sm font-semibold text-slate-950 hover:-translate-y-0.5"
              >
                <FiMessageCircle />
                Urgent WhatsApp
              </Link>
              <button
                type="button"
                onClick={() => setSubmitState("idle")}
                className="inline-flex items-center justify-center rounded-lg border border-white/12 bg-white/6 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </main>
  );
}
