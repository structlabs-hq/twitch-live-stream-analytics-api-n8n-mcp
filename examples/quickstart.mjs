// Run Twitch Live Stream Analytics API on Apify and print the first rows.
const token = process.env.APIFY_TOKEN;
if (!token) throw new Error("Set APIFY_TOKEN first");

const input = {
  "mode": "streams",
  "games": [
    "Just Chatting"
  ],
  "maxItems": 40
};

const response = await fetch(
  "https://api.apify.com/v2/acts/structlabs~twitch-live-stream-analytics-api/run-sync-get-dataset-items",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  },
);
if (!response.ok) throw new Error(`Apify ${response.status}: ${await response.text()}`);
const items = await response.json();
for (const item of items.slice(0, 5)) console.log(JSON.stringify(item).slice(0, 500));
console.log(`${items.length} items`);
