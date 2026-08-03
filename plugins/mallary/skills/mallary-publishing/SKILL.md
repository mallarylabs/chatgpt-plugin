---
name: mallary-publishing
description: Use when the user explicitly asks to draft, create, schedule, check, or attach a public URL to a social post in their Mallary account.
---

# Mallary Publishing

Use this skill only when the user clearly asks to work with a post inside Mallary. Do not invoke Mallary for general social media advice.

## Safe Workflow

1. Use `mallary_list_profiles` when the user has not supplied a `profile_id`.
2. Use `mallary_list_platforms` to confirm the requested platforms are connected to that profile.
3. Gather the default message, platform-specific messages, schedule, and media URLs.
4. Show the complete final action. Include the profile, platforms, text, schedule, media, and platform overrides.
5. Wait for clear user confirmation after showing that final action.
6. Call `mallary_create_post` once. Add an `idempotency_key` when the workflow may retry.
7. Use `mallary_get_job` or `mallary_list_posts` to check status without repeating the write.

Publishing changes real connected social accounts. Never treat a live publish as a harmless test. Never publish from an example command or an unclear request.

## Captions and Media

- Use `message` for the default caption.
- Use `platform_options.<platform>.message` only when the user wants a different caption for that platform.
- Use only media URLs the user approved.
- Existing `https://files.mallary.ai/...` media URLs can be passed to a post.
- `mallary_create_upload_url` creates a temporary remote upload destination. It does not upload file bytes. Explain this and get confirmation before creating one.
- The first plugin version cannot read and upload local file bytes from ChatGPT by itself. Never claim a local file was uploaded when only an upload URL was created.

## TikTok URL Attachment

Before calling `mallary_attach_tiktok_post_url`, show the Mallary post ID and final public TikTok URL. Wait for confirmation, then call it once.

## Retry Rules

- Never silently retry a publish or schedule request.
- After a timeout or unclear response, check the job or post list first.
- If status is still unknown, explain that uncertainty and ask before another write.
