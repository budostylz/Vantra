## PressureWashing

## JavaScript to React State Automation - Flow Programming
 a. Use main.js or other JavaScript files as a reference

 
 ## Features
 [Features](https://chatgpt.com/share/e/68beeb3a-3228-8009-a543-0e7e37bbb437)

🔍 Smart Site Walkthrough + AI Estimator - /walkthrough
💰 On-Site Pricing Calculator - /calculator
🧾 Real-Time Quote Generator - /generator
📃 Smart Contract Builder - contract
📸 Photo Documentation + Job History - photodocsandhistory
🧠 AI-Driven CRM - crm
🎙️ Voice Notes + Observations - voiceandobservations



## Smart Site Walkthrough

* Debris + Materials
curl -s -X POST \
  -H "Authorization: Token $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Prefer: wait" \
  -d $'{
    "version": "adirik/grounding-dino:efd10a8ddc57ea28773327e881ce95e20cc1d734c589f7dd01d2036921ed78aa",
    "input": {
      "image": "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/canvasAssets/GLelFyrkvyMnLPTfOFY2xS6QT3t2/asset_01e55144-64f1-48df-b07c-5e31b0954018.jpg",
      "query": "garage door, front door, window, exterior light, roof, gutter, driveway, shrub, tree, porch, house number, mailbox",
      "box_threshold": 0.25,
      "text_threshold": 0.25,
      "show_visualisation": true
    }
  }' \
  https://api.replicate.com/v1/predictions

curl -s -X POST \
  -H "Authorization: Token $REPLICATE_API_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Prefer: wait" \
  -d $'{
    "version": "adirik/grounding-dino:efd10a8ddc57ea28773327e881ce95e20cc1d734c589f7dd01d2036921ed78aa",
    "input": {
      "image": "https://storage.googleapis.com/budoapps-5aacf.firebasestorage.app/canvasAssets/GLelFyrkvyMnLPTfOFY2xS6QT3t2/asset_01e55144-64f1-48df-b07c-5e31b0954018.jpg",
      "query": "dirt",
      "box_threshold": 0.25,
      "text_threshold": 0.25,
      "show_visualisation": true
    }
  }' \
  https://api.replicate.com/v1/predictions


* Auto Measure
[8th Wall](https://www.8thwall.com/docs/api)

[XR8](https://www.8thwall.com/docs/api/engine/xr8/)

https://budoboost.8thwall.app/prod/

What you’ve already got

Tap-drag to place a world-space rectangle on a detected plane.

Live width × length in meters/feet + area (m²/ft²).

Pricing breakdown (labor + base + extras) with unit toggle.

Fast polish for the client demo

Lock / Save: add a “Save” button to freeze the current rectangle into a list, then show subtotals + grand total.

Undo / Reset: one-tap clear of the active rectangle or all saved ones.

Screenshot: capture a photo with the overlay and numbers for the quote.

Editable rates: tiny settings panel (rate, base, extras, currency) stored in localStorage.

Snap/straighten: hold a modifier (or long-press) to square edges to the plane axes for crisp rectangles.

Accuracy helper: show a “Move phone in a slow arc” hint until plane tracking stabilizes.

Simple hooks to add next

Save the current measurement

Keep an array saved: {w:number,l:number,area:number,total:number}[].

On “Save”, push the latest last and recompute totals.

Export

Build a CSV/JSON string and open a data URL so they can download or share.

Production readiness checklist (8th Wall)

Confirm Entry Space = Tap Place, Auto Update = on, and you’re publishing the latest commit in the Publish dialog.

Open the public URL in a fresh tab (no query cache), and hard-refresh on iOS Safari (long-press reload → “Reload Without Content Blockers”) if numbers look stale.

Test on iOS Safari and Android Chrome with good lighting and visible floor texture.

Accuracy note (what to tell the client)

With a flat, well-tracked floor and a short arc motion to initialize, expect ~1–3% error for rectangles sized a few meters across. Highly glossy/textureless floors or very oblique angles can increase error—do a short “N” or circle motion to re-lock tracking.

If you want, I can add “Save / Export / Screenshot / Settings” into your current file in one pass.

## Manage Sites
firebase hosting:sites:list

firebase hosting:sites:delete SITE-ID -f

npm run build 

firebase deploy --only hosting  