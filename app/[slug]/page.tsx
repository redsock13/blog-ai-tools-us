import { tools } from "@/data/tools";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = tools.find((x) => x.slug === slug);
  if (!t) return {};
  return { title: `${t.title} | AIToolsWeekly`, description: t.description };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = tools.find((x) => x.slug === slug);
  if (!t) notFound();

  const related = tools.filter(x => x.slug !== slug && x.category === t.category).slice(0, 3);

  return (
    <main style={{ background: "#04050f", minHeight: "100vh", color: "#e2e8f0" }}>
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(4,5,15,0.9)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(99,102,241,0.1)",
        padding: "0 48px", height: 64, display: "flex", alignItems: "center", gap: 24
      }}>
        <Link href="/" style={{ fontWeight: 800, fontSize: 18, background: "linear-gradient(135deg,#6366f1,#a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textDecoration: "none" }}>
          AIToolsWeekly
        </Link>
        <span style={{ color: "#1e293b" }}>›</span>
        <span style={{ color: "#475569", fontSize: 14 }}>{t.category}</span>
      </nav>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 48px" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <span style={{ background: "rgba(99,102,241,0.1)", color: "#6366f1", fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 100, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {t.category}
            </span>
            <span style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 100 }}>
              {t.commission}
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#f8fafc", lineHeight: 1.15, marginBottom: 20 }}>
            {t.title}
          </h1>
          <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.7 }}>{t.description}</p>
          <p style={{ color: "#1e293b", fontSize: 13, marginTop: 16 }}>Last updated: <strong style={{ color: "#374151" }}>March 2026</strong></p>
        </div>

        {/* Winner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(168,85,247,0.06))",
          border: "1px solid rgba(99,102,241,0.25)", borderRadius: 20, padding: 32, marginBottom: 48, position: "relative"
        }}>
          <div style={{ position: "absolute", top: -12, left: 24, background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "#fff", fontSize: 12, fontWeight: 800, padding: "4px 16px", borderRadius: 100 }}>
            🏆 TOP PICK 2026
          </div>
          <div style={{ paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ color: "#475569", fontSize: 13, marginBottom: 4 }}>Our #1 Pick</p>
              <h2 style={{ fontSize: 36, fontWeight: 900, color: "#818cf8", letterSpacing: "-0.02em" }}>{t.winner}</h2>
              <p style={{ color: "#475569", fontSize: 15, marginTop: 8 }}>vs. {t.runner_up}</p>
            </div>
            <a href={t.winnerLink} style={{
              display: "inline-block", background: "linear-gradient(135deg,#6366f1,#a855f7)",
              color: "#fff", fontWeight: 800, padding: "16px 32px", borderRadius: 12,
              textDecoration: "none", fontSize: 16, boxShadow: "0 10px 30px rgba(99,102,241,0.3)"
            }}>
              Try {t.winner} Free →
            </a>
          </div>
        </div>

        {/* Pricing */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", marginBottom: 20 }}>Pricing Comparison</h2>
          <div style={{ background: "#080810", border: "1px solid rgba(99,102,241,0.1)", borderRadius: 16, overflow: "hidden" }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th style={{ color: "#818cf8" }}>🥇 {t.winner}</th>
                  <th style={{ color: "#94a3b8" }}>{t.runner_up}</th>
                </tr>
              </thead>
              <tbody>
                {t.pricing.map((p, i) => (
                  <tr key={i}>
                    <td style={{ color: "#94a3b8", fontWeight: 600 }}>{p.tier}</td>
                    <td style={{ color: "#818cf8", fontWeight: 700 }}>{p.winner}</td>
                    <td style={{ color: "#475569" }}>{p.runnerUp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Feature comparison */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", marginBottom: 20 }}>Feature Comparison</h2>
          <div style={{ background: "#080810", border: "1px solid rgba(99,102,241,0.1)", borderRadius: 16, overflow: "hidden" }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th style={{ color: "#818cf8" }}>🥇 {t.winner}</th>
                  <th style={{ color: "#94a3b8" }}>{t.runner_up}</th>
                </tr>
              </thead>
              <tbody>
                {t.features.map((f, i) => (
                  <tr key={i}>
                    <td style={{ color: "#94a3b8", fontWeight: 600 }}>{f.name}</td>
                    <td style={{ color: "#818cf8", fontWeight: 700 }}>{f.winner}</td>
                    <td style={{ color: "#475569" }}>{f.runnerUp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Winner Pros */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", marginBottom: 20 }}>Why {t.winner} Wins</h2>
          <div style={{ background: "#080810", border: "1px solid rgba(99,102,241,0.1)", borderRadius: 16, padding: 24 }}>
            {t.winnerPros.map((pro, i) => (
              <div key={i} className="check-item">
                <span style={{ color: "#6366f1", fontWeight: 700 }}>✓</span>
                <span style={{ color: "#94a3b8", fontSize: 15 }}>{pro}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Who should use */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", marginBottom: 20 }}>Who Should Use {t.winner}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
            {t.whoShouldUse.map((who, i) => (
              <div key={i} style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)", borderRadius: 12, padding: "16px 20px", display: "flex", gap: 12 }}>
                <span style={{ color: "#6366f1" }}>→</span>
                <span style={{ color: "#94a3b8", fontSize: 14 }}>{who}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cons */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f1f5f9", marginBottom: 16 }}>Limitations to Consider</h2>
          <div style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)", borderRadius: 12, padding: 20 }}>
            {t.winnerCons.map((con, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0" }}>
                <span style={{ color: "#ef4444" }}>✗</span>
                <span style={{ color: "#94a3b8", fontSize: 14 }}>{con}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA runner up */}
        <div style={{ background: "rgba(100,116,139,0.05)", border: "1px solid rgba(100,116,139,0.15)", borderRadius: 12, padding: 24, marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p style={{ color: "#475569", fontSize: 12 }}>RUNNER-UP</p>
            <p style={{ color: "#94a3b8", fontWeight: 700, fontSize: 18 }}>{t.runner_up}</p>
          </div>
          <a href={t.runnerUpLink} style={{ display: "inline-block", border: "1px solid rgba(100,116,139,0.3)", color: "#64748b", fontWeight: 600, padding: "12px 24px", borderRadius: 10, textDecoration: "none", fontSize: 14 }}>
            Try {t.runner_up} →
          </a>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#f1f5f9", marginBottom: 32 }}>FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {t.faq.map((item, i) => (
              <div key={i} style={{ background: "#080810", border: "1px solid rgba(99,102,241,0.1)", borderRadius: 12, padding: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#6366f1", marginBottom: 12 }}>{item.q}</h3>
                <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: 15 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div style={{ background: "linear-gradient(135deg,rgba(99,102,241,0.12),rgba(168,85,247,0.06))", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 20, padding: 48, textAlign: "center", marginBottom: 64 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#f8fafc", marginBottom: 16 }}>Ready to try {t.winner}?</h2>
          <p style={{ color: "#64748b", marginBottom: 32 }}>Join thousands who have improved their workflow with AI.</p>
          <a href={t.winnerLink} style={{
            display: "inline-block", background: "linear-gradient(135deg,#6366f1,#a855f7)",
            color: "#fff", fontWeight: 800, padding: "16px 40px", borderRadius: 12,
            textDecoration: "none", fontSize: 18
          }}>
            Try {t.winner} Free →
          </a>
          <p style={{ color: "#1e293b", fontSize: 12, marginTop: 16 }}>Affiliate link — commission earned at no cost to you.</p>
        </div>

        {related.length > 0 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#f1f5f9", marginBottom: 24 }}>Related Reviews</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
              {related.map(r => (
                <Link key={r.slug} href={`/${r.slug}`} style={{ textDecoration: "none", display: "block", background: "#080810", border: "1px solid rgba(99,102,241,0.1)", borderRadius: 12, padding: 20 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 8, lineHeight: 1.4 }}>{r.title}</p>
                  <p style={{ color: "#6366f1", fontSize: 12 }}>Winner: {r.winner}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer style={{ padding: "48px", borderTop: "1px solid rgba(255,255,255,0.05)", color: "#1e293b", fontSize: 13, marginTop: 40 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <Link href="/" style={{ color: "#6366f1", textDecoration: "none", fontWeight: 700 }}>← AIToolsWeekly</Link>
          <span>© 2026 AIToolsWeekly · Affiliate Disclosure</span>
        </div>
      </footer>
    </main>
  );
}
