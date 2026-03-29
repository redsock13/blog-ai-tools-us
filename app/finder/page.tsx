"use client";
import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    q: "What's your main use case?",
    options: ["Writing & Content", "Coding & Development", "Design & Creative", "Analysis & Research", "Automation & Business", "Voice & Video"],
  },
  {
    q: "What's your team size?",
    options: ["Just me (Solo)", "Small team (2–10)", "Mid-size (11–50)", "Large organization (51+)"],
  },
  {
    q: "What's your monthly budget for AI tools?",
    options: ["Free only", "$1–$30/month", "$31–$100/month", "$100+/month"],
  },
  {
    q: "What's your technical level?",
    options: ["Beginner (no coding)", "Intermediate (basic code)", "Advanced (developer)", "Expert (building AI apps)"],
  },
];

const recommendations: Record<string, { tool: string; slug: string; reason: string; cta: string }> = {
  "Writing & Content": { tool: "Claude Pro", slug: "best-ai-writing-tool-2026", reason: "Best-in-class long-form writing quality with 200K context window for large projects.", cta: "Try Claude Pro →" },
  "Coding & Development": { tool: "Cursor", slug: "best-ai-code-assistant-2026", reason: "Full codebase context and multi-file edits make it the #1 AI coding environment.", cta: "Try Cursor →" },
  "Design & Creative": { tool: "Canva AI", slug: "best-ai-design-tool-2026", reason: "Magic Design generates stunning visuals from prompts, no design skills needed.", cta: "Try Canva AI →" },
  "Analysis & Research": { tool: "Perplexity Pro", slug: "best-ai-research-tool-2026", reason: "Real-time web search with AI synthesis and source citations. Research reimagined.", cta: "Try Perplexity Pro →" },
  "Automation & Business": { tool: "Make (Integromat)", slug: "best-ai-automation-tool-2026", reason: "Most powerful no-code automation at the best price. Build complex AI workflows.", cta: "Try Make →" },
  "Voice & Video": { tool: "ElevenLabs", slug: "best-ai-voice-generator-2026", reason: "Most realistic AI voices with emotional control. Clone your voice in minutes.", cta: "Try ElevenLabs →" },
};

export default function Finder() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSelect = (option: string) => {
    setSelected(option);
    setTimeout(() => {
      const newAnswers = [...answers, option];
      setAnswers(newAnswers);
      setSelected(null);
      if (currentQ + 1 >= questions.length) {
        setDone(true);
      } else {
        setCurrentQ(currentQ + 1);
      }
    }, 400);
  };

  const rec = recommendations[answers[0]] || recommendations["Writing & Content"];

  return (
    <main style={{ background: "#04050f", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px" }}>
      <Link href="/" style={{ position: "absolute", top: 24, left: 48, color: "#6366f1", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
        ← AIToolsWeekly
      </Link>

      {!done ? (
        <div style={{ maxWidth: 640, width: "100%", textAlign: "center" }}>
          {/* Progress */}
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 48 }}>
            {questions.map((_, i) => (
              <div key={i} style={{
                width: 32, height: 4, borderRadius: 2,
                background: i <= currentQ ? "linear-gradient(135deg,#6366f1,#a855f7)" : "rgba(255,255,255,0.08)",
                transition: "background 0.3s ease"
              }} />
            ))}
          </div>

          <p style={{ color: "#6366f1", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Question {currentQ + 1} of {questions.length}
          </p>
          <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#f8fafc", marginBottom: 48, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            {questions[currentQ].q}
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {questions[currentQ].options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                style={{
                  background: selected === opt
                    ? "linear-gradient(135deg,rgba(99,102,241,0.3),rgba(168,85,247,0.2))"
                    : "rgba(255,255,255,0.03)",
                  border: selected === opt
                    ? "1px solid rgba(99,102,241,0.6)"
                    : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, padding: "18px 20px",
                  color: selected === opt ? "#818cf8" : "#94a3b8",
                  fontSize: 15, fontWeight: 600, cursor: "pointer",
                  transition: "all 0.2s ease", textAlign: "left"
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: 640, width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>🎯</div>
          <p style={{ color: "#6366f1", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Your Recommendation
          </p>
          <h1 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 900, color: "#f8fafc", marginBottom: 16, letterSpacing: "-0.03em" }}>
            {rec.tool}
          </h1>
          <p style={{ color: "#64748b", fontSize: 17, lineHeight: 1.7, marginBottom: 48 }}>{rec.reason}</p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" className="btn-glow" style={{ fontSize: 16, textDecoration: "none" }}>
              {rec.cta}
            </a>
            <Link href={`/${rec.slug}`} style={{
              display: "inline-block", padding: "14px 28px", border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: 10, color: "#6366f1", textDecoration: "none", fontSize: 15, fontWeight: 600
            }}>
              Read Full Review →
            </Link>
          </div>

          <button
            onClick={() => { setCurrentQ(0); setAnswers([]); setDone(false); }}
            style={{ marginTop: 32, background: "none", border: "none", color: "#475569", fontSize: 14, cursor: "pointer" }}
          >
            ↺ Start over
          </button>
        </div>
      )}
    </main>
  );
}
