# Mallary Plugin for ChatGPT and Codex

Use Mallary inside ChatGPT and Codex to run your social media workflow in one place.

Version 1.0.1 connects to Mallary's dedicated OAuth-only OpenAI MCP server at `https://mallary.ai/mcp/openai`. It includes focused skills for publishing, comments, post analytics, and audience counts.

## What You Can Do

- See your Mallary profiles and connected social accounts.
- Draft one post for many platforms.
- Use a different caption for each platform.
- Use one social image that you choose or make in ChatGPT.
- Create or schedule a post when you ask for that result.
- Check publish status, social post IDs, and public post links.
- Read comments and post a requested reply.
- Review post analytics by platform.
- Review follower and subscriber counts for connected accounts.

The OpenAI endpoint does not expose settings, webhooks, profile changes, platform disconnects, or post deletion.

## Tools

The OpenAI endpoint exposes only:

- `mallary_upload_image`
- `mallary_create_post`
- `mallary_get_job`
- `mallary_list_posts`
- `mallary_list_comments`
- `mallary_reply_to_comment`
- `mallary_get_analytics`
- `mallary_get_audience`
- `mallary_list_profiles`
- `mallary_list_platforms`

## OAuth, Not API Keys

The plugin uses Mallary OAuth. The user signs in to Mallary in a browser and approves access to view, publish, reply, and review results.

Do not ask users to paste credentials into a prompt. The plugin must not request or reveal OAuth tokens, social account credentials, passwords, API keys, payment details, or provider debug data.

## Safety

Publishing, replying, and uploading are real external actions. Use them only when the user clearly asks for that result. Do not use writes as tests and do not silently repeat them.

Never use a customer account or live brand account for a test write. Use a dedicated test account and test social profiles.

Do not send payment-card data, health records, government IDs, biometric records, credentials, or private customer files through the connector.

## Repository Layout

- `plugins/mallary/.codex-plugin/plugin.json`: plugin listing and display details
- `plugins/mallary/skills/`: focused Mallary workflows
- `plugins/mallary/.app.json`: OpenAI app link, created after registration
- `.agents/plugins/marketplace.json`: local Codex marketplace entry
- `review/test-cases.md`: positive and negative review cases

## Register the Mallary App

Before public submission, register the Mallary MCP endpoint in ChatGPT Developer Mode:

1. Create a new app connection.
2. Enter `https://mallary.ai/mcp/openai` as the MCP server URL.
3. Complete Mallary OAuth with an approved pilot account.
4. Copy the exact technical app ID shown by OpenAI. It normally starts with `asdk_app` or `plugin_asdk_app`.
5. Configure this repository with that real ID:

```bash
npm run configure:app -- <technical-app-id>
```

This command creates `plugins/mallary/.app.json` and links it from the plugin manifest. The repository does not contain a fake app ID before registration.

## Validate

Run the repository checks:

```bash
npm run validate
```

Run the Codex plugin validator when it is available in your local Codex checkout:

```bash
python3 /path/to/plugin-creator/scripts/validate_plugin.py plugins/mallary
```

## Test in Codex

Add this checkout as a local marketplace, then install the plugin:

```bash
codex plugin marketplace add /absolute/path/to/chatgpt-plugin
codex plugin add mallary@mallarylabs
```

Start a new Codex thread after installation. OAuth should begin during install. Use a dedicated review account before testing a write.

## Review Checklist

- Use a Mallary demo account that does not require multi-factor authentication.
- Connect only dedicated test social accounts.
- Keep the OAuth pilot allowlist enabled during private review.
- Complete the publisher and domain checks requested by OpenAI.
- Run the five positive and three safety cases in `review/test-cases.md`.
- Scan every MCP tool and confirm its read, write, destructive, idempotent, and open-world annotations.
- Verify that read responses do not expose secrets, billing data, provider debug data, or unrelated account details.
- Remove the OAuth pilot restriction only after approval and a final non-pilot test.

## Image Upload

The plugin can copy one social image that the user chose or made in ChatGPT. `mallary_upload_image` accepts a ChatGPT file reference for a JPEG, PNG, WebP, or GIF image up to 25 MB. Mallary checks the real file bytes, stores the approved image, and returns a `https://files.mallary.ai` URL for `mallary_create_post`.

The image tool does not accept videos, documents, SVG files, external media URLs, or local file paths. Mallary does not save the temporary OpenAI download URL or OpenAI file ID in the post record.

## Version 1.0.1

- Uses the dedicated `https://mallary.ai/mcp/openai` endpoint.
- Limits the connector to ten social publishing and analytics tools.
- Adds a narrow ChatGPT image input.
- Removes settings, webhooks, disconnects, profile changes, and deletion.
- Rejects restricted data and unknown request fields.
- Keeps the general Mallary MCP, API, CLI, and other connectors unchanged.

## Support

- Documentation: [docs.mallary.ai/home/chatgpt](https://docs.mallary.ai/home/chatgpt)
- Privacy: [mallary.ai/privacy](https://mallary.ai/privacy)
- Terms: [mallary.ai/tos](https://mallary.ai/tos)
- Email: [support@mallary.ai](mailto:support@mallary.ai)
