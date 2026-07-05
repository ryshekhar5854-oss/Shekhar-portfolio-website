import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import {
  Download, Mail, Phone, MapPin, Linkedin, Github, Twitter,
  Briefcase, GraduationCap, LayoutGrid, Cpu, Terminal, Layers,
  Award, ArrowUp, Menu, X, CheckCircle2, Calendar, ExternalLink,
} from "lucide-react";
import heroImg from "@/assets/hero-character.jpg";
import eduImg from "@/assets/edu-character.jpg";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const nav = [
  { label: "Services", href: "#services" },
  { label: "About Me", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
];

const skills = [
  { icon: LayoutGrid, name: "HTML & CSS", pct: 85 },
  { icon: Cpu, name: "React js", pct: 70 },
  { icon: Terminal, name: "Javascript", pct: 98 },
  { icon: Layers, name: "Figma", pct: 91 },
];

const experience = [
  { role: "Software Engineer", company: "Microsoft", date: "Mar 2024 - Sep 2025" },
  { role: "Frontend Developer", company: "Spotify", date: "Mar 2025 - Sep 2026" },
];

const education = [
  { title: "Bachelor of Computer Science", school: "State University of Technology", date: "2020 - 2022" },
  { title: "Advanced Web Development", school: "Tech Institute of Design", date: "2023 - 2026" },
];

const projects = [
  { title: "E-Commerce Platform", desc: "Modern e-commerce solution", tags: ["React", "Node.js", "MongoDB"], hue: 0 },
  { title: "Fitness Tracker", desc: "Track workouts and nutrition", tags: ["React Native", "Firebase"], hue: 220 },
  { title: "AI Image Generator", desc: "Generate images from text", tags: ["Python", "React", "TensorFlow"], hue: 280 },
  { title: "Social Dashboard", desc: "Manage social media accounts", tags: ["Vue", "Tailwind"], hue: 160 },
  { title: "Task Manager", desc: "Team collaboration app", tags: ["Next.js", "Supabase"], hue: 40 },
  { title: "Food Delivery", desc: "Fast food delivery app", tags: ["React Native", "Node.js"], hue: 340 },
];

const certificates = [
  { title: "Meta Front-End Developer", org: "Coursera / Meta", date: "Dec 2023", desc: "Comprehensive program covering React, UX/UI and front-end optimization." },
  { title: "AWS Certified Cloud Practitioner", org: "Amazon Web Services", date: "Oct 2023", desc: "Validation of cloud fluency and foundational AWS knowledge." },
  { title: "Advanced JavaScript Mastery", org: "Udemy", date: "Aug 2023", desc: "Deep dive into asynchronous JS, patterns and performance tuning." },
];

function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [typed, setTyped] = useState("");
  const roles = ["Frontend Developer", "UI/UX Designer", "React Enthusiast"];
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement;
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => {
      const current = roles[roleIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setTyped(current.slice(0, charIdx.current));
        if (charIdx.current === current.length) {
          deleting.current = true;
          setTimeout(tick, 1500);
          return;
        }
      } else {
        charIdx.current--;
        setTyped(current.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting.current ? 40 : 80);
    };
    const t = setTimeout(tick, 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* scroll progress */}
      <div className="fixed left-0 top-0 z-[60] h-1 bg-cyan transition-[width]" style={{ width: `${progress}%` }} />

      {/* Navbar */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-border" : ""}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="#hero" className="text-2xl font-black tracking-tight">
            PORTFOLIO<span className="text-cyan">.</span>
          </a>
          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-cyan">{n.label}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden btn-cyan lg:inline-flex">Contact Me</a>
            <button className="lg:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="lg:hidden glass-card mx-6 mb-4 p-6">
            <ul className="flex flex-col gap-4">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href} onClick={() => setMenuOpen(false)} className="text-base font-medium">{n.label}</a></li>
              ))}
              <li><a href="#contact" onClick={() => setMenuOpen(false)} className="btn-cyan w-fit">Contact Me</a></li>
            </ul>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="relative pt-32 pb-24">
        <div className="hero-glow absolute inset-0 -z-10" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <h1 className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Hi, I'm <span className="text-cyan">Kinich</span>
              <span className="animate-wave ml-2">👋</span>
            </h1>
            <p className="mt-4 text-lg font-medium text-cyan h-7">
              {typed}<span className="animate-pulse">|</span>
            </p>
            <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
              Frontend developer passionate about building beautiful, performant web experiences.
              I turn complex problems into elegant interfaces with clean code and thoughtful design.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="btn-cyan">Hire Me</a>
              <a href="#" className="btn-outline-cyan"><Download size={18} /> Download resume</a>
            </div>
            <div className="mt-8 flex gap-4">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="grid h-11 w-11 place-items-center rounded-full border border-border text-muted-foreground transition-all hover:border-cyan hover:text-cyan">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute inset-0 rounded-[45%_55%_55%_45%/50%_50%_50%_50%] border-2 border-cyan/40" />
            <div className="animate-float overflow-hidden rounded-[45%_55%_55%_45%/50%_50%_50%_50%] bg-cyan/20 p-2">
              <img src={heroImg} alt="Kinich" width={520} height={520} className="w-72 rounded-[45%_55%_55%_45%/50%_50%_50%_50%] object-cover sm:w-96" />
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-sm font-bold tracking-[0.3em] text-cyan">LEARNING PATH</p>
        <h2 className="mt-3 text-5xl font-black">Education<span className="text-cyan">.</span></h2>
        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl border border-cyan/30 translate-x-4 translate-y-4" />
            <div className="relative overflow-hidden rounded-3xl bg-cyan/20 p-4">
              <img src={eduImg} alt="Education" loading="lazy" width={600} height={600} className="w-full rounded-2xl" />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {education.map((e) => (
              <div key={e.title} className="glass-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cyan/15 text-cyan">
                      <GraduationCap size={22} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{e.title}</h3>
                      <p className="text-sm text-muted-foreground">{e.school}</p>
                    </div>
                  </div>
                  <span className="hidden shrink-0 items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs text-muted-foreground sm:inline-flex">
                    <Calendar size={12} /> {e.date}
                  </span>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, laudantium! Asperiores.
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-cyan">
                  <CheckCircle2 size={16} /> Academic Excellence
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Stats */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { n: "300+", l: "Projects" },
            { n: "7+", l: "Years Experience" },
            { n: "150+", l: "Happy Clients" },
          ].map((s) => (
            <div key={s.l} className="glass-card p-8 text-center">
              <div className="text-4xl font-black text-cyan">{s.n}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills + Experience */}
      <section id="skills" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="text-5xl font-black">Technical <span className="text-cyan">Skills</span></h2>
            <div className="mt-10 space-y-6">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <s.icon className="text-cyan" size={20} />
                      <span className="font-medium">{s.name}</span>
                    </div>
                    <span className="font-bold text-cyan">{s.pct}%</span>
                  </div>
                  <div className="mt-2 h-1 rounded-full bg-secondary">
                    <div
                      className="animate-fill h-full rounded-full bg-cyan"
                      style={{ width: `${s.pct}%`, boxShadow: "0 0 10px var(--cyan)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-5xl font-black">Work <span className="text-cyan">Experience</span></h2>
            <div className="mt-10 space-y-5">
              {experience.map((e) => (
                <div key={e.role} className="glass-card p-6" style={{ background: "oklch(0.22 0.08 275 / 60%)" }}>
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cyan/15 text-cyan">
                      <Briefcase size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold">{e.role}</h3>
                      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Briefcase size={12} />{e.company}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={12} />{e.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-5xl font-black">Services<span className="text-cyan">.</span></h2>
          <p className="mt-3 text-muted-foreground">What I can do for you</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: LayoutGrid, title: "Web Design", desc: "Modern, responsive websites that convert visitors into customers." },
            { icon: Cpu, title: "Web Development", desc: "Fast, accessible apps built with React, TypeScript and best practices." },
            { icon: Layers, title: "UI/UX Design", desc: "User-centered interfaces designed to delight and perform." },
          ].map((s) => (
            <div key={s.title} className="glass-card group p-8 transition-all hover:-translate-y-2 hover:border-cyan/50">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan/15 text-cyan transition-all group-hover:bg-cyan group-hover:text-background">
                <s.icon size={26} />
              </div>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-5xl font-black">Projects<span className="text-cyan">.</span></h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-cyan" />
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div key={p.title} className="glass-card group overflow-hidden">
              <div
                className="relative aspect-[4/3] overflow-hidden"
                style={{ background: `linear-gradient(135deg, oklch(0.4 0.15 ${p.hue}), oklch(0.25 0.08 ${p.hue + 30}))` }}
              >
                <div className="absolute inset-0 grid place-items-center text-6xl font-black text-white/10">
                  {p.title.split(" ").map(w => w[0]).join("")}
                </div>
                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <a href="#" className="btn-cyan text-sm !py-2 !px-4"><ExternalLink size={14} /> Demo</a>
                  <a href="#" className="btn-outline-cyan text-sm !py-2 !px-4"><Github size={14} /> Code</a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border border-cyan/30 px-3 py-1 text-xs text-cyan">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section id="certificates" className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-sm font-bold tracking-[0.3em] text-cyan">ACHIEVEMENTS</p>
        <h2 className="mt-3 text-5xl font-black">Certifications<span className="text-cyan">.</span></h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c) => (
            <div key={c.title} className="glass-card p-6">
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan/15 text-cyan">
                  <Award size={20} />
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">{c.date}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.org}</p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan">
                View Certificate <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-5xl font-black">Testimonials<span className="text-cyan">.</span></h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { name: "Sarah Chen", role: "Product Manager", text: "Kinich delivered beyond expectations. The attention to detail is remarkable." },
            { name: "Marcus Reed", role: "Startup Founder", text: "Beautiful work and clean code. My go-to developer for any project." },
            { name: "Aya Tanaka", role: "Designer", text: "Rare combination of design sensibility and engineering excellence." },
          ].map((t) => (
            <div key={t.name} className="glass-card p-6">
              <p className="text-muted-foreground leading-relaxed">"{t.text}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-cyan font-bold text-background">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="inline-block relative text-5xl font-black">
            <span className="relative z-10 px-4">Let's Connect<span className="text-cyan">.</span></span>
            <span className="absolute inset-x-0 bottom-2 -z-0 h-4 bg-primary/60" />
          </h2>
        </div>
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="max-w-md text-muted-foreground leading-relaxed">
              I'm always interested in hearing about new opportunities and projects. Feel free to reach out through any of these channels.
            </p>
            <div className="mt-8 space-y-5">
              {[
                { icon: Mail, label: "Email", value: "hello@example.com" },
                { icon: Phone, label: "Phone", value: "+123 456 7890" },
                { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/kinich" },
                { icon: MapPin, label: "Location", value: "New York, USA" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan/15 text-cyan">
                    <c.icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold">{c.label}</div>
                    <div className="truncate text-sm text-muted-foreground">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }} className="glass-card p-6 sm:p-8">
            <label className="block text-sm font-medium">Email</label>
            <input required type="email" placeholder="your@email.com" className="mt-2 w-full rounded-xl border border-border bg-input px-4 py-3 text-sm outline-none focus:border-cyan" />
            <label className="mt-5 block text-sm font-medium">Message</label>
            <textarea required rows={5} placeholder="Your Message ..." className="mt-2 w-full resize-none rounded-xl border border-border bg-input px-4 py-3 text-sm outline-none focus:border-cyan" />
            <button type="submit" className="btn-cyan mt-6 w-full justify-center">Send Message</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Kinich. Crafted with care.
      </footer>

      {scrolled && (
        <a href="#hero" aria-label="Back to top" className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-cyan text-background shadow-lg transition-transform hover:-translate-y-1">
          <ArrowUp size={20} />
        </a>
      )}
    </div>
  );
}
