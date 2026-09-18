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

## The first six videos

Ordered. Every one ends on the waitlist.

**1. "Getting your design system out of Figma and into your LLM" (Figma MCP)**
Search demand, immediately useful, no permission needed, no product dependency. The worked
example is the Dropblocs Token Layer — colour roles, the duration scale, the four role-named
easings in `packages/tokens`. Viewers get a real technique; the product appears as the thing
being built, never as a pitch. This is the best first video because a stranger gets value
inside thirty seconds and the project is simply visible in the background.

**2. "The business case for an AI subscription at work"** — *gather now, publish on the decision.*
Moved up from parked, because you are living it right now and that is the whole value: a
retrospective on this is advice, a live one is evidence. Show the actual case — seat cost
against hours saved, what you measured, what your finance person asked. It works either way:
a no is the more honest video and the more relatable one.
*Timing:* the publish date belongs to your boss, not you. See **The two asks** below.

**3. "PRD → plan → the loop: how I actually drive a coding agent"**
Your strongest differentiated material and the hardest to copy, because it is experience
rather than documentation. Dictation vs typing belongs here as a section, not its own video —
it is a tip, not a thesis. Show the real loop running against this repo.

**4. "I watched Claude install an animated block into a Craft CMS site"**
The money video. Per `HANDOFF.md` this is the differentiator — plenty of people post Tailwind
components, almost nobody posts agent-assembly of a motion-first system. It is also the video
most likely to convert a viewer into a signup, because it shows the product doing the thing
the waitlist is promising.
*Depends on:* the first hero block, and the week-one risk test (hand Claude a block plus
manifest, convert HTML→Twig into the `madebyshape/craft-cms` starter). That test is already
action 6 in `HANDOFF.md` — it is now also a content dependency, which is a good reason to
stop deferring it. **If the conversion bet fails, you find out here, cheaply, before you have
built a channel on top of it.**

**5. "The four files that control a coding agent"**
`CLAUDE.md` / `AGENTS.md`, Skills, slash commands, and subagents — collapsed into one video.
Individually each of those is a saturated topic with a dozen competing explainers. Together,
framed as a hierarchy of control, they are not. Use this repo's real files as the examples so
it is a case study rather than a doc-reading.

**6. "How I'm coding at an agency"** — *gated on the permission conversation.*
The series you actually want, in the position where the permission has had four videos' worth
of time to land, and where you have a back catalogue that proves you are worth taking a small
risk on.

### Parked, with reasons

- **"Agentic engineering vs vibe coding"** — a definitions argument. It performs on X as a
  post and underperforms on YouTube as a video. Write it, don't film it.
- **"Who to follow in AI"** — pure reach play, zero waitlist intent, and it ages in weeks.
- **"Coding vacation" / cave week livestream** — a great format and completely wrong for a
  channel at zero. Livestreams need an existing audience or you are talking to nobody for
  eight hours. Revisit at ~1k subs, and it is a superb **launch week** device.
- **"Block built by AI, watch how"** — this is video 4's format, repeated. Once it works,
  it becomes the recurring series and the block-a-day engine from `HANDOFF.md`.

## The two asks

The AI subscription and the content permission are two requests to the same person, and it
matters that they do not arrive together.

- **Ask one — budget.** "Can the agency pay for Claude?" A normal workplace business case.
- **Ask two — publishing.** "Can I make videos about how I work here?" A much bigger ask.

Bundle them and you contaminate the ask you actually need now. A budget conversation that
arrives with a YouTube channel attached stops being about cost per seat. **Get the budget
decision first, on its own merits.** The materials you build for it — the spreadsheet, the
before/after timings, your own reasoning — are yours either way, so collect them as you go.
Then, once there is a decision, ask separately whether you can talk about it publicly.

Two framing notes, both on the assumption your boss eventually watches this:

- **Don't call it "convincing your boss."** Call it the business case. "Convince" frames it as
  a trick played on your employer; the useful artefact is the numbers, and the numbers are
  what makes the video worth watching anyway.
- **Don't publish while the decision is pending.** A video narrating a live internal
  negotiation, seen by the other party mid-negotiation, is the worst possible version of this.

## Setup — iPhone 17 Pro

You have both pieces already. Don't buy a camera.

### The one finding that shapes everything

**Screen Studio caps its camera/webcam input at 720p — the screen recording is not limited.**
The two are separate paths and only the camera one is capped. So the obvious workflow — pipe
the iPhone in over Continuity Camera and record face and screen together in one app — throws
away almost all of your camera, while the screen itself is free to go to 4K. Two independent
sources report the camera cap and say the team is working on it; Screen Studio's own docs were
unreachable from here, so confirm it in the app.

This means **never record your face through Screen Studio.** Screen Studio records the screen,
at full resolution. The phone records the face, separately, at full quality. Which is the
bookend structure from earlier — so the tooling forces the same shape the time budget wanted.

### Screen Studio — export settings

Two changes from the defaults, both free.

