"use client";
import { useState } from "react";

type Field = { name: string; label: string; type?: string; textarea?: boolean };
/** Generic form that POSTs JSON to a server route. Shows the server's honest response (including "not configured"). */
export function SignupForm({ endpoint, fields, cta, compact = false }: { endpoint: string; fields: Field[]; cta: string; compact?: boolean }) {
  const [state, setState] = useState<{ status: "idle" | "loading" | "ok" | "error"; msg: string }>({ status: "idle", msg: "" });
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState({ status: "loading", msg: "" });
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = await res.json().catch(() => ({}));
      setState({ status: res.ok ? "ok" : "error", msg: json.message ?? (res.ok ? "Thanks — done." : "Something went wrong.") });
      if (res.ok) (e.target as HTMLFormElement).reset();
    } catch {
      setState({ status: "error", msg: "Network error. Please try again." });
    }
  }
  return (
    <form onSubmit={submit} noValidate={false} className={compact ? "flex flex-col gap-3 sm:flex-row" : "grid gap-4"}>
      {fields.map((f) => (
        <div key={f.name} className={compact ? "flex-1" : ""}>
          <label htmlFor={`${endpoint}-${f.name}`} className={compact ? "sr-only" : "label mb-1 block"}>{f.label}</label>
          {f.textarea
            ? <textarea id={`${endpoint}-${f.name}`} name={f.name} required className="input" />
            : <input id={`${endpoint}-${f.name}`} name={f.name} type={f.type ?? "text"} required placeholder={compact ? f.label : undefined} className="input" autoComplete={f.type === "email" ? "email" : undefined} />}
        </div>
      ))}
      <button className="btn btn-primary" disabled={state.status === "loading"}>{state.status === "loading" ? "Sending…" : cta}</button>
      <p role="status" className={`text-sm ${state.status === "error" ? "text-crimson" : "text-silver"} ${compact ? "sm:basis-full" : ""}`}>{state.msg}</p>
    </form>
  );
}
