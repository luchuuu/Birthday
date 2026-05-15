# Birthday Experience — Mobile-First Interactive Journey

> **Date:** 2026-05-15  
> **Repository:** `luchuuu/birthday`

This document is the **single source of truth** for the full experience, structure, tone, interactivity, and implementation guidance for the mobile-first cinematic birthday website.

---

## 0) Project Intent (Non‑Negotiables)
- This is **not** a scrapbook, slideshow, or memory gallery.
- **No cheesy romance**, no heart overload, no timeline.
- The experience must feel **mysterious → intimate → celebratory → soft ending**.
- Writing is **short, honest, restrained**, with **emotional pacing**.
- **Mobile-first** (portrait, thumb-friendly, smooth 60fps).
- Design is **premium, cinematic, minimal**.

---

## 1) Emotional Arc (Pacing)
1. Mystery
2. Realization
3. Discovery
4. Warmth
5. Emotional Depth
6. Surprise/Interruption
7. Celebration
8. Quiet Ending

**Total runtime:** ~15–20 minutes with full exploration.

---

## 2) Global Style Guide
**Colors**
- Backgrounds: deep navy, near-black, soft purple gradients
- Later sections: warm gold highlights + subtle amber glow

**Typography**
- Emotional lines: elegant serif
- UI/labels: clean sans-serif

**Motion**
- Smooth, slow fades and gentle upward drift
- Avoid bouncy or aggressive animations
- Use particles, glow, blur, and soft light orbs

**Audio**
- No autoplay at first load (start on first user tap)
- Subtle cinematic instrumental (Akuma no Ko–like mood)
- Soft, premium SFX (quiet)
- Always-on mute toggle

---

## 3) Tech Stack
- **Next.js / React**
- **Tailwind CSS**
- **Framer Motion**
- Canvas/SVG particles + glow
- Web Audio / Howler.js
- localStorage for progress + wish

---

## 4) Flow Controller
**Single flow controller** manages:
- Page progression
- WordSpace state
- Flashlight discoveries
- Wish storage
- Audio state
- Mute state
- Reduced motion preference

Use `localStorage` to persist progress and restore on refresh.

---

# PAGE‑BY‑PAGE SPEC

## Page 1 — Preloader
**Purpose:** Suspense + anticipation

**Behavior**
- 0% → 99% over ~10 seconds
- Stuck at 99% for ~20 seconds
- Then 100% → “Access Granted”

**Visuals**
- Black screen
- Subtle particles
- Terminal scanlines + flicker

**Text**
- “Initializing”
- “Access Granted”

**Notes**
- Cannot skip
- Subtle typing/beep SFX

---

## Page 2 — Entry / Access
**Purpose:** Mystery + invitation

**Text sequence**
1. “This is for that one only person in my life”
2. “If you’re reading this...”
3. “Then it reached the right person”
4. “Welcome, the Chosen One”
5. “Enter”

**Interaction**
- Tap to reveal each line
- “Enter” appears with 3rd line
- Start music here on first tap

---

## Page 3 — Realization
**Purpose:** Slow emotional shift

**Text sequence**
1. “Some people become memorable instantly”
2. “But you didn’t”
3. “It happened slowly”
4. “Then somehow, someway you became someone precious”
5. “Strange how that works”

**Style**
- Subtle warm shift in background
- Each line fades in with gentle upward motion

---

## Page 4 — Word Space
**Purpose:** Emotional discovery

**Words**
- The Charger
- The Comforter
- The Joke
- The Peace
- The Supporter
- La Passion
- Energy
- Lust
- **Love** (locked until all others opened)

**Reveal messages**
**The Charger**
“Your encouragement carries me more than you realize.
My life revolves around your sweet, encouraging, supporting, and high-spirited motivation.
You give me the energy to keep going.”

**The Comforter**
“I never have a truly bad day because of you.
At the end of everything, even if the world is collapsing, I know I can come to you.
You’ll comfort me while holding my hand, hovering my hair, and giving forehead kisses.
That is peace to me.”

**The Joke**
“No matter how hard life gets, you still make me laugh.
Usually by doing something dumb.
Or saying something even dumber.
That’s cute of you ::)”

**The Peace**
“Whether life clashes inside home with family or outside with so-called friends,
you are the safe space that gives me peace.
You feel like the one place I can breathe.”

**The Supporter**
“You are that one bina betone emotional support that carried me through sadness,
through depressed moments,
through down-bad moments,
and through the happy moments that felt like eternity.”

**La Passion**
“The dangerous thing about you is your passion.
The way you feel things deeply.
The way your energy enters a room.
The way you make everything feel more alive.”

**Energy**
“You bring life into moments without even noticing.
Conversations feel different with you.
Even ordinary days feel brighter when you are around.”

**Lust**
“I don’t know what you did to my body.
But this thing (5'2) stands for you way harder than anything.
To a level that it starts drooling for more.”

*Small, transparent text below:*
“One touch is all it takes :))”

**Love** (unlock only after all others)
“You know what it was all along.”

