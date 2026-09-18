# Dropblocs — Content Plan

Compacted from a grilling session on 2026-09-18. Same rules as `HANDOFF.md`: treat the
settled decisions as closed unless reopened.

## Settled inputs

| Question | Answer |
|---|---|
| Identity | **One personal channel.** Dropblocs is a storyline inside it, not a separate brand. |
| 90-day goal | **Dropblocs waitlist signups.** Reach is a means, not the metric. |
| Opening series | **"How I'm coding at an agency."** |
| Time budget | **~5 hours/week**, alongside the day job and building Dropblocs. |
| On camera | **Face + screen.** |
| Primary platform | **YouTube long-form** as the source of truth. |
| Waitlist | **Does not exist yet.** |

## The read

Three of those answers collide, and the collisions decide the running order.

**1. The goal has nowhere to land.** "Waitlist signups" is the primary metric and there is no
waitlist. Publishing to a dead link is the single unrecoverable mistake available here — the
launch video is the one that gets the most views it will ever get, and you only publish it
once. The capture page ships before video one, not after.

**2. The opening series needs permission you haven't asked for.** "How I'm coding at an agency"
runs through your employer and their clients. `HANDOFF.md` already draws this line for the
repo — public `madebyshape/craft-cms` starter only, never the internal Shape starter — and
video is a far leakier surface than a repo: a screen recording leaks whatever is in the
tab strip, the sidebar, the Slack notification and the git remote. The series is worth doing
and it is the least-contested angle you have. It is not the thing to start with while the
conversation is still unhad.

**3. "Face + screen" at 5 hours/week has one viable shape.** Picture-in-picture multicam means
syncing two sources and colour-matching them, every video, forever. That is where a weekly
cadence goes to die. The shape that survives is **bookends**: face to camera for the hook and
the payoff, screen-and-voice for the middle. Two separate recordings, no sync, no multicam
timeline. You get the personal-channel benefit exactly where it pays — the first eight seconds.

The resolution: **the first videos are agency-flavoured but use Dropblocs as the subject.**
Same stack, same constraints, same instincts, zero exposure. Every one of them demos the
product thesis as a side effect, which is precisely what a waitlist goal wants. The explicit
agency series lands once permission does.

## Week zero — before any filming

Two blocking items and one cheap one.

