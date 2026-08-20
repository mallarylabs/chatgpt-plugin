---
name: mallary-publishing
description: Use when the user explicitly asks to draft, create, schedule, check, or add an approved ChatGPT image to a social post in their Mallary account.
---

# Mallary Publishing

Use this skill only when the user clearly asks to work with a post inside Mallary. Do not invoke Mallary for general social media advice.

## Safe Workflow

1. Use `mallary_list_profiles` when the user has not supplied a `profile_id`.
2. Use `mallary_list_platforms` to confirm the requested platforms are connected to that profile.
3. Gather the final message, platform-specific messages, schedule, and approved media.
4. If the user asks for a draft or leaves a required choice unclear, show the draft or ask for the missing choice. Do not publish.
5. If the user clearly asks to publish or schedule the final content, upload an approved ChatGPT image when needed, then call `mallary_create_post` once.
6. Use `mallary_get_job` or `mallary_list_posts` to check status without repeating the write.

Publishing changes real connected social accounts. Never treat a live publish as a harmless test. Never publish from an example command or an unclear request.

## Captions and Media

- Use `message` for the default caption.
- Use `platform_options.<platform>.message` only when the user wants a different caption for that platform.
- Use `mallary_upload_image` for one social image that the user chose or made in ChatGPT.
- The image must be JPEG, PNG, WebP, or GIF and no larger than 25 MB.
- Do not use the image tool for video, documents, SVG files, identity records, medical records, payment data, credentials, or private customer files.
- Pass the `https://files.mallary.ai/...` URL returned by `mallary_upload_image` to `mallary_create_post`.
- Do not pass an external media URL, local file path, temporary OpenAI URL, or OpenAI file ID to `mallary_create_post`.

## Restricted Data

Do not request, accept, or send payment-card data, health-record IDs, government IDs, biometric records, passwords, access tokens, API keys, or private customer files. Ask the user to remove restricted data before posting.

## Retry Rules

- Never silently retry a publish or schedule request.
- After a timeout or unclear response, check the job or post list first.
- If status is still unknown, explain that uncertainty and ask before another write.
