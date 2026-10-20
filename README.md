# 🎙️ AI Voice Sales Bot

A website where you can talk to an AI sales agent using your voice, like a real phone call.

**🔗 Live demo:** [https://aa-one-wine.vercel.app/]
*(Open it in Google Chrome. No login needed.)*

---

## What is this project?

This project is an AI sales agent named **Riya**. She sells a made-up software product called **FlowDesk**, a tool that helps small teams manage customers and sales.

You speak to Riya, she listens, understands you, and replies with her voice. Everything happens live in the browser. Nothing is prerecorded.

## What can it do?

- Talk in **English** and **Hindi**
- Show the whole chat as text while you speak
- Start and end calls with a button, a **call timer** and a **status** (Idle, Connecting, Listening, Thinking, Speaking, Ended)
- Ask for your **consent** before recording, and tell you the call is recorded
- **Record** the call and let you play it back
- Write an **AI summary** after the call: what was said, what the customer needs, any worries, and next steps
- Give each call **one sales status**: Converted, Interested, Follow-up Required, Not Interested, Demo Requested or No Response
- Keep a **Call History** with the date, time, status, transcript, summary and recording

## How it works

1. You accept the recording consent and choose a language.
2. You click **Start Call**, and Riya greets you.
3. You speak. The browser turns your voice into text.
4. The AI writes a short reply, and Riya speaks it.
5. She asks about your business, explains only what matters, answers questions like "it's too expensive", and offers a free trial or demo.
6. When you click **End Call**, the app saves the call and creates the summary and status.

## Built with

- HTML, CSS and JavaScript
- Web Speech API (listening and speaking)
- MediaRecorder (call recording)
- IndexedDB (saving call history in your browser)
- Google Gemini AI, called through a secure Vercel function
- Deployed on Vercel

## Project files

- `index.html`: the whole website
- `api/chat.js`: a small server function that talks to the AI, so the secret key stays hidden

## How to run it yourself

1. Get a free API key from [Google AI Studio](https://aistudio.google.com).
2. Put this project in a GitHub repository.
3. Import the repository on [Vercel](https://vercel.com).
4. Add an environment variable named `GEMINI_API_KEY` with your key.
5. Click **Deploy**, then open the link in Chrome.

## Limits you should know

- Works best in **Google Chrome**.
- The recording captures **your microphone only**. Browsers cannot record the bot's voice, so the bot's words are saved in the transcript.
- Call history is saved in **your own browser**, so each person only sees their own calls.
- You cannot interrupt the bot while she is speaking.
- The AI uses a free plan, so many fast calls may hit usage limits.

## Made by

**Ayush**