| Setting | Use | Why |
|---|---|---|
| Format | **MP4** | Correct already. |
| Resolution | **4K** — not 1080p | The big one. YouTube allocates bitrate by the resolution *label*: a 4K or 1440p upload gets a richer VP9/AV1 encode than a native 1080p upload, so **even your 1080p viewers see a cleaner picture**. Testing consistently finds YouTube penalises 1080p uploads hardest. Screen text and UI edges are exactly the detail that compression destroys first. |
| Frame rate | **60** | Correct already. Anything with scrolling, cursor movement or GSAP animation wants 60. |
| Compression | **Studio** — not Social Media | You are feeding a compressor, not a viewer. YouTube re-encodes everything you upload, so pre-compressing means two lossy passes stacked. Screen Studio's own panel says quality **does not affect export speed**, so Social Media costs you quality and buys you nothing but a smaller file. |

**On recording resolution:** set your Mac's *logical* resolution to something large-text
(~1512×982), not native. On a Retina display the capture still happens at 2x underneath, so
you get big readable text **and** near-4K pixels. That is why the 4K export is a real 4K
export and not an upscale. Bump editor and terminal font sizes too, before recording.

These are the *Quick export* settings. Check the full export dialog matches before uploading
a master.

### Camera app — install Blackmagic Camera (free)

Both serious options are free: **Blackmagic Camera** and Apple's **Final Cut Camera**.

- **Blackmagic Camera** gives finer control, proper audio metering and an RGB histogram. Recent
  versions added iPad compatibility, remote camera control and multiview.
- **Final Cut Camera** is simpler, and its real selling point is Live Multicam — up to four
  devices controlled from an iPad running Final Cut Pro. Irrelevant for one talking head.

**Take Blackmagic**, for one reason that actually matters: **locked white balance and exposure**.
Your bookends are two clips recorded twenty minutes apart that must cut together invisibly. The
stock Camera app will quietly drift between them and there is no fixing that later.

### Settings

| Setting | Value | Why |
|---|---|---|
| Resolution | 4K | Crop room for reframing and for 9:16 shorts. |
| Frame rate | **30fps if daylight, 25fps if artificial** | See below — this is the one setting your test shoot exists to settle. |
| Shutter | Double the frame rate (1/60 at 30fps, 1/50 at 25fps) | The 180° rule. Natural motion blur. |
| ISO | Lowest you can get away with, **locked** | Auto ISO pumps mid-sentence. |
| White balance | Manual, ~5600K if window-lit, **locked** | The bookend-matching problem above. |
| Codec | **HEVC**, not ProRes | ProRes 4K is enormous and buys you nothing you'll use. |
| Log / ProRes RAW | **Off** | See below. |
| Lens | Main 1x | The ultrawide and telephoto are visibly worse. Don't zoom — move the tripod. |

**Skip Log 2 and ProRes RAW**, even though the 17 Pro is the first phone to do them. Log is
flat footage that *requires* a grading pass to look like anything. That is a mandatory extra
step in every edit forever, in exchange for latitude you do not need on a face sitting still
in controlled light. Same for 4K120 — a talking head has no motion worth 120fps, and 4K120
ProRes needs external storage sustaining 440 MB/s. These features are real and they are for a
different job than yours.

### Frame rate — the one thing that needs testing

Earlier I said 25fps, flatly, because UK mains is 50Hz and 30fps under artificial light bands.
That was too broad, and it matters because it collides with the screen footage.

The maths: your screen records at **60fps**, so the project timeline is 60fps, and face footage
has to divide into it cleanly. **30fps divides into 60 exactly** — every frame shown twice, no
judder. **25fps does not** (60 ÷ 25 = 2.4), so it judders slightly on a talking head. To use 25
you would have to run the whole project at 50, and then the screen has to export at 50 too.

So 30fps is what you want, and the only thing standing in its way is flicker — which **only
happens under artificial light.** Daylight from a window does not flicker at all. Most modern
LED bulbs don't either; the ones that band are cheap dimmed LEDs and fluorescent tubes.

**This is the single most valuable thing your test shoot answers.** Shoot ten seconds at 30fps
with your actual room lights on, in the spot you'll actually film in, and look for rolling
bands. Then:

- **No banding** → 30fps everywhere, 1/60 shutter, project at 60. Everything divides. Done.
- **Banding** → either swap the bulb (cheapest fix by far), or drop to 25fps with a 1/50
  shutter and run the project at 50.

Given you have a day job, most of your filming will be evenings under artificial light — so
test under the lights you'll actually use, not on a bright Saturday morning.

### Front or rear camera — actually test this

Standard advice is rear camera, and on quality it is still right. But the 17 Pro changed the
maths: the front camera is now an **18MP square sensor with Center Stage**, which auto-frames
you and **switches to landscape without you rotating the phone**.

The rear camera's problem for a solo creator has always been that you cannot see your framing.
The front camera now solves that and is finally good enough to be a real option. **Shoot the
same thirty seconds on both in week one and look at them on a phone.** If you can't tell the
difference at shorts size, take the one that lets you see yourself — the framing you can check
beats the sensor you can't.

