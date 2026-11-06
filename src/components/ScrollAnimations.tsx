"use client";

import { useEffect } from "react";

/**
 * Play-once scroll animations in the style of the reference theme (WOW fadeInUp, GSAP text and
 * image reveals), built on the Web Animations API. element.animate() never touches the class or
 * style attributes React renders, so there is no hydration mismatch. Each animation is cancelled
 * when it ends, leaving the element exactly as the CSS draws it.
 *
 * - Section titles rise up behind a wipe
 * - Eyebrows, kicker lines and intro text fade up, one after another
 * - Cards in grids fade up with a stagger
 * - Large photos and the video open with a curtain reveal
 */

const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_BACK = "cubic-bezier(0.34, 1.4, 0.64, 1)";

const SCOPE = ".page-motion section:not(:first-child)";
const HEADINGS = `${SCOPE} :is(.h-section, .h-block)`;
const TEXT = `${SCOPE} :is(.eyebrow, .t-kicker, .t-lead)`;
const CARDS = `${SCOPE} .grid > :is(article, li, [class*="rounded-2xl"], [class*="rounded-3xl"], [class*="rounded-[20px]"])`;
const MEDIA = `${SCOPE} [class*="aspect-["]`;

type Kind = "heading" | "text" | "card" | "media";

interface Target {
  el: HTMLElement;
  kind: Kind;
  delay: number;
}

const HIDDEN: Record<Kind, Keyframe> = {
  heading: { opacity: 0, translate: "0 48px", clipPath: "inset(0 0 100% 0)" },
  text: { opacity: 0, translate: "0 30px" },
  card: { opacity: 0, translate: "0 50px" },
  media: { opacity: 0, translate: "-100% 0" },
};

/**
 * What an element looks like while it waits to be scrolled to. No clip-path and no big shifts here:
 * IntersectionObserver measures the element as drawn, and a clipped or moved box would never
 * count as "in view".
 */
const HOLD: Record<Kind, Keyframe> = {
  heading: { opacity: 0 },
  text: { opacity: 0 },
  card: { opacity: 0 },
  media: { opacity: 0 },
};

const SHOWN: Record<Kind, Keyframe> = {
  heading: { opacity: 1, translate: "0 0", clipPath: "inset(0 0 0% 0)" },
  text: { opacity: 1, translate: "0 0" },
  card: { opacity: 1, translate: "0 0" },
  media: { opacity: 1, translate: "0 0" },
};

const TIMING: Record<Kind, { duration: number; easing: string }> = {
  heading: { duration: 1000, easing: EASE_OUT },
  text: { duration: 900, easing: EASE_OUT },
  card: { duration: 1000, easing: EASE_BACK },
  media: { duration: 1100, easing: EASE_OUT },
};

function collectTargets(): Target[] {
  const targets: Target[] = [];
  const seen = new Set<HTMLElement>();
  const add = (el: HTMLElement, kind: Kind, delay: number) => {
    if (seen.has(el)) return;
    seen.add(el);
    targets.push({ el, kind, delay });
  };

  document.querySelectorAll<HTMLElement>(`${SCOPE}`).forEach((section) => {
    // Titles and text in reading order, ~0.12 s apart (like data-wow-delay steps)
    let textIndex = 0;
    section.querySelectorAll<HTMLElement>(":is(.eyebrow, .h-section, .h-block, .t-kicker, .t-lead)").forEach((el) => {
      if (!el.matches(`${HEADINGS}, ${TEXT}`) || el.closest(".grid > *")) return;
      add(el, el.matches(".h-section, .h-block") ? "heading" : "text", Math.min(textIndex++, 4) * 120);
    });

    // Cards: stagger by position within their own grid
    section.querySelectorAll<HTMLElement>(".grid").forEach((grid) => {
      let cardIndex = 0;
      grid.querySelectorAll<HTMLElement>(":scope > *").forEach((card) => {
        if (card.matches(CARDS)) add(card, "card", Math.min(cardIndex++, 6) * 130);
      });
    });

    // Big photos / video frames that are not inside a card and clip their picture
    section.querySelectorAll<HTMLElement>(MEDIA).forEach((el) => {
      const cell = el.closest<HTMLElement>(".grid > *");
      if (cell && cell.matches(CARDS)) return;
      if (getComputedStyle(el).overflow !== "hidden") return;
      add(el, "media", 150);
    });
  });
  return targets;
}

/** Curtain reveal: the frame slides in from the left while its picture slides the other way */
function playMedia(el: HTMLElement, delay: number) {
  const { duration, easing } = TIMING.media;
  // Fade the frame's border in early so its box is never seen sliding on its own
  const frame = el.animate([HIDDEN.media, { opacity: 1, offset: 0.12 }, SHOWN.media], {
    duration,
    easing,
    delay,
    fill: "backwards",
  });
  const inner = el.querySelector<HTMLElement>("img, iframe");
  const picture = inner?.animate(
    [
      { translate: "100% 0", scale: "1.2" },
      { translate: "0 0", scale: "1" },
    ],
    { duration, easing, delay, fill: "backwards" }
  );
  frame.onfinish = () => {
    frame.cancel();
    picture?.cancel();
  };
}

function play(target: Target) {
  if (target.kind === "media") return playMedia(target.el, target.delay);
  const { duration, easing } = TIMING[target.kind];
  const animation = target.el.animate([HIDDEN[target.kind], SHOWN[target.kind]], {
    duration,
    easing,
    delay: target.delay,
    fill: "backwards",
  });
  animation.onfinish = () => animation.cancel();
}

export function ScrollAnimations() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof Element.prototype.animate !== "function") return;

    const holds = new Map<HTMLElement, Animation[]>();
    const byElement = new Map<HTMLElement, Target>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          holds.get(el)?.forEach((a) => a.cancel());
          holds.delete(el);
          const target = byElement.get(el);
          if (target) play(target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    // Pages can stream in after this runs (loading state), so scan a few times; known elements are skipped
    const scan = () => {
      collectTargets().forEach((target) => {
        if (byElement.has(target.el)) return;
        byElement.set(target.el, target);
        // Things already on screen stay as they are (no flicker)
        if (target.el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
        // Hold the hidden state until the element scrolls into view
        const hold = [target.el.animate([HOLD[target.kind], HOLD[target.kind]], { duration: 1, fill: "forwards" })];
        holds.set(target.el, hold);
        observer.observe(target.el);
      });
    };
    const frame = requestAnimationFrame(scan);
    const timers = [window.setTimeout(scan, 400), window.setTimeout(scan, 1200)];

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((t) => window.clearTimeout(t));
      observer.disconnect();
      holds.forEach((list) => list.forEach((a) => a.cancel()));
    };
  }, []);

  return null;
}
