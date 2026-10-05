# Fast Eleven — Instagram automation playbook

Instructions for the weekly scheduled run that plans, creates and schedules @fast_eleven Instagram posts with no human in the loop.

## Fixed settings
- Account: Metricool brand `blogId` **7239705** (Instagram `fast_eleven`), timezone `America/Recife`.
- Cadence: **3 posts/week — Saturday 13:00, Sunday 13:00, Wednesday 16:00** (America/Recife). The weekly run (Fridays) fills every slot in the next 7 days: the coming Saturday, Sunday and Wednesday. Never schedule in the past; skip a slot that already has a post (check `getScheduledPosts` and `log.md`).
- Language: **Portuguese (Brazil) only**.
- Drive backup folder id: **1-gYlf1SI-JlVDHXuAorAqmy0mErwGSv1** ("Fast Eleven – Instagram Posts").
- Repos: game code `pedrovinicio/fast-eleven` (read-only, never push), image hosting `pedrovinicio/fast-eleven-website` (`social/` only; never touch other files).

## Goal
Maximise **reach** (people reached, new followers). Optimise for reach, shares and saves first, likes second.

## Each run
0. **Review performance first** — see "Learning loop" below. Its decisions (times, hashtags, topic mix, formats) override the defaults in this file for this run.
1. Clone both repos (shallow). Read `social/log.md` and `social/insights.md` here.
2. Find news: in `fast-eleven`, look at commits since the last run (`git fetch --depth=200` then `git log --since`), plus `ROADMAP/*/_features_*.md` for features marked **Done** that have not been posted yet (check log). Only announce features that are Done/shipped — never "Spec" or "Placeholder" ones.
3. Plan the week's 3 posts with variety. Mix:
   - **Novidade** — a shipped feature not yet posted (max 1–2/week; only if real news exists).
   - **Você sabia?** — a real game fact (13 leagues, 32 clubs/4 divisions, 14 rounds, top-2 promoted/bottom-2 relegated, 11 formations incl. BEST XI, dynamic ratings, manager morale & job offers / being sacked, 18+ achievements, Poisson match engine, stamina, AI managers, multi-save slots, cup, injuries, cards, substitutions…). Verify every fact in the code/ROADMAP before using it.
   - **Engajamento** — a question/poll-style post (e.g. "Qual liga você começa?", "4-3-3 ou BEST XI?", "Divisão 4 até o título: quantas temporadas você leva?").
   Never repeat a topic from the last 6 weeks of `log.md`.
4. **Visual variety (mandatory — the feed must never look repetitive).** Read the layout/theme/background of the last 6 posts in `log.md`, then:
   - The 3 posts of a week use **3 different layouts**, and never the same layout as the previous post.
   - Rotate themes (`dark`, `green`, `yellow`) — max 2 dark per week; at least one `green` or `yellow` every week.
   - Never reuse a background image used in the last 3 posts.
   - At least **one carousel every 2 weeks** (2–5 slides via `"slides"`): e.g. slide 1 hook (hero/card), slides 2–4 one tip/fact each (list/stat/quote), last slide call-to-action. Carousels get re-shown in feeds and tend to reach more people.
   - Match layout to content: `stat` → a number fact (13 ligas, 32 clubes, 14 rodadas, 11 formações, 18 conquistas…); `versus` → A-vs-B polls; `list` → tips/steps; `quote` → "Dica do técnico"/vestiário moments; `card` → challenges/bold statements; `hero` → feature announcements with the matching game art.
   - Record `layout/theme/bg` for each post in the log's Type column (e.g. `Novidade · hero/dark/penalty-bg`).
   Render with `social/tools/make_post.py` (needs Pillow; `FE_ASSETS` = path to `fast-eleven/assets/images/`):
   `python3 make_post.py '<json spec>' out.jpg` (carousel: spec with `"slides": [...]` → out-1.jpg, out-2.jpg…). Keys: `layout` (hero | stat | versus | list | card | quote — see the docstring at the top of the script), `theme` (dark | green | yellow), `bg` (a game image: pitch-bg, penalty-bg, home-hero, scoreboard-bg, stadium-seats-bg, tunnel-bg, locker-bg, bench-bg, select-bg, end-season-bg, job-offer-bg, fired-bg, share-bg, app-bg …png), `bg_y` (0–1 crop), `kicker` (NOVIDADE / VOCÊ SABIA? / SUA VEZ / DICA DO TÉCNICO / DESAFIO / VESTIÁRIO…), `headline` (≤ 9 words, Portuguese), `highlight` (a word/phrase of the headline; its line turns accent-coloured), `sub` (one short sentence); plus `number` (stat), `options` [A, B] (versus), `items` [3–5 strings] (list), `footer` (quote).
   Open the rendered JPG and check it: text legible, nothing cut off, no overlap. Re-render if not.
