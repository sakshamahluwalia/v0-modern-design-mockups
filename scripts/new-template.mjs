#!/usr/bin/env node
/**
 * Template generator / v0-export adapter.
 *
 * Mode A — scaffold:
 *   node scripts/new-template.mjs --business <type> --id <id> [--industry] [--label] [--accent]
 *
 * Mode B — adapt a v0 page.tsx:
 *   node scripts/new-template.mjs --from <path> --business <type> --id <id> [--industry] [--label] [--accent]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE_CONFIG_PATH = path.join(ROOT, "src/lib/site-config.ts");
const DEFAULT_ACCENT = "#64748b";
const BOOKING_URL = "https://bookme-web.onrender.com/";
const SITE_TYPES = [
  "SiteService",
  "SiteFaq",
  "SiteReview",
  "SiteHour",
  "SiteGalleryItem",
  "SiteBooking",
  "SiteCta",
  "SiteConfig",
];

function die(msg) {
  console.error(`error: ${msg}`);
  process.exit(1);
}

function warn(msg) {
  console.error(`warning: ${msg}`);
}

function printHelp() {
  console.log(`Usage:
  Mode A (scaffold from scratch):
    node scripts/new-template.mjs --business <type> --id <id> [--industry <industry>] [--label "<label>"] [--accent "#hex"]

  Mode B (adapt an existing v0 export):
    node scripts/new-template.mjs --from <path-to-v0-page.tsx> --business <type> --id <id> [--industry <industry>] [--label "<label>"] [--accent "#hex"]

  <type> must be one of the BUSINESS_TYPES in src/lib/site-config.ts
    (salon · trades · restaurant · clinic · professional · other)

  After writing, run:
    npm run dev
    then open /?t=<business>/<id>
`);
}

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--help" || a === "-h") {
      out.help = true;
      continue;
    }
    if (!a.startsWith("--")) die(`unexpected argument: ${a}\nRun with --help for usage.`);
    const key = a.slice(2);
    if (!key) die("empty flag");
    const next = argv[i + 1];
    if (!next || next.startsWith("--")) die(`missing value for --${key}`);
    out[key] = next;
    i++;
  }
  return out;
}

function readBusinessTypes() {
  let src;
  try {
    src = fs.readFileSync(SITE_CONFIG_PATH, "utf8");
  } catch {
    die(`could not read ${path.relative(ROOT, SITE_CONFIG_PATH)}`);
  }
  const m = src.match(/export const BUSINESS_TYPES\s*=\s*\[([\s\S]*?)\]/);
  if (!m) die("could not parse BUSINESS_TYPES from src/lib/site-config.ts");
  const types = [...m[1].matchAll(/["']([^"']+)["']/g)].map((x) => x[1]);
  if (!types.length) die("BUSINESS_TYPES is empty in src/lib/site-config.ts");
  return types;
}

function titleCaseId(id) {
  return id
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function skipString(src, i) {
  const q = src[i];
  i++;
  while (i < src.length) {
    if (src[i] === "\\") {
      i += 2;
      continue;
    }
    if (src[i] === q) return i + 1;
    if (q === "`" && src[i] === "$" && src[i + 1] === "{") {
      i = skipBalanced(src, i + 1, "{", "}");
      continue;
    }
    i++;
  }
  return src.length;
}

function skipLineComment(src, i) {
  while (i < src.length && src[i] !== "\n") i++;
  return i;
}

function skipBlockComment(src, i) {
  const end = src.indexOf("*/", i + 2);
  return end === -1 ? src.length : end + 2;
}

function skipBalanced(src, i, open, close) {
  if (src[i] !== open) return i;
  let depth = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '"' || c === "'" || c === "`") {
      i = skipString(src, i);
      continue;
    }
    if (c === "/" && src[i + 1] === "/") {
      i = skipLineComment(src, i);
      continue;
    }
    if (c === "/" && src[i + 1] === "*") {
      i = skipBlockComment(src, i);
      continue;
    }
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) return i + 1;
    }
    i++;
  }
  return src.length;
}

