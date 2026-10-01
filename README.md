# Scroll Hero Animation - ITZFIZZ

This is my frontend assignment where I had to recreate a scroll-driven hero section inspired by a reference car animation. Instead of a car I used a football, kept the same grey background and road layout as the reference, and built all the animations from scratch.

---

## What it does

When you open the page, you see a big letter-spaced heading **W E L C O M E  I T Z F I Z Z** with a tagline below it. Two stat cards (58%, 23%) appear with a folding animation — like they're unfolding out of the road.

As you start scrolling:
- The football rolls across the dark road from left to right
- A green trail fills behind it as it moves
- The heading and first two stat cards fade out
- When the ball gets to the far right, two more stat cards (27%, 40%) fold open below the road
- At the very end, those also fold away

If you scroll back up, everything reverses smoothly — the ball rolls back, text reappears, cards fold back open. That part was actually the trickiest to get right (more on that below).

---

## How I built it

**Stack:** React + Vite + GSAP (ScrollTrigger)

No Tailwind or Bootstrap is being used even though they're in package.json — they were there from the starter template.

### Layout

The hero section is 300vh tall but stays visually "pinned" using CSS `position: sticky`. While you scroll that 300vh, the pinned section doesn't move — instead the GSAP timeline plays through based on how far you've scrolled. This is a common pattern for scroll-driven animations.

The sticky section is split into 3 rows using flexbox:
- **band-top** - headline, tagline, and the first two stat cards
- **road** - the dark strip where the ball rolls (fixed 200px height)
- **band-bottom** - the two lower stat cards and scroll hint

### Animations

**On load (GSAP intro):**
- Headline drops in from above with a fade
- Tagline fades in slightly after
- Stat cards 1 and 2 fold open (scaleY 0 → 1) one after the other

**On scroll (GSAP ScrollTrigger scrub):**
- Everything is tied to scroll position using `scrub: 2`, which adds a small lag so it feels like the ball has real weight
- All tweens are `fromTo` (not just `to`) — this is important because when you scroll back, GSAP needs to know the exact starting value to reverse to. Using `to` alone made the heading disappear when scrolling back to top, `fromTo` fixed it.
- The ball is a single tween from x:-160px to x:120vw — previously I had two separate tweens that overlapped in the timeline which caused a visible jump at mid-scroll. One tween fixed it.

### The CSS transform conflict (ball jumping fast in middle)

The ball's container had `transform: translate(-140px, -60%)` in CSS for initial positioning. When GSAP takes control of the `x` property it writes its own transform and overwrites the CSS one. So at scroll start, the ball was snapping from -140px to 0 instantly — that looked like a jump.

Fix: removed the transform from CSS entirely. Used `margin-top: -70px` for vertical centering instead, and let GSAP handle the horizontal movement starting from `x: -160`.

---

## Folder structure

```
src/
  components/
    Hero.jsx       ← all the animation logic lives here
  index.css        ← all styles, no component-level CSS files
  main.jsx         ← just renders Hero
public/
  ball.jpg         ← the football image
```

---

## Running locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## Reference

Original animation I was inspired by:
https://paraschaturvedi.github.io/car-scroll-animation
