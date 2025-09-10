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

## Manage Sites
firebase hosting:sites:list

firebase hosting:sites:delete SITE-ID -f

npm run build 

firebase deploy --only hosting  