### Audio — the only thing worth spending money on

**DJI Mic Mini, around $79.** USB-C receiver straight into the phone, ~48h with the charging
case, built-in noise cancelling. The **RØDE Wireless Micro** is the close alternative with the
same shape. Either beats the phone mic by a margin nobody will miss.

The workflow point: **the same receiver moves to your Mac's USB-C for Screen Studio voiceover.**
One mic for face and screen segments both, so the two halves of every video already match and
nothing needs fixing in post. Record it into the phone so audio is embedded in the video file —
no clapper, no sync, ever.

### Teleprompter — probably don't

You're shooting a bullet spine, not a script, so a prompter for the body would undo the point.
The one place it helps is the hook, where the first eight seconds decide everything.

**PromptSmart** is the one to look at if you want it — its VoiceTrack listens and scrolls at
your pace, which avoids the dead-eyed read that kills most prompter footage. Honestly though:
your hook is two sentences. Learn it. Cheaper than another app.

### Everything else

- **Mount:** a small tabletop tripod plus a MagSafe or clamp mount. Any of them. At eye level,
  which almost always means higher than you think.
- **Transfer:** wired USB-C to the Mac. AirDrop is fine for a short clip and miserable for 4K.
- **Don't buy:** a ring light (sit facing a window), a gimbal (you are sitting still), a second
  camera, or an external SSD (you're not shooting ProRes).

### Phone — one-time setup

Do this once, before the test shoot.

- [ ] Install **Blackmagic Camera** (free, App Store).
- [ ] Buy a **DJI Mic Mini** or RØDE Wireless Micro, and a small tripod with a phone mount.
- [ ] Settings → General → Storage: clear **at least 30GB**. 4K fills a phone fast and a
      recording that stops at the good bit is the most annoying way to lose a take.
- [ ] Settings → Display & Brightness → **Auto-Lock: Never**, so the screen doesn't sleep while
      you're setting up a shot.
- [ ] Settings → Focus: set up a **Do Not Disturb** mode you can one-tap before every take.
- [ ] In Blackmagic Camera, build a preset: **4K · 30fps · 1/60 shutter · HEVC · Log OFF ·
      main 1x lens**, ISO and white balance switched to manual so they can be locked.
- [ ] Plug the mic receiver into the phone's USB-C and confirm Blackmagic is showing **its**
      audio meters, not the phone's built-in mic.
- [ ] Record 10 seconds each on **front and rear** cameras for the comparison test.

### Per-shoot checklist

1. **Do Not Disturb on** (not just silent) — a call kills a take, and the mic is on USB-C, so
   Bluetooth toggles won't save you.
2. **Lock ISO and white balance**, and check they held if you reset between setups.
3. **Ten seconds of test footage, played back on headphones**, before the real take. This
   catches the dead mic, which is the one mistake that costs you the whole shoot.
4. **Check the frame**: eye level, window in front of you, head not cropped, room for a 9:16
   crop later.
5. **Screen hygiene** before any screen recording: Slack and mail closed, tab strip cleared,
   git remote and sidebar checked, notifications off on the Mac too.
6. **Check free space** on the phone. Again. It's always this.

## The test shoot

Before any real video, do a throwaway run whose only job is to prove the settings. Publishing
nothing, keeping nothing.

**Shoot the page transitions block.** It is the fifth and last foundation piece in
`HANDOFF.md`, it is real work you owe the project anyway, and it is not on the publishable
path — so a ruined take costs nothing. It is also exactly the format video 4 will use, which
means you are rehearsing the thing that matters while you test.

**Structure it as a real video, short.** Roughly five minutes total: face to camera for a
~20-second hook, screen recording of the actual build with voiceover, face again for a
~20-second outro. Doing the full bookend shape is the point — a screen-only test proves half
of what you need.

### What the test has to answer

| # | Question | How you check it |
|---|---|---|
| 1 | **Does your room flicker at 30fps?** | Ten seconds under your normal evening lights. Look for rolling horizontal bands. Settles 30 vs 25 for good. |
| 2 | **Front or rear camera?** | Same 20 seconds on each. View both **on a phone**, not the Mac. If you can't tell, take the front one — being able to see your framing is worth more than a delta you can't see. |
| 3 | **Is the audio actually clean?** | Headphones, whole take. Listen for room echo, clothing rustle on the lav, and the fan under your desk you've stopped hearing. |
| 4 | **Do the bookends cut together?** | Drop face-in and face-out on one timeline. Any jump in colour or brightness means exposure or white balance drifted and needs locking harder. |
| 5 | **Is screen text readable on a phone?** | Export, put it on your phone, hold it at arm's length. If you squint, your logical resolution or font size is wrong — and this is the single most common failure in dev video. |
| 6 | **How long did the edit actually take?** | Time it honestly. This calibrates whether fortnightly is right, or whether you need to simplify before video one. |

### Then

Write the answers into the **Settings** table above so it becomes your real preset rather than
my recommendation. Anything the test contradicts, the test wins.

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
