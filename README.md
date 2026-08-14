# Mallary Plugin for ChatGPT and Codex

Use Mallary inside ChatGPT and Codex to run your social media workflow in one place.

The plugin connects to Mallary's remote MCP server at `https://mallary.ai/mcp`. It adds focused skills that help ChatGPT and Codex choose safe steps for publishing, comments, post analytics, audience counts, and account management.

## What You Can Do

- See your Mallary profiles and connected social accounts.
- Draft one post for many platforms.
- Use a different caption for each platform.
- Create or schedule a post after you approve the final content.
- Check publish status, social post IDs, and public post links.
- Read comments and post a reply after approval.
- Review post analytics by platform.
- Review follower and subscriber counts for connected accounts.
- Manage profiles, settings, platform connections, and webhooks.

## OAuth, Not API Keys

The plugin uses Mallary OAuth. The user signs in to Mallary in a browser and approves the requested access.

Do not ask users to paste credentials into a prompt. The plugin must not reveal OAuth tokens, social account credentials, webhook secrets, payment details, or provider debug data.

## Safety

Mallary can change real social accounts. The included skills require a clear preview and fresh user confirmation before publishing, replying, deleting, disconnecting, changing settings, or creating a webhook.

Never use a customer account or live brand account for a test write. Use a dedicated test account and test social profiles.

## Repository Layout

- `plugins/mallary/.codex-plugin/plugin.json`: plugin listing and display details
- `plugins/mallary/skills/`: focused Mallary workflows
- `plugins/mallary/.app.json`: OpenAI app link, created after registration
- `.agents/plugins/marketplace.json`: local Codex marketplace entry
- `review/test-cases.md`: positive and negative review cases

## Register the Mallary App

Before public submission, register the Mallary MCP endpoint in ChatGPT Developer Mode:

1. Create a new app connection.
2. Enter `https://mallary.ai/mcp` as the MCP server URL.
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

Start a new Codex thread after installation. OAuth should begin during install. Use the read-only starter prompts before testing any write.

## Review Checklist

- Use a Mallary demo account that does not require multi-factor authentication.
- Connect only dedicated test social accounts.
- Keep the OAuth pilot allowlist enabled during private review.
- Complete the publisher and domain checks requested by OpenAI.
- Run the five positive and three safety cases in `review/test-cases.md`.
- Scan every MCP tool and confirm its read, write, destructive, idempotent, and open-world annotations.
- Verify that read responses do not expose secrets, billing data, provider debug data, or unrelated account details.
- Remove the OAuth pilot restriction only after approval and a final non-pilot test.

## Media Limit in Version 1

The plugin can use existing Mallary media URLs. It can also ask Mallary for a temporary upload URL. Creating that URL does not upload local bytes. ChatGPT cannot upload a local file through this plugin by itself in version 1.

## Support

- Documentation: [docs.mallary.ai/home/chatgpt](https://docs.mallary.ai/home/chatgpt)
- Privacy: [mallary.ai/privacy](https://mallary.ai/privacy)
- Terms: [mallary.ai/tos](https://mallary.ai/tos)
- Email: [support@mallary.ai](mailto:support@mallary.ai)
