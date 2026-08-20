import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Code2,
  Cpu,
  ExternalLink,
  FileCode2,
  Github,
  GitBranch,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Monitor,
  Send,
  Sparkles,
  Terminal,
  Wrench,
  X,
} from "lucide-react";

import heroImage from "@/assets/hero-dev.png";
import { submitContactForm } from "@/lib/contact.functions";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Druva Teja C | Portfolio" },
      { name: "description", content: "Personal portfolio of Druva Teja C, a 1st-year B.Tech CSE student passionate about software engineering, web development, and problem solving." },
      { property: "og:title", content: "Druva Teja C | Portfolio" },
      { property: "og:description", content: "Personal portfolio of Druva Teja C, a 1st-year B.Tech CSE student passionate about software engineering." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        scrolled={scrolled}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onNavClick={handleNavClick}
      />
      <main>
        <Hero onNavClick={handleNavClick} />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Navbar({
  scrolled,
  mobileMenuOpen,
  setMobileMenuOpen,
  onNavClick,
}: {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onNavClick: (href: string) => void;
}) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="glass rounded-2xl px-4 py-3 sm:px-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="min-w-0 text-lg font-bold tracking-tight"
            >
              <span className="gradient-text">Druva Teja</span>
            </a>

            <ul className="hidden items-center gap-1 sm:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavClick(link.href);
                    }}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-2 sm:flex">
              <SocialButton
                href="https://github.com/Druva-Teja03"
                icon={<Github size={18} />}
                label="GitHub"
              />
              <SocialButton
                href="https://www.linkedin.com/in/druva-teja-c"
                icon={<Linkedin size={18} />}
                label="LinkedIn"
              />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground sm:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="mt-4 border-t border-white/10 pt-4 sm:hidden">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavClick(link.href);
                      }}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
                <SocialButton
                  href="https://github.com/Druva-Teja03"
                  icon={<Github size={18} />}
                  label="GitHub"
                />
                <SocialButton
                  href="https://www.linkedin.com/in/druva-teja-c"
                  icon={<Linkedin size={18} />}
                  label="LinkedIn"
                />
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

