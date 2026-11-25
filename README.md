# Twitch Live Stream Analytics API — n8n Workflow & MCP Server

Live Twitch streams, channels and clips as flat JSON for AI agents, n8n automations and data pipelines.

- **Apify Actor:** [Twitch Live Stream Analytics API](https://apify.com/structlabs/twitch-live-stream-analytics-api)
- **MCP server:** `https://mcp.apify.com/?actors=structlabs/twitch-live-stream-analytics-api`
- **n8n workflow:** [`n8n/twitch-live-stream-analytics-api-workflow.json`](n8n/twitch-live-stream-analytics-api-workflow.json)
- **Category:** Live streaming analytics
- **Pricing (Gold):** $1.36 per 1,000 rows + $0.05 per 1,000 starts. [Full pricing](https://apify.com/structlabs/twitch-live-stream-analytics-api)

## What it returns

One row per item with `row_type`, `url`, stream fields (`stream_id`, `title`, `viewers_count`, `started_at`, `language`, `broadcaster`), channel fields (`channel_id`, `login`, `display_name`, `followers`, `is_live`, `description`) and clip fields (`clip_id`, `view_count`, `duration_seconds`, `clip_url`).

## Quick start with n8n

1. Download [`n8n/twitch-live-stream-analytics-api-workflow.json`](n8n/twitch-live-stream-analytics-api-workflow.json).
2. In n8n: **Workflows → Import from File**.
3. Add `APIFY_TOKEN` to the n8n environment (Settings → Environment Variables).
4. Open the workflow, adjust the input or schedule, and run once.
5. The HTTP Request node calls `run-sync-get-dataset-items` and returns the rows directly.

## Quick start with Python

```bash
export APIFY_TOKEN=<your-token>
python examples/quickstart.py
```

## Quick start with Node.js

```bash
export APIFY_TOKEN=<your-token>
node examples/quickstart.mjs
```

## Input

```json
{
  "mode": "streams",
  "games": [
    "Just Chatting"
  ],
  "maxItems": 40
}
```

`mode` switches between streams, channels, clips and mixed. An offline channel still returns a row with `is_live: false`. Channel descriptions are masked for emails and phone numbers.

## Sample output

Three real sanitized rows from a published run.

```json
[
  {
    "row_type": "stream",
    "url": "https://www.twitch.tv/k4sen",
    "stream_id": "[phone hidden]",
    "title": "LTK振り返り→ハイゲ練習",
    "viewers_count": 17960,
    "started_at": "2026-11-25T09:53:48Z",
    "language": "JA",
    "stream_type": "live",
    "broadcaster": {
      "id": "44525650",
      "login": "k4sen",
      "display_name": "k4sen",
      "followers": 1048233,
      "account_created_at": "2013-06-09T04:43:03.719974Z",
      "is_partner": true,
      "description": ""
    },
    "game": {
      "id": "509658",
      "name": "Just Chatting"
    },
    "is_live": true,
    "scraped_at": "2026-11-25T11:00:[phone hidden]+00:00"
  },
  {
    "row_type": "stream",
    "url": "https://www.twitch.tv/robcdee",
    "stream_id": "[phone hidden]",
    "title": "Tokyo | Meccha Chameleon IRL | !esim !vpn !yt",
    "viewers_count": 5453,
    "started_at": "2026-11-25T03:29:40Z",
    "language": "EN",
    "stream_type": "live",
    "broadcaster": {
      "id": "[phone hidden]",
      "login": "robcdee",
      "display_name": "robcdee",
      "followers": 371569,
      "account_created_at": "2017-08-10T06:48:46.508983Z",
      "is_partner": true,
      "description": ":] 2nd monitor gang"
    },
    "game": {
      "id": "509658",
      "name": "Just Chatting"
    },
    "is_live": true,
    "scraped_at": "2026-11-25T11:00:[phone hidden]+00:00"
  },
  {
    "row_type": "stream",
    "url": "https://www.twitch.tv/dracon",
    "stream_id": "[phone hidden]",
    "title": "Die Friedrich Merz Fiebertraum Generaldebatte LIVE (im Bundestag)",
    "viewers_count": 3862,
    "started_at": "2026-11-25T07:35:32Z",
    "language": "DE",
    "stream_type": "live",
    "broadcaster": {
      "id": "38770961",
      "login": "dracon",
      "display_name": "Dracon",
      "followers": 93849,
      "account_created_at": "2012-12-26T14:07:28.507881Z",
      "is_partner": true,
      "description": "Man hat hier nie eine gute Zeit, aber viele Informationen. Fast jeden Tag ab ca. 08:45 Uhr (+-30 Minuten) da. Hauptthemen: Energie- und Wirtschaftspolitik. Ich lese die Studien und Gesetzentwürfe, damit du es nicht musst. "
    },
    "game": {
      "id": "509658",
      "name": "Just Chatting"
    },
    "is_live": true,
    "scraped_at": "2026-11-25T11:00:[phone hidden]+00:00"
  }
]
```

## MCP configuration

Copy [`mcp.json`](mcp.json) into your MCP client (Claude Desktop, Cursor, Windsurf):

```json
{
  "mcpServers": {
    "apify-twitch-live-stream-analytics-api": {
      "url": "https://mcp.apify.com/?actors=structlabs/twitch-live-stream-analytics-api"
    }
  }
}
```

## Use cases

- Schedule a daily pull into Google Sheets, Airtable or Postgres.
- Feed an LLM agent with structured rows over MCP instead of scraping HTML.
- Trigger Slack or email alerts when a tracked change appears.

## Notes

- Public, logged-out data only; no cookies, API keys or paywalls.
- No proxy: direct HTTP from Apify.