1. **Waitlist page live.** One page: the `HANDOFF.md` one-liner ("Drop-in animated UI blocks
   your AI agent can actually use"), one animated block as proof, email capture. Build it from
   `apps/site` — you already have `nav`, `footer`, `section-wrapper` and `buttons-links`, so
   this is mostly wiring an email provider. The site is already the first consumer of the
   system; this is that, plus a form.
2. **Ask the agency.** Frame it as recruiting and profile for them, because it is. Get the
   boundary in writing: can you name them, can you show client work, can you show internal
   tooling. Assume no on the third. The answer changes video five, not videos one to four,
   so this runs in parallel and blocks nothing.
3. **Channel plumbing.** Handle consistent across YouTube and X. Banner, about copy pointing
   at the waitlist, link in bio. An hour, once.

**Park Instagram and TikTok.** They were on the original list, but at 5 hours with a waitlist
goal they are the worst fit available — short-form delivers the lowest-intent audience for a
paid dev tool. They come back as a zero-cost repost of shorts you already cut, never as their
own strategy. **YouTube + X is the pair**: long-form is the artefact, X is the distribution
and the conversation.

## The first five videos

Ordered. Every one ends on the waitlist.

**1. "Getting your design system out of Figma and into your LLM" (Figma MCP)**
Search demand, immediately useful, no permission needed, no product dependency. The worked
example is the Dropblocs Token Layer — colour roles, the duration scale, the four role-named
easings in `packages/tokens`. Viewers get a real technique; the product appears as the thing
being built, never as a pitch. This is the best first video because a stranger gets value
inside thirty seconds and the project is simply visible in the background.

**2. "PRD → plan → the loop: how I actually drive a coding agent"**
Your strongest differentiated material and the hardest to copy, because it is experience
rather than documentation. Dictation vs typing belongs here as a section, not its own video —
it is a tip, not a thesis. Show the real loop running against this repo.

**3. "I watched Claude install an animated block into a Craft CMS site"**
The money video. Per `HANDOFF.md` this is the differentiator — plenty of people post Tailwind
components, almost nobody posts agent-assembly of a motion-first system. It is also the video
most likely to convert a viewer into a signup, because it shows the product doing the thing
the waitlist is promising.
*Depends on:* the first hero block, and the week-one risk test (hand Claude a block plus
manifest, convert HTML→Twig into the `madebyshape/craft-cms` starter). That test is already
action 6 in `HANDOFF.md` — it is now also a content dependency, which is a good reason to
stop deferring it. **If the conversion bet fails, you find out here, cheaply, before you have
built a channel on top of it.**

**4. "The four files that control a coding agent"**
`CLAUDE.md` / `AGENTS.md`, Skills, slash commands, and subagents — collapsed into one video.
Individually each of those is a saturated topic with a dozen competing explainers. Together,
framed as a hierarchy of control, they are not. Use this repo's real files as the examples so
it is a case study rather than a doc-reading.

**5. "How I'm coding at an agency"** — *gated on the permission conversation.*
The series you actually want, in the position where the permission has had four videos' worth
of time to land, and where you have a back catalogue that proves you are worth taking a small
risk on.

### Parked, with reasons

- **"Agentic engineering vs vibe coding"** — a definitions argument. It performs on X as a
  post and underperforms on YouTube as a video. Write it, don't film it.
- **"Who to follow in AI"** — pure reach play, zero waitlist intent, and it ages in weeks.
- **"How to convince your boss to buy you AI subs"** — genuinely good and genuinely on-brand
  for the agency angle. It is video seven, once you have the agency clearance, because the
  credibility comes from being the person who did it.
- **"Coding vacation" / cave week livestream** — a great format and completely wrong for a
  channel at zero. Livestreams need an existing audience or you are talking to nobody for
  eight hours. Revisit at ~1k subs, and it is a superb **launch week** device.
- **"Block built by AI, watch how"** — this is video 3's format, repeated. Once it works,
  it becomes the recurring series and the block-a-day engine from `HANDOFF.md`.

## Setup

You have the two pieces that matter. Don't buy a camera.

**Screen — Screen Studio.** Auto-zoom, cursor smoothing and the built-in motion do the work
that would otherwise be manual editing, which is where the 5-hour budget is actually won. Two
rules:
- **Record at a scaled logical resolution** (around 1512×982), not native 5K. Text that is
  comfortable on your display is unreadable on a phone, and most of your YouTube audience is
  on a phone.
- **Bump your editor and terminal font sizes before recording, not after.** No zoom effect
  recovers unreadable source text.

**Face — iPhone 17 Pro, rear main camera, not the selfie camera.** Shoot **4K at 24 or 30fps**.
The 120fps and ProRes RAW modes are real and irrelevant here: a talking head has no motion
worth 120fps, and 4K120 ProRes needs external storage sustaining 440 MB/s. All you would buy
is a file that chokes your edit.
- Frame **horizontal with headroom** so the same take crops to 9:16 for shorts. Shoot once,
  publish twice.
- Screen Studio can pull in the iPhone recording alongside the Mac screen, so both sources
  land in one project.

**Audio is the actual bottleneck, and the only thing worth spending on.** Viewers forgive soft
focus and leave over bad sound. A phone propped across a room sounds like a phone propped
across a room. Get a wired lavalier into the phone's USB-C and record every take through it —
one audio chain for face and voiceover both, so nothing needs matching in post.

**Lighting: sit facing a window.** Free, and better than a ring light. The only real mistake is
a window *behind* you.

**Don't build an edit pipeline.** Screen Studio exports the screen segments nearly finished;
assemble bookends around them in one editor and stop. Resist colour grading, music beds and an
animated intro — none of them move the waitlist number, and all of them cost you the cadence.

## The weekly five hours

| When | Time | What |
|---|---|---|
| Mon | 30 min | Outline. A bullet spine, never a word-for-word script — reading a script on camera is visible and it is the main reason dev videos feel dead. |
| Tue–Wed | 90 min | Record. Screen first, while the material is in your head. Face bookends last, once you know what the video actually turned out to be. |
| Thu | 2 hrs | Edit. Hard stop. |
| Fri | 60 min | Publish. Cut two shorts from the bookends, post the X thread, repost shorts to IG/TikTok. |

**Cadence: fortnightly long-form to start, weekly on X.** Weekly video is the ambition and it
is the wrong opening promise — first videos reliably take three times the estimate, and the
failure mode here is not a slow channel, it is a stalled product. `HANDOFF.md` already names
daily-content-vs-day-job as a known risk and names batching as the mitigation; this is that
mitigation, applied honestly. Move to weekly when two consecutive videos come in under budget.

## Risks

- **The permission conversation goes badly.** Mitigated by ordering: videos 1–4 stand without
  it, and the fallback is Dropblocs-as-the-agency-project, which nobody can ask you to take
  down.
- **Video 3 is gated on the agent-conversion bet.** Also `HANDOFF.md`'s week-one risk test.
  Run it early — a failure discovered now is cheap, and discovered after the channel is built
  on it, not.
- **Content becomes the reason Dropblocs stalls.** The single most likely failure. If the
  5 hours starts eating build time, cut cadence before cutting build.
- **Everything leaks on screen.** Before every screen recording: close Slack and mail, clear
  the tab strip, check the git remote and the sidebar, use a clean profile. This applies from
  video one, not from the agency series.
