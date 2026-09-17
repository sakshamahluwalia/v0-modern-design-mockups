import { useState } from "react";
import { templates, getTemplate, type TemplateEntry } from "@/lib/registry";

/**
 * Preview harness. Templates auto-register from
 * src/templates/<businessType>/<id>/index.tsx (see src/lib/registry.ts) — no
 * shared file to edit when one is added.
 *
 * URL:
 *   /?t=professional/meridian   → render that template full-bleed (screenshots/seed)
 *   /                           → grouped picker of everything discovered
 */
function currentKey(): string | null {
  const p = new URLSearchParams(window.location.search);
  return p.get("t");
}

export function App() {
  const [key] = useState<string | null>(currentKey);

  if (templates.length === 0) {
    return (
      <Shell title="No templates yet">
        Each template lives in <code>src/templates/&lt;businessType&gt;/&lt;id&gt;/index.tsx</code> and
        must export <code>meta</code>, <code>sampleConfig</code>, and a default{" "}
        <code>SiteTemplate({"{ config }"})</code>. See <code>src/templates/README.md</code>.
      </Shell>
    );
  }

  if (key) {
    const t = getTemplate(key);
    if (!t) return <Shell title={`Unknown template: ${key}`}>Check <code>?t=businessType/id</code>.</Shell>;
    const Cmp = t.Component;
    return <Cmp config={t.sampleConfig} />;
  }

  return <Picker />;
}

function Picker() {
  // group by businessType, then list by industry
  const byType = new Map<string, TemplateEntry[]>();
  for (const t of templates) {
    const arr = byType.get(t.businessType) ?? [];
    arr.push(t);
    byType.set(t.businessType, arr);
  }

  return (
    <div style={{ padding: 40, fontFamily: "Inter, sans-serif", maxWidth: 760, margin: "0 auto" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 2 }}>Design mockups</h1>
      <p style={{ color: "#666", marginBottom: 28 }}>
        {templates.length} template{templates.length === 1 ? "" : "s"} across {byType.size} business
        type{byType.size === 1 ? "" : "s"} · open one with <code>?t=businessType/id</code>
      </p>
      {[...byType.entries()].map(([bt, list]) => (
        <section key={bt} style={{ marginBottom: 28 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#999", marginBottom: 10 }}>
            {bt} · {list.length}
          </h2>
          <ul style={{ display: "grid", gap: 10, listStyle: "none", padding: 0, margin: 0 }}>
            {list.map((t) => (
              <li key={t.key}>
                <a
                  href={`/?t=${t.key}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "13px 16px",
                    border: "1px solid #e6e6e6",
                    borderRadius: 12,
                    textDecoration: "none",
                    color: "#111",
                  }}
                >
                  <span style={{ width: 12, height: 12, borderRadius: 999, background: t.accent ?? "#999", flexShrink: 0 }} />
                  <span style={{ fontWeight: 650 }}>{t.label}</span>
                  <span style={{ color: "#999", fontSize: 13 }}>· {t.industry}</span>
                  <span style={{ marginLeft: "auto", color: "#bbb", fontSize: 12 }}>?t={t.key}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 48, fontFamily: "Inter, sans-serif", maxWidth: 640 }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>{title}</h1>
      <p style={{ color: "#555", lineHeight: 1.6 }}>{children}</p>
    </div>
  );
}