**Interaction**
- Tap words to reveal message card
- Soft glow + expand animation
- Love appears only after all opened

---

## Page 5 — Darkness Flashlight
**Purpose:** Intimate hidden discovery

**Interaction**
- Touch/drag to reveal circular light area
- Messages only visible in light
- Messages stay unlocked after found

**Hidden lines**
- “You stayed.”
- “Your presence lingers.”
- “You feel familiar.”
- “I look for you naturally.”
- “You became part of my routine.”
- “You calm my mind.”
- “You make silence feel full.”
- “You softened difficult days.”
- “I think about you constantly.”
- “You feel like home.”
- “That’s rare.”
- “So are you.”

---

## Page 6 — Emotional Text (Build)
**Purpose:** Begin emotional core

**Text sequence**
1. “I don’t think I tell you enough how much you actually mean to me.”
2. “Some days are messy and exhausting.”
3. “But then I talk to you and everything feels a little lighter.”
4. “You’ve become the person I want to tell everything to.”
5. “The good things.”
6. “The stupid things.”
7. “Even the things I keep bottled up from everyone else.”
8. “I love the little things about you more than anything.”
9. “The way you talk.”
10. “The way you get annoyed.”
11. “Your random moods.”
12. “Your smile when you’re genuinely happy.”
13. “Being loved by you feels different.”
14. “Safe.”
15. “Real.”
16. “And honestly, I’m scared of losing you sometimes.”
17. “Because I know people like you don’t come twice in life.”
18. “You’ve become such an important part of my days that I can’t imagine them feeling the same without you in them.”
19. “I just want you to know that no matter how life gets, my feelings for you are real.”
20. “Like FR FR FR FR.”

---

## Page 7 — (REMOVED)
**Do not include a “Things about you” page or heart mini-game.**

---

## Page 8 — Interruption / Error
**Purpose:** Surprise / reset pacing

**Text sequence**
- “ERROR”
- “Missing file detected”
- “Opening /why_you_matter”

**Behavior**
- Glitch flicker + static sound
- Tap to open folder `/why_you_matter`

---

## Page 9 — Core Message (Climax)
**Purpose:** Emotional center

**Same text as Page 6**, but slower, heavier, minimal background movement. Use tap to advance. Longer pauses before key lines.

---

## Page 10 — Birthday Page
**Purpose:** Celebration

**Text sequence**
- “Tonight belongs to you.”
- “The universe rotated perfectly to create this day.”
- “And I’m really glad it did.”
- “Happy Birthday”
- **[Her Name]**

**Visuals**
- Warmer gradient
- Gold particles
- Soft glow

---

## Page 11 — Digital Gift Box
**Purpose:** Playful reveal

**Interaction**
- Tap gift box to unwrap (3–4 layers)

**Text sequence**
1. “Still here?”
2. “Good.”
3. “Because there’s one last thing waiting for you.”
4. “Ready?”

**Final button**
- “Open Final Gift”

---

## Page 12 — Cake + Wish
**Purpose:** Interactive centerpiece

**Interaction**
- Request microphone permission on tap
- Detect blow amplitude → candle out
- Fallback: “Microphone unavailable. Tap to blow instead.”

**After candle out**
- Confetti shimmer
- Smoke puff
- Subtle vibration

**Wish input**
- Label: “Write your wish”
- Store in localStorage or backend
- After submit:
  - “Wish recorded successfully”
  - “Wish received”
  - “Some wishes deserve protection”

---

## Page 13 — Final Message
**Purpose:** Emotional closure

**Text sequence**
1. “Some people change lives loudly.”
2. “You didn’t.”
3. “You changed mine quietly.”
4. “And somehow that mattered even more.”
5. “Happy Birthday.”
6. **[Her Name]**
7. “Thank you for existing.”

---

## Page 14 — End Screen
**Purpose:** Fade to black

- Minimal black screen
- Particles fade away
- Music fades out
- Optional small line: “Thank you for staying.”

---

# Implementation Checklist
- [ ] Framer Motion transitions on every page
- [ ] Background particle system (Canvas/SVG)
- [ ] Global music with per-section fades
- [ ] Always-visible mute toggle
- [ ] localStorage progress restore
- [ ] Flashlight page pointer tracking
- [ ] WordSpace unlock logic
- [ ] Microphone flow + fallback
- [ ] Reduced-motion support

---

# Component Map
- Preloader
- EntryPage
- RealizationPage
- WordSpacePage
- FlashlightPage
- EmotionalTextPage
- ErrorInterruptionPage
- CoreMessagePage
- BirthdayPage
- GiftBoxPage
- CakePage
- FinalMessagePage
- EndScreen

---

# Accessibility
- Large tap targets
- High contrast text
- Prefer reduced motion if enabled
- No hover-only interactions

---

# Final Emotional Goal
By the end, she should feel:
- emotionally seen
- appreciated
- deeply thought about

The experience should feel **personal, cinematic, restrained, and unforgettable**.
