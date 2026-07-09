import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, User } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/my-account")({
  head: () => ({
    meta: [
      { title: "Môj účet — nCc" },
      { name: "description", content: "Prihlásenie a registrácia do nCc — cez email, Google alebo Facebook." },
      { property: "og:title", content: "Môj účet — nCc" },
      { property: "og:description", content: "Prihlásenie a registrácia do nCc." },
    ],
  }),
  component: MyAccount,
});

function MyAccount() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="mx-auto grid max-w-5xl gap-10 px-4 py-14 md:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.5_0.15_155)]">
            Môj účet
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
            {mode === "login" ? "Prihlásenie do nCc" : "Vytvorte si účet nCc"}
          </h1>
          <p className="mt-3 text-muted-foreground">
            Ukladajte overené VIN, získajte prehľad reportov a upozornenia na zmenu histórie
            uložených vozidiel.
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            {[
              "História všetkých overení na jednom mieste",
              "Notifikácie pri novej udalosti v uloženom aute",
              "Zvýhodnené balíky preverení",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2 text-muted-foreground">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-[oklch(0.6_0.18_150)]" />
                <span className="text-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="grid grid-cols-2 gap-1 rounded-xl bg-muted p-1 text-sm font-medium">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-lg px-3 py-2 transition ${
                mode === "login" ? "bg-card shadow" : "text-muted-foreground"
              }`}
            >
              Prihlásenie
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`rounded-lg px-3 py-2 transition ${
                mode === "register" ? "bg-card shadow" : "text-muted-foreground"
              }`}
            >
              Registrácia
            </button>
          </div>

          <div className="mt-5 grid gap-2">
            <SocialButton provider="google" />
            <SocialButton provider="facebook" />
          </div>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            alebo pokračujte emailom
            <span className="h-px flex-1 bg-border" />
          </div>

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            {mode === "register" && (
              <Field icon={<User className="h-4 w-4" />} placeholder="Meno a priezvisko" />
            )}
            <Field icon={<Mail className="h-4 w-4" />} placeholder="Email" type="email" />
            <Field icon={<Lock className="h-4 w-4" />} placeholder="Heslo" type="password" />
            {mode === "register" && (
              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 accent-[oklch(0.5_0.15_155)]" />
                Súhlasím s podmienkami a spracovaním osobných údajov.
              </label>
            )}
            <button
              type="submit"
              className="mt-1 w-full rounded-xl bg-brand py-3 text-sm font-semibold text-brand-foreground transition hover:opacity-95"
            >
              {mode === "login" ? "Prihlásiť sa" : "Vytvoriť účet"}
            </button>
            {mode === "login" && (
              <p className="text-center text-xs text-muted-foreground">
                <a href="#" className="hover:text-foreground">Zabudnuté heslo?</a>
              </p>
            )}
          </form>
          <p className="mt-4 text-[11px] text-muted-foreground">
            Toto je dizajnový náhľad. Skutočné prihlásenie ešte nie je aktívne.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Field({
  icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2.5 focus-within:ring-2 focus-within:ring-ring">
      <span className="text-muted-foreground">{icon}</span>
      <input
        {...props}
        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

function SocialButton({ provider }: { provider: "google" | "facebook" }) {
  const isGoogle = provider === "google";
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
    >
      {isGoogle ? <GoogleIcon /> : <FacebookIcon />}
      Pokračovať cez {isGoogle ? "Google" : "Facebook"}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-4 w-4">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.3l6.7-6.7C35.5 2.4 30.1 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.4 13.7 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.6-4.9 7.3l7.6 5.9c4.4-4.1 7.1-10.1 7.1-17.7z" />
      <path fill="#FBBC05" d="M10.4 28.6c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-7.8-6.1C1 16.5 0 20.1 0 24s1 7.5 2.6 10.7l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.9l-7.6-5.9c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.2-13.5-9.9l-7.8 6.1C6.5 42.6 14.6 48 24 48z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#1877F2">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}