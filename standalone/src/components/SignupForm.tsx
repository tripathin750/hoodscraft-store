"use client";
import { useState } from "react";
import { openWhatsApp } from "@/lib/whatsapp";
import { site } from "@/lib/site";

type Field = { name: string; label: string; type?: string; textarea?: boolean };
/** Forms need no server on free hosting: submitting opens WhatsApp with the details prefilled for the store. */
export function SignupForm({ endpoint, fields, cta, compact = false }: { endpoint: string; fields: Field[]; cta: string; compact?: boolean }) {
  const [msg, setMsg] = useState("");
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const lead = endpoint.includes("newsletter") ? `Hi ${site.name}! Please add me to your drop list.` : `Hi ${site.name}!`;
    const body = fields.map((f) => `${f.label}: ${d[f.name]}`).join("\n");
    openWhatsApp(`${lead}\n\n${body}`);
    setMsg("Opening WhatsApp — press send there to reach us.");
    form.reset();
  }
  return (
    <form onSubmit={submit} className={compact ? "flex flex-col gap-3 sm:flex-row" : "grid gap-4"}>
      {fields.map((f) => (
        <div key={f.name} className={compact ? "flex-1" : ""}>
          <label htmlFor={`${endpoint}-${f.name}`} className={compact ? "sr-only" : "label mb-1 block"}>{f.label}</label>
          {f.textarea
            ? <textarea id={`${endpoint}-${f.name}`} name={f.name} required className="input" />
            : <input id={`${endpoint}-${f.name}`} name={f.name} type={f.type ?? "text"} required placeholder={compact ? f.label : undefined} className="input" autoComplete={f.type === "email" ? "email" : undefined} />}
        </div>
      ))}
      <button className="btn btn-primary">{cta}</button>
      <p role="status" className={`text-sm text-silver ${compact ? "sm:basis-full" : ""}`}>{msg}</p>
    </form>
  );
}