5. Save to `social/posts/<YYYY-MM-DD>-<slug>/image.jpg` (carousel: `image-1.jpg`, `image-2.jpg`…) + `caption.txt`, append rows to `log.md`, commit and push to `main` (only `social/`). Public URL: `https://raw.githubusercontent.com/pedrovinicio/fast-eleven-website/main/social/posts/<dir>/image.jpg` — confirm it returns 200 before scheduling.
6. Schedule each with Metricool `createScheduledPost` (carousel = several URLs in `media`, in order, with one alt text each): providers instagram, `instagramData.type` POST, `draft` false, `autoPublish` true, media = the raw URL, `mediaAltText` in Portuguese, `isAiGenerated` false.
7. Backup: create one Google Doc per post in the Drive folder titled `<YYYY-MM-DD> — <Tema> (Instagram)` containing publish time, image link, Metricool planner URL and the full caption.
8. Update the uuid column in `log.md`, commit, push.
9. Finish with a short summary (in English) of the 3 scheduled posts: date, topic, first line of caption, planner link. Report problems plainly.

## Learning loop (every run, before planning)
1. Pull data for all posts since the account started (or the last 90 days) with Metricool `getAnalyticsDataByMetrics` (brandId 7239705):
   - posts: `IGPO02` date+time, `IGPO03` content, `IGPO07` type, `IGPO14` reach, `IGPO28` views, `IGPO12` interactions, `IGPO27` shares, `IGPO15` saved, `IGPO08` comments, `IGPO29` follows.
   - hashtags: `IGHT01` hashtag, `IGHT03` posts, `IGHT06` views, `IGHT04` likes, `IGHT05` comments.
   Also call `getBestTimeToPostByNetwork` (instagram, next 7 days, America/Recife).
2. Match each post to its `log.md` row (by date/caption) and record per-post results in `insights.md` → "Results" table (date, weekday, hour, type, topic, hashtag set, reach, views, shares, saves, follows).
3. Decide, and write the reasoning to `insights.md` → "Current decisions" (dated):
   - **Times**: defaults are Sat 13:00, Sun 13:00, Wed 16:00 (Pedro's choice). Only move a slot after ≥ 6 posts of data, and only when Metricool best-time data or results clearly favour another hour **on the same day**. Move by ≤ 3 h per week, keep within 10:00–22:00. Do not change the days themselves — recommend it in the summary instead if the data says so.
   - **Hashtags**: keep `#FastEleven` always. Rotate 2–3 candidate sets (5–8 tags, mixing big generic tags, mid-size niche tags like #JogosDeFutebol, and topic tags); after each set has ≥ 2 posts, favour the set with best reach per post and replace the weakest tags with new candidates. Track sets by letter in insights.
   - **Topics/formats**: give more slots to the content types (Novidade / Você sabia? / Engajamento) and visual styles with the highest reach and shares; keep at least 1 slot/week experimental.
   - Change **at most two variables per week** so results stay attributable. With too little data, say so and keep defaults.
4. Commit `insights.md` with the posts.
5. In the final summary add a 2–3 line "What I learned / what I changed" section, and a recommendation if something needs Pedro (e.g. "Reels would likely triple reach — want me to start making short videos?").

## Caption style
- Portuguese, energetic but not cringe; football-manager vocabulary (escalação, acesso, rebaixamento, mercado, vestiário).
- Hashtags: use the set chosen in `insights.md` → Current decisions.
- Structure: hook line with 1–2 emojis → 2–3 short sentences explaining → a question to drive comments 👇 → "📲 Fast Eleven na App Store e Google Play. Link na bio." → 5–8 hashtags, always `#FastEleven`, plus from: #FutebolManager #ManagerDeFutebol #JogoDeFutebol #Elifoot #JogosMobile #JogosDeFutebol #Brasileirão + one topic tag.
- Never invent features, prices ("grátis"), download numbers, release dates or promotions. Never mention real players' names or club crests/brands.

## Failure handling
- If Metricool rejects a post, retry once; otherwise skip it and report.
- At the start of each run, check last week's posts with `getScheduledPosts` (extendedRange): any with status ERROR (e.g. Instagram's transient "media is not ready") → reschedule it to a free slot in the coming week (or 5 min from now if still timely) and report it.
- If a repo can't be reached, still post evergreen content from this playbook's fact list and report the access issue.
- Never delete or edit posts the run didn't create.
