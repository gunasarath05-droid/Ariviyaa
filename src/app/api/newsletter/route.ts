import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const SUBSCRIBERS_FILE = path.join(DATA_DIR, "newsletter-subscribers.json");

function getSubscribers(): NewsletterSubscriber[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(SUBSCRIBERS_FILE)) {
      fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify([], null, 2), "utf8");
      return [];
    }
    const content = fs.readFileSync(SUBSCRIBERS_FILE, "utf8");
    return JSON.parse(content || "[]");
  } catch (error) {
    console.error("Failed to read subscribers file:", error);
    return [];
  }
}

function saveSubscribers(subscribers: NewsletterSubscriber[]): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(subscribers, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Failed to save subscribers file:", error);
    return false;
  }
}

export async function GET() {
  const subscribers = getSubscribers();
  return NextResponse.json({
    success: true,
    count: subscribers.length,
    subscribers,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rawEmail = typeof body?.email === "string" ? body.email.trim() : "";
    const source = typeof body?.source === "string" ? body.source : "Website Footer";

    if (!rawEmail) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rawEmail)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const email = rawEmail.toLowerCase();
    const subscribers = getSubscribers();

    // Check if already subscribed
    const existing = subscribers.find((s) => s.email.toLowerCase() === email);
    if (existing) {
      return NextResponse.json({
        success: true,
        alreadySubscribed: true,
        message: "You are already subscribed to our newsletter!",
      });
    }

    const newSubscriber: NewsletterSubscriber = {
      id: `SUB-${Date.now().toString().slice(-6)}`,
      email,
      subscribedAt: new Date().toISOString(),
      source,
    };

    subscribers.unshift(newSubscriber);
    const saved = saveSubscribers(subscribers);

    if (!saved) {
      return NextResponse.json(
        { success: false, error: "Unable to save subscription. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to our newsletter!",
      subscriber: newSubscriber,
    });
  } catch (error) {
    console.error("Error processing newsletter subscription:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
