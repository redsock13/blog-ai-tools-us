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
      <main style={{ background: "#04050f", minHeight: "100vh" }}>
        {/* NAV */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          background: "rgba(4,5,15,0.85)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(99,102,241,0.12)", padding: "0 48px",
          height: 64, display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <span style={{ fontWeight: 800, fontSize: 20, background: "linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            AIToolsWeekly
          </span>
          <div style={{ display: "flex", gap: 32, fontSize: 14, color: "#64748b" }}>
            <Link href="/finder" style={{ color: "#64748b", textDecoration: "none" }}>AI Finder</Link>
            <Link href={`/${tools[0].slug}`} style={{ color: "#64748b", textDecoration: "none" }}>Reviews</Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="aurora-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 48px 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ flex: 1, maxWidth: 640, position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#a855f7", display: "inline-block" }} />
              <span style={{ fontSize: 13, color: "#6366f1", fontWeight: 600 }}>500+ tools tracked · Updated weekly</span>
            </div>
            <h1 style={{ fontSize: "clamp(48px,6vw,88px)", fontWeight: 900, lineHeight: 1.04, letterSpacing: "-0.03em", color: "#f8fafc", marginBottom: 16 }}>
              {h1}
            </h1>
            <h2 style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 24 }}>
              <span style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Save hours.
              </span>{" "}
              <span style={{ color: "#e2e8f0" }}>Pick the right stack.</span>
            </h2>
            <p style={{ fontSize: 17, color: "#64748b", lineHeight: 1.7, marginBottom: 40, maxWidth: 500 }}>
              We test every major AI tool so you don't have to. Clear, honest comparisons updated weekly. No hype.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <Link href="/finder" className="btn-glow" style={{ fontSize: 16 }}>Find My AI Stack →</Link>
              <Link href={`/${tools[0].slug}`} style={{ display: "inline-block", padding: "14px 28px", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 10, color: "#6366f1", textDecoration: "none", fontSize: 16, fontWeight: 600 }}>
                Browse Reviews
              </Link>
            </div>
          </div>
          {/* Neural Sphere */}
          <div style={{ position: "absolute", right: -100, top: 0, width: "55%", height: "100%", zIndex: 1 }}>
            <NeuralSphere3D />
          </div>
        </section>

        {/* MARQUEE */}
        <div style={{ borderTop: "1px solid rgba(99,102,241,0.08)", borderBottom: "1px solid rgba(99,102,241,0.08)", padding: "16px 0", overflow: "hidden", background: "rgba(99,102,241,0.02)" }}>
          <div className="marquee-inner" style={{ display: "inline-flex", gap: 48, color: "#374151", fontSize: 13, fontWeight: 500 }}>
            {[...marqueeItems, ...marqueeItems].map((s, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 12, whiteSpace: "nowrap" }}>
                <span style={{ color: "#6366f1" }}>◆</span> {s}
              </span>
            ))}
          </div>
        </div>

        {/* TOOL OF THE WEEK */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal" style={{ padding: "100px 48px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ color: "#6366f1", fontWeight: 600, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 24, textAlign: "center" }}>TOOL OF THE WEEK</p>
            <Link href={`/${toolOfWeek.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <div style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.06))",
                border: "1px solid rgba(99,102,241,0.25)", borderRadius: 24, padding: "48px",
                display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap"
              }}>
                <div style={{ flex: 1, minWidth: 280 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <span style={{ background: "rgba(99,102,241,0.15)", color: "#6366f1", padding: "4px 12px", borderRadius: 100, fontSize: 12, fontWeight: 700, textTransform: "uppercase" }}>
                      ⭐ Featured
                    </span>
                    <span style={{ color: "#a855f7", fontSize: 12, fontWeight: 600 }}>{toolOfWeek.commission}</span>
                  </div>
                  <h2 style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 900, color: "#f8fafc", marginBottom: 16, letterSpacing: "-0.02em" }}>
                    {toolOfWeek.title}
                  </h2>
                  <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: 16, marginBottom: 24 }}>{toolOfWeek.description}</p>
                  <div style={{ display: "flex", gap: 12 }}>
                    <span style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", padding: "8px 16px", borderRadius: 10, fontSize: 14, fontWeight: 600 }}>
                      🥇 {toolOfWeek.winner}
                    </span>
                    <span style={{ background: "rgba(168,85,247,0.1)", color: "#c084fc", padding: "8px 16px", borderRadius: 10, fontSize: 14, fontWeight: 500 }}>
                      vs {toolOfWeek.runner_up}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {toolOfWeek.features.slice(0, 3).map((f, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px 20px", minWidth: 220 }}>
                      <div style={{ color: "#475569", fontSize: 12, marginBottom: 4 }}>{f.name}</div>
                      <div style={{ color: "#818cf8", fontWeight: 700, fontSize: 14 }}>{f.winner}</div>
                    </div>
                  ))}
                  <div className="btn-glow" style={{ textAlign: "center", padding: "12px 24px", fontSize: 14 }}>
                    Read Full Review →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* CATEGORIES */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal" style={{ padding: "0 48px 80px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#f8fafc" }}>Browse by Category</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {categories.map(cat => (
                <Link key={cat.slug} href={`/${cat.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card-border" style={{ padding: 28, transition: "all 0.3s ease" }}>
                    <div style={{ fontSize: 32, marginBottom: 16 }}>{cat.icon}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0", marginBottom: 8 }}>{cat.name}</div>
                    <div style={{ fontSize: 13, color: "#475569" }}>{cat.desc}</div>
                    <div style={{ color: "#6366f1", fontSize: 13, fontWeight: 600, marginTop: 16 }}>Explore →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal" style={{ padding: "100px 48px", background: "rgba(99,102,241,0.02)", borderTop: "1px solid rgba(99,102,241,0.06)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 80 }}>
              <h2 style={{ fontSize: "clamp(36px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#f8fafc" }}>Our Review Process</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }}>
              {steps.map((step, i) => (
                <div key={i} style={{ position: "relative", padding: 32 }}>
                  <div className="ghost-number">{step.n}</div>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#6366f1", marginBottom: 16, letterSpacing: "0.1em" }}>{step.n}</div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, color: "#f1f5f9", marginBottom: 12 }}>{step.title}</h3>
                    <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: 15 }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal aurora-bg" style={{ padding: "100px 48px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <h2 style={{ fontSize: "clamp(36px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#f8fafc" }}>
                <span style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Top</span> Reviews
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {featuredTools.map((t, i) => (
                <Link key={t.slug} href={`/${t.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card-border" style={{ padding: 28, transition: "transform 0.3s ease, box-shadow 0.3s ease" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                      <span style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 100, textTransform: "uppercase" }}>
                        {t.category}
                      </span>
                      <span style={{ color: "#a855f7", fontSize: 12, fontWeight: 600 }}>{t.commission}</span>
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.4, marginBottom: 16 }}>{t.title}</h3>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ background: "rgba(99,102,241,0.15)", color: "#818cf8", fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 8 }}>
                        🥇 {t.winner}
                      </span>
                      <span style={{ color: "#475569", fontSize: 12, display: "flex", alignItems: "center" }}>vs {t.runner_up}</span>
                    </div>
                    <div style={{ marginTop: 20, color: "#6366f1", fontSize: 13, fontWeight: 600 }}>Read review →</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal" style={{ padding: "100px 48px", background: "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(168,85,247,0.03))", borderTop: "1px solid rgba(99,102,241,0.08)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(32px,3.5vw,48px)", fontWeight: 800, color: "#f8fafc", marginBottom: 64 }}>
              The most trusted AI tool resource
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
              {[
                { n: "500+", label: "Tools tracked" },
                { n: "50+", label: "In-depth reviews" },
                { n: "1M+", label: "Monthly readers" },
                { n: "100%", label: "Independent" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="pulse-glow" style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#6366f1", marginBottom: 8 }}>{s.n}</div>
                  <div style={{ fontSize: 14, color: "#475569" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section ref={el => addReveal(el as HTMLElement)} className="reveal" style={{ padding: "120px 48px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(99,102,241,0.08), transparent)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, letterSpacing: "-0.03em", color: "#f8fafc", marginBottom: 24 }}>
              Build your{" "}
              <span style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>perfect</span>
              {" "}AI stack.
            </h2>
            <p style={{ color: "#64748b", fontSize: 18, marginBottom: 40 }}>
              Take our 4-question quiz and get a personalized AI tool recommendation.
            </p>
            <Link href="/finder" className="btn-glow" style={{ fontSize: 18, padding: "18px 40px" }}>
              Find My AI Stack →
            </Link>
          </div>
        </section>

        <footer style={{ padding: "48px", borderTop: "1px solid rgba(255,255,255,0.05)", color: "#374151", fontSize: 13 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#6366f1", marginBottom: 8 }}>AIToolsWeekly</div>
              <div>Independent reviews of every AI tool since 2023.</div>
            </div>
            <div>
              <p>Affiliate Disclosure: We earn commissions from partner links.</p>
              <p style={{ marginTop: 8 }}>© 2026 AIToolsWeekly. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
