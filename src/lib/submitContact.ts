export interface ContactSubmission {
  name: string;
  projectType: string;
  message: string;
  timeline: string;
  email: string;
  phone: string;
  linkedin: string;
}

export type SubmitResult = "success" | "not_configured" | "error";

// Web3Forms access keys are meant to ship in client-side code (they only
// authorize submissions to your inbox, they aren't a secret credential),
// so it's safe for this to be a public VITE_ env var baked into the bundle.
// See README.md for how to get one and where to put it.
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

/**
 * Submits the project brief to Web3Forms, which forwards it to the site
 * owner's inbox — no custom server required. Returns "not_configured" when
 * no access key has been set up yet (so the caller can fall back to a
 * mailto: link) and "error" on a network/API failure, so the UI never has
 * to claim a message was received when it wasn't.
 */
export async function submitContact(data: ContactSubmission): Promise<SubmitResult> {
  if (!ACCESS_KEY || ACCESS_KEY === "CONFIGURE") {
    return "not_configured";
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: `New project inquiry from ${data.name}`,
        from_name: data.name,
        name: data.name,
        email: data.email,
        phone: data.phone || undefined,
        linkedin: data.linkedin || undefined,
        project_type: data.projectType,
        timeline: data.timeline,
        message: data.message,
        // Honeypot field: real visitors never fill this in. Web3Forms
        // silently discards submissions where it's non-empty.
        botcheck: "",
      }),
    });

    if (!res.ok) return "error";
    const json = await res.json().catch(() => null);
    return json?.success ? "success" : "error";
  } catch {
    return "error";
  }
}
