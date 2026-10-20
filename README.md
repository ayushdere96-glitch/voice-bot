# FlowDesk AI Voice Sales Bot
Static page (index.html) + one serverless function (api/chat.js). Key stays on the server.
## Deploy (Vercel, no login needed for visitors)
1. Put this folder in a GitHub repo (or run `npx vercel` inside it).
2. Import it at vercel.com/new. No build settings needed.
3. Add env var GEMINI_API_KEY (free key from aistudio.google.com; optional MODEL). Redeploy.
4. Open the https://....vercel.app URL in Chrome and test one full call.
## Notes
Chrome required (Web Speech API). Recording is mic-only; bot voice uses browser speechSynthesis. History is stored in IndexedDB.
