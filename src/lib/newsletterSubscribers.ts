export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
}

export const NEWSLETTER_STORAGE_KEY = "ariviya-newsletter-subscribers";

export function loadLocalSubscribers(): NewsletterSubscriber[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function subscribeToNewsletter(
  email: string,
  source = "Website Footer"
): Promise<{ success: boolean; message: string; alreadySubscribed?: boolean }> {
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmed)) {
    return { success: false, message: "Please enter a valid email address." };
  }

  // 1. Try sending to the Next.js API route (persists to server JSON file)
  try {
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: trimmed, source }),
    });

    const data = await response.json();

    if (data.success) {
      // Also cache in localStorage for instant offline access and demo sync
      try {
        const localList = loadLocalSubscribers();
        if (!localList.some((s) => s.email.toLowerCase() === trimmed)) {
          const newEntry: NewsletterSubscriber = data.subscriber || {
            id: `SUB-${Date.now().toString().slice(-6)}`,
            email: trimmed,
            subscribedAt: new Date().toISOString(),
            source,
          };
          localStorage.setItem(
            NEWSLETTER_STORAGE_KEY,
            JSON.stringify([newEntry, ...localList])
          );
        }
      } catch {
        // Ignore localStorage quota errors
      }

      return {
        success: true,
        message: data.message || "Thank you for subscribing!",
        alreadySubscribed: data.alreadySubscribed,
      };
    } else {
      return {
        success: false,
        message: data.error || "Unable to subscribe at this moment.",
      };
    }
  } catch (error) {
    // 2. Fallback to localStorage if API is unreachable
    console.warn("API route unavailable, storing in localStorage:", error);
    try {
      const localList = loadLocalSubscribers();
      if (localList.some((s) => s.email.toLowerCase() === trimmed)) {
        return {
          success: true,
          alreadySubscribed: true,
          message: "You are already subscribed to our newsletter!",
        };
      }

      const fallbackEntry: NewsletterSubscriber = {
        id: `SUB-${Date.now().toString().slice(-6)}`,
        email: trimmed,
        subscribedAt: new Date().toISOString(),
        source,
      };
      localStorage.setItem(
        NEWSLETTER_STORAGE_KEY,
        JSON.stringify([fallbackEntry, ...localList])
      );
      return {
        success: true,
        message: "Thank you for subscribing to our newsletter!",
      };
    } catch {
      return {
        success: false,
        message: "Could not save your subscription. Please try again.",
      };
    }
  }
}