function SocialButton({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

function Hero({ onNavClick }: { onNavClick: (href: string) => void }) {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] rounded-full bg-indigo/10 blur-[120px] animate-pulse-slow" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles size={16} />
            <span>1st Year B.Tech CSE Student | Aspiring Software Engineer</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Hi, I&apos;m <span className="gradient-text">Druva Teja C</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-balance">
            I&apos;m a curious and driven first-year Computer Science student who loves turning ideas into code. I enjoy building clean, responsive interfaces and exploring how technology can solve real-world problems. I&apos;m always eager to learn, collaborate, and grow as a software engineer.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <button
              onClick={() => onNavClick("#projects")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_-5px_var(--glow)] sm:w-auto"
            >
              Explore Projects
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => onNavClick("#contact")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/10 sm:w-auto"
            >
              Contact Me
              <Mail size={18} />
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4 lg:justify-start">
            <a
              href="https://github.com/Druva-Teja03"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              <Github size={16} />
              <span className="group-hover:underline">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/druva-teja-c"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-muted-foreground transition-all hover:border-primary/50 hover:text-primary"
            >
              <Linkedin size={16} />
              <span className="group-hover:underline">LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
            <img
              src={heroImage}
              alt="Developer workspace illustration with cyan and indigo accents"
              width={1024}
              height={1024}
              className="w-full rounded-2xl object-cover opacity-90"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-card/80 p-4 backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/20 text-primary">
                <Code2 size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Open to Collaborate</p>
                <p className="text-xs text-muted-foreground">Web, Python & Open Source</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        onClick={(e) => {
          e.preventDefault();
          onNavClick("#about");
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground transition-colors hover:text-primary"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <SectionBadge label="About Me" />
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Building the foundation of my <span className="gradient-text">tech journey</span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-balance">
          I&apos;m a first-year B.Tech Computer Science and Engineering student with a passion for software development and problem solving. From writing my first Python script to crafting responsive web pages, I love the process of learning by building. My goal is to contribute to meaningful projects, learn from the open-source community, and grow into a skilled software engineer.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <StatCard value="1+" label="Years Coding" />
          <StatCard value="3+" label="Projects Built" />
          <StatCard value="∞" label="Curiosity" />
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="glass rounded-2xl p-6 transition-all hover:border-primary/30 hover:bg-white/10">
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function Skills() {
  const categories = [
    {
      title: "Languages",
      icon: <Code2 size={22} className="text-primary" />,
      skills: [
        { name: "Python", icon: "🐍", level: "Intermediate" },
        { name: "HTML5", icon: <FileCode2 size={16} />, level: "Intermediate" },
        { name: "CSS3", icon: <Layers size={16} />, level: "Intermediate" },
      ],
    },
    {
      title: "Developer Tools",
      icon: <Wrench size={22} className="text-primary" />,
      skills: [
        { name: "VS Code", icon: <Monitor size={16} />, level: "Daily" },
        { name: "Git", icon: <GitBranch size={16} />, level: "Learning" },
        { name: "GitHub", icon: <Github size={16} />, level: "Active" },
      ],
    },
    {
      title: "Foundations",
      icon: <Cpu size={22} className="text-primary" />,
      skills: [
        { name: "Problem Solving", icon: <Terminal size={16} />, level: "Building" },
        { name: "Data Structures", icon: <BookOpen size={16} />, level: "Basics" },
        { name: "Web Development", icon: <Code2 size={16} />, level: "Growing" },
      ],
    },
  ];

  return (
    <section id="skills" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <SectionBadge label="Skills" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My growing <span className="gradient-text">tech stack</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Tools and technologies I&apos;m actively learning and building with as I grow into a full-stack developer.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="glass group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-white/10"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                  >
                    <span className="text-muted-foreground">{skill.icon}</span>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    {
      title: "Python Automation / CLI Tool",
      description: "A beginner-friendly command-line automation tool built with Python to streamline repetitive tasks like file renaming, batch operations, and simple data formatting.",
      tags: ["Python", "CLI", "Automation"],
      github: "https://github.com/Druva-Teja03",
      demo: "#",
      icon: <Terminal size={24} className="text-primary" />,
    },
    {
      title: "Responsive Frontend Web Page",
      description: "A clean, responsive landing page built with HTML5 and CSS3, focusing on modern layout techniques, accessibility, and mobile-first design.",
      tags: ["HTML5", "CSS3", "Responsive"],
      github: "https://github.com/Druva-Teja03",
      demo: "#",
      icon: <Layers size={24} className="text-primary" />,
    },
    {
      title: "Currently Building...",
      description: "My next project is in the works. I'm exploring React, modern UI libraries, and backend integration to build something even more impactful.",
      tags: ["React", "TypeScript", "Full Stack"],
      github: "https://github.com/Druva-Teja03",
      demo: "#",
      icon: <Sparkles size={24} className="text-primary" />,
      placeholder: true,
    },
  ];

  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <SectionBadge label="Projects" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What I&apos;ve been <span className="gradient-text">building</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A mix of completed work and exciting projects in progress. Each one is a step in my learning journey.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className={`glass group flex flex-col rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-primary/30 hover:bg-white/10 ${
                project.placeholder ? "border-dashed border-primary/30" : ""
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  {project.icon}
                </div>
                {project.placeholder && (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    WIP
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-foreground">{project.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/5 px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                >
                  <Github size={16} />
                  Code
                </a>
                <a
                  href={project.demo}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
                >
                  <ExternalLink size={16} />
                  Demo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <SectionBadge label="Education" />
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Learning path & <span className="gradient-text">coursework</span>
          </h2>
        </div>

        <div className="mt-12 relative">
          <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent sm:left-1/2 sm:-translate-x-1/2" />

          <div className="relative grid items-center gap-8 sm:grid-cols-2">
            <div className="order-1 sm:text-right">
              <div className="glass ml-16 inline-block rounded-2xl p-6 text-left transition-all hover:border-primary/30 sm:ml-0">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary sm:hidden">
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">B.Tech in Computer Science and Engineering</h3>
                <p className="mt-1 text-sm font-medium text-primary">Year 1 — Present</p>
                <p className="mt-3 text-muted-foreground">
                  Building a strong foundation in computing fundamentals, programming, and engineering problem solving.
                </p>
              </div>
            </div>
            <div className="order-2 hidden sm:flex sm:justify-center">
              <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-primary/30 bg-primary/20 text-primary shadow-lg shadow-primary/20">
                <GraduationCap size={24} />
              </div>
            </div>

            <div className="order-3 hidden sm:flex sm:justify-center" />
            <div className="order-4">
              <div className="glass ml-16 rounded-2xl p-6 transition-all hover:border-primary/30 sm:ml-0">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary sm:hidden">
                  <BookOpen size={20} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Core Coursework</h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Data Structures basics
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Problem Solving & Algorithms
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Web Development basics
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    Programming fundamentals
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const result = await submitContactForm({ data: formData });
      setStatus("success");
      setMessage(result.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again later.");
      console.error(error);
    }
  };

  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionBadge label="Contact" />
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Let&apos;s <span className="gradient-text">connect</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Whether you&apos;re a recruiter, mentor, or fellow student looking to collaborate, I&apos;d love to hear from you.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <a
                href="https://github.com/Druva-Teja03"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-primary/50 hover:bg-white/10"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-all group-hover:scale-110">
                  <Github size={22} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">GitHub</p>
                  <p className="truncate text-sm text-muted-foreground">github.com/Druva-Teja03</p>
                </div>
              </a>
              <a
                href="https://www.linkedin.com/in/druva-teja-c"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-primary/50 hover:bg-white/10"
              >
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-all group-hover:scale-110">
                  <Linkedin size={22} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-foreground">LinkedIn</p>
                  <p className="truncate text-sm text-muted-foreground">linkedin.com/in/druva-teja-c</p>
                </div>
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-6 sm:p-8"
            noValidate
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Your name"
                  maxLength={100}
                />
                {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="your@email.com"
                  maxLength={255}
                />
                {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-white/10 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Tell me about the opportunity or project..."
                  maxLength={1000}
                />
                {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
                <p className="mt-1.5 text-right text-xs text-muted-foreground">
                  {formData.message.length}/1000
                </p>
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60"
              >
                {status === "loading" ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
              {status === "success" && (
                <p className="rounded-xl bg-primary/10 p-3 text-center text-sm font-medium text-primary">
                  {message}
                </p>
              )}
              {status === "error" && (
                <p className="rounded-xl bg-destructive/10 p-3 text-center text-sm font-medium text-destructive">
                  {message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Druva Teja C. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Druva-Teja03"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/druva-teja-c"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function SectionBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      {label}
    </span>
  );
}