/** End index of a TS type / value that starts at `=` (object, union, etc.). */
function skipTypeBody(src, i) {
  while (i < src.length && /\s/.test(src[i])) i++;
  const start = i;
  while (i < src.length) {
    const c = src[i];
    if (c === '"' || c === "'" || c === "`") {
      i = skipString(src, i);
      continue;
    }
    if (c === "/" && src[i + 1] === "/") {
      i = skipLineComment(src, i);
      continue;
    }
    if (c === "/" && src[i + 1] === "*") {
      i = skipBlockComment(src, i);
      continue;
    }
    if (c === "{") {
      i = skipBalanced(src, i, "{", "}");
      continue;
    }
    if (c === "(") {
      i = skipBalanced(src, i, "(", ")");
      continue;
    }
    if (c === "<") {
      i = skipBalanced(src, i, "<", ">");
      continue;
    }
    if (c === ";" || c === "\n") {
      if (c === ";") i++;
      return i;
    }
    // One-liner without semicolon: stop before the next declaration.
    if (c === "\n") return i;
    i++;
  }
  return start === i ? i : i;
}

function skipSignatureAndBody(src, i) {
  // from `function Name` — skip to params, then optional return type, then body
  const fn = src.indexOf("(", i);
  if (fn === -1) return -1;
  i = skipBalanced(src, fn, "(", ")");
  while (i < src.length && /\s/.test(src[i])) i++;
  if (src[i] === ":") {
    i++;
    while (i < src.length && src[i] !== "{" && src[i] !== ";") {
      if (src[i] === '"' || src[i] === "'" || src[i] === "`") i = skipString(src, i);
      else if (src[i] === "{") {
        // Could be an object type in the return annotation; skip it unless it's the body.
        // Heuristic: if the next `{` is a type, there will be more before the body `{`.
        // For `): JSX.Element {` there is no `{` in the return type.
        const brace = src.indexOf("{", i);
        const semi = src.indexOf(";", i);
        if (brace !== -1 && (semi === -1 || brace < semi)) {
          // peek: if this looks like ` { config: SiteConfig }` in params we already passed params.
          // Return types rarely start with `{` for these helpers. Treat `{` as the body.
          break;
        }
        i++;
      } else i++;
    }
  }
  while (i < src.length && /\s/.test(src[i])) i++;
  if (src[i] === "{") return skipBalanced(src, i, "{", "}");
  if (src[i] === ";") return i + 1;
  return -1;
}

function applyRanges(src, ranges) {
  const sorted = [...ranges].sort((a, b) => b.start - a.start);
  let out = src;
  for (const r of sorted) {
    let { start, end } = r;
    // Swallow a following extra blank line.
    if (out[end] === "\n") end++;
    out = out.slice(0, start) + out.slice(end);
  }
  return out;
}

