"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { tools } from "@/data/tools";
import CustomCursor from "@/components/CustomCursor";

const NeuralSphere3D = dynamic(() => import("@/components/NeuralSphere3D"), { ssr: false });

const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@%&";
function useScramble(text: string) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    let iter = 0;
    const interval = setInterval(() => {
      setDisplay(text.split("").map((char, i) => {
        if (i < iter) return char;
        if (char === " ") return " ";
        return SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
      }).join(""));
      iter += 0.5;
      if (iter >= text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);
  return display;
}

const categories = [
  { name: "Writing AI", icon: "✍️", desc: "Content & copywriting tools", slug: "best-ai-writing-tool-2026" },
  { name: "Code AI", icon: "💻", desc: "Coding assistants & IDEs", slug: "best-ai-code-assistant-2026" },
  { name: "Image AI", icon: "🎨", desc: "Image generation & editing", slug: "best-ai-image-generator-2026" },
  { name: "Voice AI", icon: "🎙️", desc: "TTS, transcription & podcasting", slug: "best-ai-voice-generator-2026" },
  { name: "Analytics AI", icon: "📊", desc: "Data & business intelligence", slug: "best-ai-analytics-tool-2026" },
  { name: "Automation AI", icon: "⚙️", desc: "Workflows & no-code tools", slug: "best-ai-automation-tool-2026" },
];

const toolOfWeek = tools[1]; // Cursor

const marqueeItems = [
  "10M+ developers use AI coding tools", "AI writing tools save 5+ hours weekly",
  "50+ AI tools reviewed", "Updated weekly", "No paid placements",
  "$0 to get started with most tools", "Community-verified reviews",
];

const featuredTools = tools.slice(0, 3);
const steps = [
  { n: "01", title: "Real Testing", desc: "Every tool gets weeks of hands-on evaluation by our team of developers, marketers, and writers." },
  { n: "02", title: "Fair Comparison", desc: "Side-by-side analysis across pricing, features, output quality, and real-world use cases." },
  { n: "03", title: "Clear Verdict", desc: "No sponsored rankings. Honest picks with affiliate links that fund our work — at no cost to you." },
];

export default function Home() {
  const h1 = useScramble("Every AI tool reviewed.");
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  return (
    <>
      <CustomCursor />
      <main style={{ background: "#04050f" }} className="min-h-screen">

        {/* NAV */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 lg:px-12 h-16"
          style={{ background: "rgba(4,5,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(99,102,241,0.12)" }}
        >
          <span
            className="font-extrabold text-xl"
            style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            AIToolsWeekly
          </span>
          <div className="hidden md:flex gap-8 text-sm text-slate-500 flex-wrap">
            <Link href="/finder" className="text-slate-500 no-underline hover:text-slate-300 transition-colors">AI Finder</Link>
            <Link href={`/${tools[0].slug}`} className="text-slate-500 no-underline hover:text-slate-300 transition-colors">Reviews</Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="aurora-bg relative min-h-screen flex flex-col lg:flex-row items-center px-4 md:px-8 lg:px-16 pt-24 pb-16 overflow-hidden">
          <div className="flex-1 max-w-2xl relative z-10 text-center lg:text-left">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8"
              style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}
            >
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: "#a855f7" }} />
              <span className="text-xs font-semibold" style={{ color: "#6366f1" }}>500+ tools tracked · Updated weekly</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-slate-50 mb-4">
              {h1}
            </h1>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mb-6">
              <span style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Save hours.
              </span>{" "}
              <span className="text-slate-200">Pick the right stack.</span>
            </h2>

            <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              We test every major AI tool so you don&apos;t have to. Clear, honest comparisons updated weekly. No hype.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/finder" className="btn-glow" style={{ fontSize: 16 }}>Find My AI Stack →</Link>
              <Link
                href={`/${tools[0].slug}`}
                className="inline-block px-7 py-3.5 rounded-xl text-base font-semibold"
                style={{ border: "1px solid rgba(99,102,241,0.3)", color: "#6366f1", textDecoration: "none" }}
              >
                Browse Reviews
              </Link>
            </div>
          </div>

          {/* Neural Sphere — hidden on mobile, visible on desktop */}
          <div className="hidden lg:block flex-1 absolute right-0 top-0 h-full z-0" style={{ width: "55%", right: -100 }}>
            <NeuralSphere3D />
          </div>
        </section>

        {/* MARQUEE */}
        <div
          className="overflow-hidden py-4"
          style={{ borderTop: "1px solid rgba(99,102,241,0.08)", borderBottom: "1px solid rgba(99,102,241,0.08)", background: "rgba(99,102,241,0.02)" }}
        >
          <div className="marquee-inner inline-flex gap-12 text-slate-600 text-xs font-medium">
            {[...marqueeItems, ...marqueeItems].map((s, i) => (
              <span key={i} className="flex items-center gap-3 whitespace-nowrap">
                <span style={{ color: "#6366f1" }}>◆</span> {s}
              </span>
            ))}
          </div>
        </div>

        {/* TOOL OF THE WEEK */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal px-4 md:px-8 lg:px-16 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest mb-6 text-center" style={{ color: "#6366f1" }}>TOOL OF THE WEEK</p>
            <Link href={`/${toolOfWeek.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <div
                className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center"
                style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.06))", border: "1px solid rgba(99,102,241,0.25)" }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-5 flex-wrap">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{ background: "rgba(99,102,241,0.15)", color: "#6366f1" }}
                    >
                      ⭐ Featured
                    </span>
                    <span className="text-xs font-semibold" style={{ color: "#a855f7" }}>{toolOfWeek.commission}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4" style={{ color: "#f8fafc" }}>
                    {toolOfWeek.title}
                  </h2>
                  <p className="text-slate-500 leading-relaxed mb-6">{toolOfWeek.description}</p>
                  <div className="flex gap-3 flex-wrap">
                    <span className="px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}>
                      🥇 {toolOfWeek.winner}
                    </span>
                    <span className="px-4 py-2 rounded-xl text-sm font-medium" style={{ background: "rgba(168,85,247,0.1)", color: "#c084fc" }}>
                      vs {toolOfWeek.runner_up}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 w-full md:w-auto">
                  {toolOfWeek.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="rounded-xl px-5 py-3" style={{ background: "rgba(255,255,255,0.03)", minWidth: 0 }}>
                      <div className="text-xs mb-1" style={{ color: "#475569" }}>{f.name}</div>
                      <div className="text-sm font-bold" style={{ color: "#818cf8" }}>{f.winner}</div>
                    </div>
                  ))}
                  <div className="btn-glow text-center px-6 py-3 text-sm">
                    Read Full Review →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* CATEGORIES */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal px-4 md:px-8 lg:px-16 pb-16 md:pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-50">Browse by Category</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {categories.map(cat => (
                <Link key={cat.slug} href={`/${cat.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card-border p-7 transition-all duration-300">
                    <div className="text-3xl mb-4">{cat.icon}</div>
                    <div className="text-lg font-bold mb-2" style={{ color: "#e2e8f0" }}>{cat.name}</div>
                    <div className="text-xs" style={{ color: "#475569" }}>{cat.desc}</div>
                    <div className="text-xs font-semibold mt-4" style={{ color: "#6366f1" }}>Explore →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          ref={el => addReveal(el as HTMLElement)}
          className="reveal px-4 md:px-8 lg:px-16 py-16 md:py-24"
          style={{ background: "rgba(99,102,241,0.02)", borderTop: "1px solid rgba(99,102,241,0.06)" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-50">Our Review Process</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {steps.map((step, i) => (
                <div key={i} className="relative p-8">
                  <div className="ghost-number">{step.n}</div>
                  <div className="relative z-10">
                    <div className="text-xs font-bold tracking-widest mb-4" style={{ color: "#6366f1" }}>{step.n}</div>
                    <h3 className="text-2xl font-extrabold mb-3" style={{ color: "#f1f5f9" }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED REVIEWS */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal aurora-bg px-4 md:px-8 lg:px-16 py-16 md:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-50">
                <span style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Top</span> Reviews
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((t, i) => (
                <Link key={t.slug} href={`/${t.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card-border p-7 transition-all duration-300">
                    <div className="flex justify-between mb-4">
                      <span
                        className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1" }}
                      >
                        {t.category}
                      </span>
                      <span className="text-xs font-semibold" style={{ color: "#a855f7" }}>{t.commission}</span>
                    </div>
                    <h3 className="text-base font-bold leading-snug mb-4" style={{ color: "#f1f5f9" }}>{t.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg"
                        style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8" }}
                      >
                        🥇 {t.winner}
                      </span>
                      <span className="text-xs flex items-center" style={{ color: "#475569" }}>vs {t.runner_up}</span>
                    </div>
                    <div className="mt-5 text-xs font-semibold" style={{ color: "#6366f1" }}>Read review →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section
          ref={el => addReveal(el as HTMLElement)}
          className="reveal px-4 md:px-8 lg:px-16 py-16 md:py-24"
          style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.03))", borderTop: "1px solid rgba(99,102,241,0.08)" }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-16">
              The most trusted AI tool resource
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { n: "500+", label: "Tools tracked" },
                { n: "50+", label: "In-depth reviews" },
                { n: "1M+", label: "Monthly readers" },
                { n: "100%", label: "Independent" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="pulse-glow text-3xl md:text-4xl lg:text-5xl font-black mb-2" style={{ color: "#6366f1" }}>{s.n}</div>
                  <div className="text-sm" style={{ color: "#475569" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal px-4 md:px-8 lg:px-16 py-20 md:py-28 relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.08), transparent)" }}
          />
          <div className="max-w-2xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-50 mb-6">
              Build your{" "}
              <span style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>perfect</span>
              {" "}AI stack.
            </h2>
            <p className="text-base md:text-lg text-slate-500 mb-10">
              Take our 4-question quiz and get a personalized AI tool recommendation.
            </p>
            <Link href="/finder" className="btn-glow" style={{ fontSize: 18, padding: "18px 40px" }}>
              Find My AI Stack →
            </Link>
          </div>
        </section>

        <footer
          className="px-4 md:px-8 lg:px-12 py-12 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "#374151" }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="font-extrabold text-base mb-2" style={{ color: "#6366f1" }}>AIToolsWeekly</div>
              <div>Independent reviews of every AI tool since 2023.</div>
            </div>
            <div>
              <p>Affiliate Disclosure: We earn commissions from partner links.</p>
              <p className="mt-2">© 2026 AIToolsWeekly. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
