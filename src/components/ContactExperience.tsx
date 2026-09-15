import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowLeft, ArrowRight, Check, AlertTriangle } from "lucide-react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { CONTACT_EMAIL } from "../data/contact";
import { submitContact, type SubmitResult } from "../lib/submitContact";

interface ContactExperienceProps {
  open: boolean;
  onClose: () => void;
}

const PROJECT_TYPES = [
  "BUILD SOMETHING NEW",
  "FIX / IMPROVE SOMETHING",
  "AUTOMATION",
  "AI / DATA",
  "WEB APP",
  "OTHER",
];

const TIMELINES = ["ASAP", "1–2 WEEKS", "THIS MONTH", "EXPLORING"];

const STEPS = ["WHO ARE YOU?", "HOW CAN I HELP?", "WHAT ARE WE BUILDING?", "TIMELINE", "CONTACT"];

const SENDING_MESSAGES = [
  "PACKAGING BRIEF...",
  "VALIDATING INPUT...",
  "ESTABLISHING CONNECTION...",
];

interface FormState {
  name: string;
  projectType: string;
  message: string;
  timeline: string;
  email: string;
  phone: string;
  linkedin: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  projectType: "",
  message: "",
  timeline: "",
  email: "",
  phone: "",
  linkedin: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * A 5-step wizard that collects a project brief and hands it off to the
 * visitor's own email client via a mailto: link — this is a static site with
 * no backend, so "TRANSMIT" can package and validate the brief, but the
 * actual send happens in the visitor's mail client. The final screen is
 * worded to reflect that honestly rather than claiming the message arrived.
 */
export default function ContactExperience({ open, onClose }: ContactExperienceProps) {
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [phase, setPhase] = useState<"form" | "sending" | "done">("form");
  const [sendingIndex, setSendingIndex] = useState(0);
  const [touched, setTouched] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase !== "sending") handleClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, phase]);

  const handleClose = () => {
    onClose();
    // Reset after the exit animation has time to play.
    setTimeout(() => {
      setStep(0);
      setForm(EMPTY_FORM);
      setPhase("form");
      setSendingIndex(0);
      setTouched(false);
      setResult(null);
    }, 400);
  };

  const stepValid = useMemo(() => {
    switch (step) {
      case 0:
        return form.name.trim().length > 0;
      case 1:
        return form.projectType.length > 0;
      case 2:
        return form.message.trim().length >= 10;
      case 3:
        return form.timeline.length > 0;
      case 4:
        return form.email.trim().length > 0 && EMAIL_RE.test(form.email.trim());
      default:
        return false;
    }
  }, [step, form]);

  const goNext = () => {
    setTouched(true);
    if (!stepValid) return;
    setTouched(false);
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };

  const goBack = () => {
    setTouched(false);
    setStep((s) => Math.max(0, s - 1));
  };

  const openMailtoFallback = () => {
    const subject = encodeURIComponent(`New project inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Project type: ${form.projectType}\n` +
        `Timeline: ${form.timeline}\n\n` +
        `Message:\n${form.message}\n\n` +
        `Reply to: ${form.email}` +
        (form.phone ? `\nPhone: ${form.phone}` : "") +
        (form.linkedin ? `\nLinkedIn: ${form.linkedin}` : "")
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const transmit = () => {
    setTouched(true);
    if (!stepValid) return;

    setPhase("sending");
    setSendingIndex(0);

    const runStep = async (i: number) => {
      // The last "step" is the real network call, not just a timed line —
      // it only advances once submitContact actually resolves.
      if (i >= SENDING_MESSAGES.length - 1) {
        setSendingIndex(i);
        const outcome = await submitContact({
          name: form.name,
          projectType: form.projectType,
          message: form.message,
          timeline: form.timeline,
          email: form.email,
          phone: form.phone,
          linkedin: form.linkedin,
        });
        setResult(outcome);
        if (outcome !== "success") openMailtoFallback();
        setTimeout(() => setPhase("done"), reducedMotion ? 60 : 500);
        return;
      }
      setSendingIndex(i);
      setTimeout(() => runStep(i + 1), reducedMotion ? 60 : 650);
    };
    runStep(0);
  };

  const brief = {
    NAME: form.name || "—",
    PROJECT: form.projectType || "—",
    TIMELINE: form.timeline || "—",
    MESSAGE: form.message ? form.message.slice(0, 120) + (form.message.length > 120 ? "…" : "") : "—",
  };
  const briefReady = Boolean(form.name && form.projectType && form.message && form.timeline);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] overflow-y-auto bg-obsidian"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0.05 : 0.35 }}
        >
          <div className="bg-grid absolute inset-0 opacity-20" />

          <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-5 py-10 sm:px-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-graphite-bright sm:text-3xl">
                  INITIALIZE PROJECT
                </h2>
                <p className="mono-label mt-1 text-[11px] text-signal-soft">
                  CONTACT_PROTOCOL // {phase === "form" ? "READY" : phase === "sending" ? "TRANSMITTING" : "COMPLETE"}
                </p>
              </div>
              <button
                onClick={handleClose}
                data-cursor="link"
                aria-label="Close contact experience"
                className="rounded-full border border-obsidian-line p-2 text-graphite-bright transition-colors hover:border-signal/50 hover:text-signal-soft"
              >
                <X size={18} />
              </button>
            </div>

            {phase !== "done" && (
              <div className="mt-8 flex items-center gap-2">
                {STEPS.map((s, i) => (
                  <div key={s} className="flex flex-1 items-center gap-2">
                    <div
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        i <= step ? "bg-signal" : "bg-obsidian-line"
                      }`}
                    />
                  </div>
                ))}
              </div>
            )}
            {phase === "form" && (
              <p className="mono-label mt-2 text-[10px] text-graphite-dim">
                STEP {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")} — {STEPS[step]}
              </p>
            )}

            <div className="mt-10 grid flex-1 gap-10 lg:grid-cols-[1fr_320px]">
              {/* Main step panel */}
              <div className="glass rounded-2xl p-6 sm:p-10">
                <AnimatePresence mode="wait">
                  {phase === "form" && (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: reducedMotion ? 0 : 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: reducedMotion ? 0 : -16 }}
                      transition={{ duration: reducedMotion ? 0.05 : 0.3 }}
                    >
                      {step === 0 && (
                        <div>
                          <label htmlFor="cx-name" className="mono-label text-xs text-graphite-dim">
                            YOUR NAME
                          </label>
                          <input
                            id="cx-name"
                            autoFocus
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            placeholder="Your name"
                            className="mt-3 w-full border-b border-obsidian-line bg-transparent pb-3 font-display text-2xl text-graphite-bright placeholder:text-graphite-dim focus:border-signal focus:outline-none sm:text-3xl"
                          />
                          {touched && !stepValid && (
                            <p className="mt-2 text-xs text-red-400">Tell me your name to continue.</p>
                          )}
                        </div>
                      )}

                      {step === 1 && (
                        <div>
                          <p className="mono-label text-xs text-graphite-dim">HOW CAN I HELP?</p>
                          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {PROJECT_TYPES.map((type) => (
                              <button
                                key={type}
                                onClick={() => setForm((f) => ({ ...f, projectType: type }))}
                                data-cursor="link"
                                className={`rounded-xl border px-4 py-4 text-left text-sm font-medium transition-all ${
                                  form.projectType === type
                                    ? "border-signal bg-signal/10 text-signal-soft"
                                    : "border-obsidian-line text-graphite-bright hover:border-signal/40"
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                          {touched && !stepValid && (
                            <p className="mt-3 text-xs text-red-400">Pick the closest match.</p>
                          )}
                        </div>
                      )}

                      {step === 2 && (
                        <div>
                          <label htmlFor="cx-message" className="mono-label text-xs text-graphite-dim">
                            WHAT ARE WE BUILDING?
                          </label>
                          <textarea
                            id="cx-message"
                            autoFocus
                            value={form.message}
                            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                            placeholder="Describe the problem, idea, product, or completely insane thing you want to build..."
                            rows={6}
                            className="mt-3 w-full resize-none rounded-lg border border-obsidian-line bg-obsidian/60 p-4 text-sm text-graphite-bright placeholder:text-graphite-dim focus:border-signal focus:outline-none"
                          />
                          {touched && !stepValid && (
                            <p className="mt-2 text-xs text-red-400">
                              A few more words — at least a short sentence.
                            </p>
                          )}
                        </div>
                      )}

                      {step === 3 && (
                        <div>
                          <p className="mono-label text-xs text-graphite-dim">TIMELINE</p>
                          <div className="mt-4 grid grid-cols-2 gap-3">
                            {TIMELINES.map((t) => (
                              <button
                                key={t}
                                onClick={() => setForm((f) => ({ ...f, timeline: t }))}
                                data-cursor="link"
                                className={`rounded-xl border px-4 py-4 text-sm font-medium transition-all ${
                                  form.timeline === t
                                    ? "border-signal bg-signal/10 text-signal-soft"
                                    : "border-obsidian-line text-graphite-bright hover:border-signal/40"
                                }`}
                              >
                                {t}
                              </button>
                            ))}
                          </div>
                          {touched && !stepValid && (
                            <p className="mt-3 text-xs text-red-400">Pick a timeline.</p>
                          )}
                        </div>
                      )}

                      {step === 4 && (
                        <div className="space-y-5">
                          <div>
                            <label htmlFor="cx-email" className="mono-label text-xs text-graphite-dim">
                              EMAIL
                            </label>
                            <input
                              id="cx-email"
                              type="email"
                              autoFocus
                              value={form.email}
                              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                              placeholder="you@example.com"
                              className="mt-2 w-full border-b border-obsidian-line bg-transparent pb-2 text-lg text-graphite-bright placeholder:text-graphite-dim focus:border-signal focus:outline-none"
                            />
                          </div>
                          <div>
                            <label htmlFor="cx-phone" className="mono-label text-xs text-graphite-dim">
                              PHONE (OPTIONAL)
                            </label>
                            <input
                              id="cx-phone"
                              type="tel"
                              value={form.phone}
                              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                              placeholder="+92 300 0000000"
                              className="mt-2 w-full border-b border-obsidian-line bg-transparent pb-2 text-lg text-graphite-bright placeholder:text-graphite-dim focus:border-signal focus:outline-none"
                            />
                          </div>
                          <div>
                            <label htmlFor="cx-linkedin" className="mono-label text-xs text-graphite-dim">
                              LINKEDIN (OPTIONAL)
                            </label>
                            <input
                              id="cx-linkedin"
                              type="url"
                              value={form.linkedin}
                              onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
                              placeholder="linkedin.com/in/you"
                              className="mt-2 w-full border-b border-obsidian-line bg-transparent pb-2 text-lg text-graphite-bright placeholder:text-graphite-dim focus:border-signal focus:outline-none"
                            />
                          </div>
                          {touched && !stepValid && (
                            <p className="text-xs text-red-400">A valid email is needed so I can reply.</p>
                          )}
                        </div>
                      )}

                      <div className="mt-10 flex items-center justify-between">
                        <button
                          onClick={goBack}
                          disabled={step === 0}
                          data-cursor="link"
                          className="flex items-center gap-2 text-sm text-graphite-dim transition-colors hover:text-graphite-bright disabled:pointer-events-none disabled:opacity-0"
                        >
                          <ArrowLeft size={14} /> Back
                        </button>

                        {step < STEPS.length - 1 ? (
                          <button
                            onClick={goNext}
                            data-cursor="magnetic"
                            className="flex items-center gap-2 rounded-lg border border-signal/40 bg-signal/10 px-5 py-2.5 text-sm font-medium text-signal-soft transition-colors hover:bg-signal/20"
                          >
                            Next <ArrowRight size={14} />
                          </button>
                        ) : (
                          <button
                            onClick={transmit}
                            data-cursor="magnetic"
                            className="flex items-center gap-2 rounded-lg bg-signal px-6 py-2.5 text-sm font-semibold text-obsidian transition-transform hover:scale-[1.03]"
                          >
                            TRANSMIT PROJECT <ArrowRight size={14} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {phase === "sending" && (
                    <motion.div
                      key="sending"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex min-h-[280px] flex-col justify-center"
                    >
                      <div className="mono-label space-y-3 text-sm">
                        {SENDING_MESSAGES.slice(0, sendingIndex + 1).map((msg, i) => (
                          <motion.p
                            key={msg}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={
                              i === sendingIndex ? "text-signal-soft" : "text-graphite-dim"
                            }
                          >
                            {i < sendingIndex ? "✓ " : "› "}
                            {msg}
                          </motion.p>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {phase === "done" && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex min-h-[280px] flex-col justify-center"
                    >
                      {result === "success" ? (
                        <>
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-signal/40 bg-signal/10">
                            <Check size={20} className="text-signal-soft" />
                          </div>
                          <h3 className="font-display text-2xl font-semibold text-graphite-bright sm:text-3xl">
                            MESSAGE RECEIVED.
                          </h3>
                          <p className="prose-measure mt-3 text-sm text-graphite">
                            I'll get back to you soon at {form.email || "the address you gave"}.
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-300/40 bg-amber-300/10">
                            <AlertTriangle size={20} className="text-amber-300" />
                          </div>
                          <h3 className="font-display text-2xl font-semibold text-graphite-bright sm:text-3xl">
                            BRIEF READY TO SEND.
                          </h3>
                          <p className="prose-measure mt-3 text-sm text-graphite">
                            {result === "error"
                              ? "Couldn't reach the server, so "
                              : "The direct-send backend isn't configured yet, so "}
                            your email client should now be open with this brief addressed to
                            me — hit send whenever you're ready. If nothing opened, email it
                            yourself to{" "}
                            <a
                              href={`mailto:${CONTACT_EMAIL}`}
                              data-cursor="link"
                              className="text-signal-soft underline underline-offset-4"
                            >
                              {CONTACT_EMAIL}
                            </a>
                            .
                          </p>
                        </>
                      )}
                      <button
                        onClick={handleClose}
                        data-cursor="magnetic"
                        className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg border border-obsidian-line px-5 py-2.5 text-sm text-graphite-bright transition-colors hover:border-signal/50 hover:text-signal-soft"
                      >
                        Return to portfolio
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Live project brief */}
              <div className="glass h-fit rounded-2xl p-6">
                <p className="mono-label text-xs text-graphite-dim">PROJECT BRIEF</p>
                <div className="mt-4 h-px w-full bg-obsidian-line" />
                <dl className="mt-4 space-y-4 text-sm">
                  {Object.entries(brief).map(([key, value]) => (
                    <div key={key}>
                      <dt className="mono-label text-[10px] text-graphite-dim">{key}</dt>
                      <dd className="mt-1 break-words text-graphite-bright">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 h-px w-full bg-obsidian-line" />
                <div className="mt-4 flex items-center justify-between">
                  <span className="mono-label text-[10px] text-graphite-dim">STATUS</span>
                  <span
                    className={`mono-label text-[10px] ${
                      briefReady ? "text-signal-soft" : "text-graphite-dim"
                    }`}
                  >
                    {briefReady ? "READY TO TRANSMIT" : "DRAFTING..."}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