function lastImportEnd(src) {
  const re = /^import\b/gm;
  let last = -1;
  let m;
  while ((m = re.exec(src))) {
    let i = m.index;
    // scan to the end of this import
    while (i < src.length) {
      const c = src[i];
      if (c === '"' || c === "'" || c === "`") {
        i = skipString(src, i);
        continue;
      }
      if (c === "{") {
        i = skipBalanced(src, i, "{", "}");
        continue;
      }
      if (c === "(") {
        i = skipBalanced(src, i, "(", ")");
        continue;
      }
      if (c === ";") {
        i++;
        break;
      }
      if (c === "\n") {
        // import without semicolon
        const rest = src.slice(m.index, i + 1);
        if (/\bfrom\b/.test(rest) || /import\s+["']/.test(rest)) {
          i++;
          break;
        }
      }
      i++;
    }
    last = i;
    re.lastIndex = i;
  }
  return last;
}

function inferAccent(src) {
  const counts = new Map();
  const re = /#([0-9a-fA-F]{6})\b/g;
  let m;
  while ((m = re.exec(src))) {
    const hex = `#${m[1].toLowerCase()}`;
    if (isNeutralHex(hex)) continue;
    counts.set(hex, (counts.get(hex) ?? 0) + 1);
  }
  let best = null;
  let bestN = 0;
  for (const [hex, n] of counts) {
    if (n > bestN) {
      best = hex;
      bestN = n;
    }
  }
  return best;
}

function isNeutralHex(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  const light = (max + min) / 2 / 255;
  if (light > 0.9 || light < 0.12) return true;
  if (sat < 0.18) return true;
  return false;
}

function findOpeningTagEnd(src, start) {
  let i = start;
  if (src[i] !== "<") return -1;
  i++;
  while (i < src.length && /[A-Za-z0-9._-]/.test(src[i])) i++;
  while (i < src.length) {
    const c = src[i];
    if (c === '"' || c === "'" || c === "`") {
      i = skipString(src, i);
      continue;
    }
    if (c === "{") {
      i = skipBalanced(src, i, "{", "}");
      continue;
    }
    if (c === "/" && src[i + 1] === ">") return i + 2;
    if (c === ">") return i + 1;
    i++;
  }
  return -1;
}

function jsxTagName(src, start) {
  if (src[start] !== "<") return null;
  let i = start + 1;
  if (src[i] === "/") i++;
  const from = i;
  while (i < src.length && /[A-Za-z0-9._-]/.test(src[i])) i++;
  return src.slice(from, i);
}

function findJsxElementEnd(src, start) {
  const openEnd = findOpeningTagEnd(src, start);
  if (openEnd === -1) return -1;
  const openText = src.slice(start, openEnd);
  if (/\/>\s*$/.test(openText)) return openEnd;
  const name = jsxTagName(src, start);
  if (!name) return -1;
  const close = `</${name}>`;
  const open = `<${name}`;
  let i = openEnd;
  let depth = 1;
  while (i < src.length && depth > 0) {
    const c = src[i];
    if (c === '"' || c === "'" || c === "`") {
      i = skipString(src, i);
      continue;
    }
    if (c === "{") {
      i = skipBalanced(src, i, "{", "}");
      continue;
    }
    if (src.startsWith(close, i)) {
      depth--;
      i += close.length;
      if (depth === 0) return i;
      continue;
    }
    if (src.startsWith(open, i)) {
      const next = src[i + open.length];
      if (!next || !/[A-Za-z0-9._-]/.test(next)) {
        const nestedOpenEnd = findOpeningTagEnd(src, i);
        if (nestedOpenEnd === -1) {
          i++;
          continue;
        }
        const nestedOpen = src.slice(i, nestedOpenEnd);
        if (!/\/>\s*$/.test(nestedOpen)) depth++;
        i = nestedOpenEnd;
        continue;
      }
    }
    i++;
  }
  return -1;
}

function isNavTag(src, i) {
  if (!src.startsWith("<nav", i)) return false;
  const next = src[i + 4];
  return !next || !/[A-Za-z0-9._-]/.test(next);
}

function isDesktopNavOpen(openText) {
  if (/\b(?:lg|md|sm):hidden\b/.test(openText)) return false;
  return /\bhidden\b/.test(openText) && /\b(?:lg|md|sm):(?:flex|block|grid|inline-flex)\b/.test(openText);
}

function stripUseClient(src, warnings) {
  const re = /^['"]use client['"]\s*;?[ \t]*\r?\n/;
  if (!re.test(src)) {
    warnings.push("no leading 'use client' directive");
    return src;
  }
  return src.replace(re, "");
}

function removeInlineSiteTypes(src, warnings) {
  const names = SITE_TYPES.join("|");
  const re = new RegExp(`^([ \\t]*)(export\\s+)?type\\s+(${names})\\b`, "gm");
  const ranges = [];
  let m;
  while ((m = re.exec(src))) {
    const start = m.index;
    let i = start + m[0].length;
    const eq = src.indexOf("=", i);
    if (eq === -1 || eq > start + m[0].length + 80) {
      warnings.push(`could not finish type ${m[3]} (no '=')`);
      continue;
    }
    const end = skipTypeBody(src, eq + 1);
    ranges.push({ start, end });
    re.lastIndex = end;
  }
  if (!ranges.length) {
    warnings.push("no inline SiteService/SiteFaq/SiteReview/SiteConfig type block");
    return src;
  }
  return applyRanges(src, ranges);
}

function ensureSiteConfigImport(src) {
  const fromRe = /import\s+(type\s+)?\{([^}]*)\}\s+from\s+['"]@\/lib\/site-config['"]/;
  if (fromRe.test(src)) {
    return src.replace(fromRe, (full, typeKw, names) => {
      if (/\bSiteConfig\b/.test(names)) return full;
      const trimmed = names.trim().replace(/,$/, "");
      const inner = trimmed ? `${trimmed}, SiteConfig` : "SiteConfig";
      return `import ${typeKw || ""}{ ${inner} } from "@/lib/site-config"`;
    });
  }
  if (/from\s+['"]@\/lib\/site-config['"]/.test(src)) return src;
  const insert = `import type { SiteConfig } from "@/lib/site-config";\n`;
  const end = lastImportEnd(src);
  if (end === -1) return insert + src;
  return src.slice(0, end) + (src[end - 1] === "\n" ? "" : "\n") + insert + src.slice(end);
}

function insertMeta(src, meta, warnings) {
  if (/export\s+const\s+meta\b/.test(src)) {
    warnings.push("meta already present; leaving it in place");
    return src;
  }
  const block =
    `\nexport const meta = { industry: ${JSON.stringify(meta.industry)}, label: ${JSON.stringify(meta.label)}, accent: ${JSON.stringify(meta.accent)} };\n`;
  const end = lastImportEnd(src);
  if (end === -1) {
    warnings.push("could not find imports to insert meta after; prepending");
    return block + src;
  }
  return src.slice(0, end) + (src[end - 1] === "\n" ? "" : "\n") + block + src.slice(end);
}

function renameSampleConfig(src, warnings) {
  const re = /^(export\s+)?const\s+config\b/m;
  const m = src.match(re);
  if (!m) {
    if (/export\s+const\s+sampleConfig\b/.test(src)) {
      warnings.push("const config already named sampleConfig");
      return src;
    }
    warnings.push("no module-level const config to rename");
    return src;
  }
  src = src.replace(re, "export const sampleConfig");

  const fn = src.search(/\bfunction\s+SiteTemplate\b/);
  if (fn === -1) {
    warnings.push("could not find SiteTemplate signature to update default param");
    return src;
  }
  const paren = src.indexOf("(", fn);
  if (paren === -1) {
    warnings.push("could not find SiteTemplate signature to update default param");
    return src;
  }
  const endParams = skipBalanced(src, paren, "(", ")");
  const params = src.slice(paren, endParams);
  if (/=\s*config\b/.test(params)) {
    src = src.slice(0, paren) + params.replace(/=\s*config\b/, "= sampleConfig") + src.slice(endParams);
  } else if (!/=\s*sampleConfig\b/.test(params)) {
    warnings.push("SiteTemplate has no default-parameter fallback to retarget at sampleConfig");
  }
  return src;
}

function removeHome(src, warnings) {
  const ranges = [];
  const re = /^[ \t]*export\s+(default\s+)?function\s+Home\b/gm;
  let m;
  while ((m = re.exec(src))) {
    const start = m.index;
    const end = skipSignatureAndBody(src, start);
    if (end === -1) {
      warnings.push("found export function Home but could not match its body");
      continue;
    }
    ranges.push({ start, end });
    // trailing `export default Home`
    const rest = src.slice(end);
    const trail = rest.match(/^\s*export\s+default\s+Home\s*;?/);
    if (trail) ranges.push({ start: end, end: end + trail[0].length });
    re.lastIndex = end;
  }
  if (!ranges.length) {
    warnings.push("no trailing export function Home() helper");
    return src;
  }
  return applyRanges(src, ranges);
}

function removeDesktopNav(src, warnings) {
  const ranges = [];
  let i = 0;
  while (i < src.length) {
    const at = src.indexOf("<nav", i);
    if (at === -1) break;
    if (!isNavTag(src, at)) {
      i = at + 4;
      continue;
    }
    const openEnd = findOpeningTagEnd(src, at);
    if (openEnd === -1) {
      i = at + 4;
      continue;
    }
    const openText = src.slice(at, openEnd);
    if (isDesktopNavOpen(openText)) {
      const end = findJsxElementEnd(src, at);
      if (end === -1) {
        warnings.push("found a desktop <nav> opening tag but could not match its close");
        i = openEnd;
        continue;
      }
      let start = at;
      // drop a leading newline/indent so we don't leave a hole
      while (start > 0 && /[ \t]/.test(src[start - 1])) start--;
      ranges.push({ start, end });
      i = end;
      continue;
    }
    i = openEnd;
  }
  if (!ranges.length) {
    warnings.push("no desktop primary <nav> (hidden + lg/md/sm:flex) found; header may still have center links");
    return src;
  }
  return applyRanges(src, ranges);
}

function rewriteBookingUrl(src, warnings) {
  const re = /\burl\s*:\s*(['"`])(https?:\/\/(?:www\.)?example\.com[^'"`]*)\1/;
  if (!re.test(src)) {
    // also catch a bare example.com string in a url field
    const loose = /\burl\s*:\s*(['"`])([^'"`]*example\.com[^'"`]*)\1/;
    if (!loose.test(src)) {
      warnings.push("no placeholder booking.url (example.com) to rewrite");
      return src;
    }
    return src.replace(loose, `url: $1${BOOKING_URL}$1`);
  }
  return src.replace(re, `url: $1${BOOKING_URL}$1`);
}

function rewriteUiImports(src, warnings) {
  const next = src.replace(/@\/components\/ui\/(button|accordion)/g, "@/lib/ui/$1");
  if (next !== src) {
    warnings.push("rewrote @/components/ui/{button,accordion} → @/lib/ui/* (named exports may still need a hand-edit)");
  }
  return next;
}

function leftoverComponents(src) {
  const re = /['"]@\/components\/[^'"]+['"]/g;
  return [...src.matchAll(re)].map((m) => m[0]);
}

function validateAdapted(src) {
  const problems = [];
  if (!/export\s+const\s+meta\b/.test(src)) problems.push("missing export const meta");
  if (!/export\s+const\s+sampleConfig\b/.test(src)) problems.push("missing export const sampleConfig");
  if (!/export\s+default\s+function\s+SiteTemplate\b/.test(src) && !/export\s+default\s+SiteTemplate\b/.test(src)) {
    problems.push("missing default export SiteTemplate");
  }
  if (!/from\s+['"]@\/lib\/site-config['"]/.test(src)) {
    problems.push("missing import from @/lib/site-config");
  }
  if (/^['"]use client['"]/m.test(src)) problems.push("still contains a 'use client' directive");
  const extra = leftoverComponents(src);
  if (extra.length) problems.push(`leftover @/components/ imports: ${extra.join(", ")}`);
  return problems;
}

function adaptSource(src, meta) {
  const warnings = [];
  let out = src.replace(/^\uFEFF/, "");
  out = stripUseClient(out, warnings);
  out = removeInlineSiteTypes(out, warnings);
  out = ensureSiteConfigImport(out);
  out = insertMeta(out, meta, warnings);
  out = renameSampleConfig(out, warnings);
  out = removeHome(out, warnings);
  out = removeDesktopNav(out, warnings);
  out = rewriteBookingUrl(out, warnings);
  out = rewriteUiImports(out, warnings);
  return { out, warnings };
}

function buildStub({ industry, label, accent }) {
  const name = label;
  return `import { useState } from "react";
import { Phone, Menu, X, MapPin, Clock, Star, ArrowUpRight } from "lucide-react";
import type { SiteConfig } from "@/lib/site-config";
import { FaqAccordion } from "@/lib/ui/accordion";

export const meta = {
  industry: ${JSON.stringify(industry)},
  label: ${JSON.stringify(label)},
  accent: ${JSON.stringify(accent)},
};

export const sampleConfig: SiteConfig = {
  business: {
    name: ${JSON.stringify(name)},
    category: "Local business",
    phone: "(905) 555-0142",
    tel: "tel:+19055550142",
    address: "100 Main Street North, Brampton, ON L6V 1N6",
    mapsUrl: "https://maps.google.com/?q=100+Main+Street+North+Brampton+ON",
    area: "Brampton, ON",
    rating: 4.9,
    reviewCount: 86,
    hours: [
      { day: "Monday – Friday", value: "9:00 AM – 6:00 PM" },
      { day: "Saturday", value: "10:00 AM – 4:00 PM" },
      { day: "Sunday", value: "Closed" },
    ],
  },
  copy: {
    heroHeadline: "A local team you can count on.",
    heroSub:
      "Friendly, reliable service for neighbours across Brampton and the surrounding area — clear communication, fair pricing, and work we stand behind.",
    about:
      "We started this business to give Brampton a straightforward local option: real people, honest timelines, and no runaround. Every job is handled by a small team that knows the neighbourhood and picks up the phone.\\n\\nWhether you are booking for the first time or coming back again, you will get the same careful attention and a result we are proud to put our name on.",
    services: [
      { title: "Core service", desc: "The work most clients come to us for, scoped clearly up front so there are no surprises.", price: "from $89" },
      { title: "Follow-up visit", desc: "A scheduled return to finish the job, check in, or keep things running smoothly.", price: "from $49" },
      { title: "Consultation", desc: "A focused conversation about your goals, options, and a recommended next step.", price: "Free" },
      { title: "Standard package", desc: "A bundled set of the essentials, priced as a package so you can plan with confidence.", price: "$149" },
      { title: "Premium package", desc: "Added time and attention for more involved work, still with a clear written scope.", price: "$249" },
      { title: "Custom quote", desc: "Tell us what you need and we will come back with a fixed price before anything starts.", price: "Custom" },
    ],
    faq: [
      { q: "Do I need an appointment?", a: "Walk-ins are welcome when we have space, but booking ahead is the best way to get the time you want. Same-week appointments are usually available." },
      { q: "Where are you located?", a: "We are at 100 Main Street North in Brampton, with parking nearby. If it is easier, we can also talk through options over the phone first." },
      { q: "How does pricing work?", a: "Most work is fixed-fee, agreed before we start. If something would change the scope, we pause and confirm with you first — no surprise invoices." },
    ],
  },
  reviews: [
    { author: "Priya S.", rating: 5, text: "Clear, kind, and on time. They explained everything up front and the result was exactly what we hoped for.", relativeTime: "2 weeks ago" },
    { author: "Daniel R.", rating: 5, text: "Finally a local spot that answers the phone. Booking was easy and the whole visit felt unhurried.", relativeTime: "1 month ago" },
    { author: "Amrita K.", rating: 5, text: "Professional without being stuffy. We have sent three neighbours their way already.", relativeTime: "3 months ago" },
  ],
  gallery: [
    { caption: "Storefront on Main Street North" },
    { caption: "A typical finished job" },
    { caption: "The team at work" },
  ],
  booking: {
    enabled: false,
    label: "Book an appointment",
    url: "${BOOKING_URL}",
  },
  primaryCta: { label: "Get in touch", href: "#contact" },
};

export default function SiteTemplate({ config }: { config: SiteConfig }) {
  const { business, copy, reviews, gallery, booking, primaryCta } = config;
  const [menuOpen, setMenuOpen] = useState(false);

  const services = copy.services ?? [];
  const faqs = copy.faq ?? [];
  const hasReviews = (reviews?.length ?? 0) > 0;
  const hasGallery = (gallery?.length ?? 0) > 0;
  const hasHours = (business.hours?.length ?? 0) > 0;
  const hasAbout = Boolean(copy.about?.trim());
  const hasHero = Boolean(copy.heroHeadline?.trim() || copy.heroSub?.trim());

  const bookingUrl = booking?.enabled ? booking.url : undefined;
  const cta =
    primaryCta ??
    (bookingUrl
      ? { label: booking?.label || "Book an appointment", href: bookingUrl }
      : { label: "Call us", href: business.tel });
  const ctaExternal = cta.href.startsWith("http");
  const initial = (business.name || "").trim().charAt(0).toUpperCase() || "•";

  const nav = [
    ...(services.length ? [{ label: "Services", href: "#services" }] : []),
    ...(booking?.enabled ? [{ label: "Booking", href: "#booking" }] : []),
    ...(hasGallery ? [{ label: "Gallery", href: "#gallery" }] : []),
    ...(hasAbout ? [{ label: "About", href: "#about" }] : []),
    ...(hasReviews ? [{ label: "Reviews", href: "#reviews" }] : []),
    ...(faqs.length ? [{ label: "FAQ", href: "#faq" }] : []),
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[${accent}] font-sans text-base font-bold text-white"
            >
              {initial}
            </span>
            <span className="text-lg font-semibold tracking-tight">{business.name}</span>
          </a>

          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={business.tel}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              <Phone className="h-4 w-4" /> {business.phone}
            </a>
            <a
              href={cta.href}
              {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[${accent}] px-5 text-sm font-semibold text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[${accent}] focus-visible:ring-offset-2"
            >
              {cta.label}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[${accent}] lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && (
          <nav aria-label="Mobile" className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
            <ul className="flex flex-col gap-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2 border-t border-slate-200 pt-3">
              <a href={business.tel} className="inline-flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600">
                <Phone className="h-4 w-4" /> {business.phone}
              </a>
              <a
                href={cta.href}
                onClick={() => setMenuOpen(false)}
                {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-[${accent}] px-6 text-sm font-semibold text-white"
              >
                {cta.label}
              </a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        {hasHero && (
          <section className="bg-slate-50">
            <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
              {business.category && (
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[${accent}]">
                  {business.category}
                  {business.area ? \` · \${business.area}\` : ""}
                </p>
              )}
              {copy.heroHeadline && (
                <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  {copy.heroHeadline}
                </h1>
              )}
              {copy.heroSub && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{copy.heroSub}</p>}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={cta.href}
                  {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[${accent}] px-6 text-sm font-semibold text-white hover:opacity-90"
                >
                  {cta.label} <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={business.tel}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  <Phone className="h-4 w-4" /> {business.phone}
                </a>
              </div>
            </div>
          </section>
        )}

        {services.length > 0 && (
          <section id="services" className="scroll-mt-24 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-5">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Services</h2>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((s) => (
                  <article key={s.title} className="rounded-xl border border-slate-200 bg-white p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">{s.title}</h3>
                      {s.price && <span className="text-xs font-semibold text-[${accent}]">{s.price}</span>}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {booking?.enabled && booking.url && (
          <section id="booking" className="scroll-mt-24 bg-slate-50 py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-5 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Book a time that works</h2>
              <p className="mt-4 text-base text-slate-600">
                Pick a slot on our booking page — it opens in a new tab and only takes a minute.
              </p>
              <a
                href={booking.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[${accent}] px-7 text-sm font-semibold text-white hover:opacity-90"
              >
                {booking.label || "Book an appointment"}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        )}

        {hasAbout && (
          <section id="about" className="scroll-mt-24 py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-5">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">About</h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
                {copy.about
                  .split("\\n")
                  .filter((p) => p.trim().length > 0)
                  .map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
              </div>
            </div>
          </section>
        )}

        {hasGallery && (
          <section id="gallery" className="scroll-mt-24 bg-slate-50 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-5">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Gallery</h2>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {gallery.map((g, i) => (
                  <figure key={i} className="overflow-hidden rounded-xl bg-slate-200">
                    <img
                      src={\`/placeholder.svg?height=320&width=480&i=\${i}\`}
                      alt=""
                      className="aspect-[3/2] w-full object-cover opacity-80"
                    />
                    {g.caption && <figcaption className="px-4 py-3 text-sm text-slate-600">{g.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {hasReviews && (
          <section id="reviews" className="scroll-mt-24 py-16 sm:py-24">
            <div className="mx-auto max-w-6xl px-5">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Reviews</h2>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {reviews.map((r) => (
                  <blockquote key={r.author} className="rounded-xl border border-slate-200 bg-white p-6">
                    <span className="flex gap-0.5 text-[${accent}]" aria-label={\`\${r.rating} out of 5 stars\`}>
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </span>
                    <p className="mt-4 text-sm leading-relaxed text-slate-700">{r.text}</p>
                    <footer className="mt-4 text-sm font-semibold text-slate-900">
                      {r.author}
                      {r.relativeTime ? <span className="ml-2 font-normal text-slate-500">{r.relativeTime}</span> : null}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section id="faq" className="scroll-mt-24 bg-slate-50 py-16 sm:py-24">
            <div className="mx-auto max-w-3xl px-5">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">FAQ</h2>
              <div className="mt-8 rounded-xl border border-slate-200 bg-white px-6">
                <FaqAccordion items={faqs} />
              </div>
            </div>
          </section>
        )}

        <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-5">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Contact</h2>
            <dl className="mt-8 space-y-6 text-sm">
              {business.address && (
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[${accent}]" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold text-slate-900">Office</dt>
                    <dd className="mt-1 text-slate-600">{business.address}</dd>
                    {business.mapsUrl && (
                      <a
                        href={business.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 font-semibold text-[${accent}]"
                      >
                        Get directions <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
              {business.phone && (
                <div className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[${accent}]" aria-hidden="true" />
                  <div>
                    <dt className="font-semibold text-slate-900">Phone</dt>
                    <dd className="mt-1">
                      <a href={business.tel} className="text-slate-600 hover:text-slate-900">
                        {business.phone}
                      </a>
                    </dd>
                  </div>
                </div>
              )}
              {hasHours && (
                <div className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[${accent}]" aria-hidden="true" />
                  <div className="w-full">
                    <dt className="font-semibold text-slate-900">Hours</dt>
                    <dd className="mt-2">
                      <ul className="space-y-1.5">
                        {business.hours.map((h) => (
                          <li key={h.day} className="flex justify-between gap-6 border-b border-dashed border-slate-200 pb-1.5 last:border-0">
                            <span className="text-slate-600">{h.day}</span>
                            <span className="font-medium text-slate-900">{h.value}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </div>
              )}
            </dl>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}
            {business.area ? \` · \${business.area}\` : ""}
          </p>
          <a href={business.tel} className="hover:text-slate-900">
            {business.phone}
          </a>
        </div>
      </footer>
    </div>
  );
}
`;
}

function printNextSteps(relPath, business, id) {
  console.log(`Created ${relPath}

Next steps:
  npm run dev
  then open /?t=${business}/${id}
`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const types = readBusinessTypes();
  const business = args.business;
  const id = args.id;
  const from = args.from;

  if (!business) die("missing --business\nRun with --help for usage.");
  if (!id) die("missing --id\nRun with --help for usage.");
  if (!types.includes(business)) {
    die(`invalid --business ${JSON.stringify(business)}. Must be one of: ${types.join(", ")}`);
  }
  if (!/^[A-Za-z0-9_-]+$/.test(id)) {
    die(`invalid --id ${JSON.stringify(id)}. Use a short slug of letters, numbers, hyphens, or underscores.`);
  }

  const destDir = path.join(ROOT, "src/templates", business, id);
  const destFile = path.join(destDir, "index.tsx");
  const relPath = path.relative(ROOT, destFile);

  if (fs.existsSync(destDir)) {
    die(`refusing to overwrite existing template at ${path.relative(ROOT, destDir)}/`);
  }

  const industry = args.industry || id;
  const label = args.label || titleCaseId(id) || id;
  let accent = args.accent || DEFAULT_ACCENT;
  if (args.accent && !/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(args.accent)) {
    die(`invalid --accent ${JSON.stringify(args.accent)}. Expected a hex like #64748b`);
  }

  let contents;
  if (from) {
    const fromPath = path.resolve(process.cwd(), from);
    if (!fs.existsSync(fromPath)) die(`--from file not found: ${fromPath}`);
    const source = fs.readFileSync(fromPath, "utf8");
    if (!args.accent) accent = inferAccent(source) || DEFAULT_ACCENT;
    const { out, warnings } = adaptSource(source, { industry, label, accent });
    for (const w of warnings) warn(w);
    const problems = validateAdapted(out);
    if (problems.length) {
      die(`adaptation would produce an invalid file:\n  - ${problems.join("\n  - ")}`);
    }
    contents = out;
  } else {
    contents = buildStub({ industry, label, accent });
  }

  fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(destFile, contents);
  printNextSteps(relPath, business, id);
}

main();
