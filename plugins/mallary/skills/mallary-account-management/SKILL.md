---
name: mallary-account-management
description: Use when the user explicitly asks to manage Mallary profiles, platforms, settings, scheduled posts, or webhooks.
---

# Mallary Account Management

These tools can change account state. Read the current state first, show the exact change, and wait for clear user confirmation before every write.

## Profiles and Platforms

- Use `mallary_list_profiles` before creating or renaming a profile when the target is unclear.
- Before `mallary_create_profile`, show the new label.
- Before `mallary_rename_profile`, show the profile ID, old label, and new label.
- Before `mallary_disconnect_platform`, show the profile and platform. Explain that publishing, analytics, and comment workflows for that connection can stop.

## Settings

Use `mallary_get_settings` before `mallary_update_settings`. Show only the requested changes and preserve every unrelated setting.

AI auto-reply settings can cause future public replies. Do not enable or broaden auto replies unless the user clearly asks for that exact change and confirms it.

## Posts

Before `mallary_delete_post`, show the exact Mallary post ID and status. State that deletion is permanent and may remove queued or scheduled content. Do not delete a published social post unless the tool explicitly supports that result and the user requested it.

## Webhooks

- Use `mallary_list_webhooks` before changing webhooks when the target is unclear.
- Before `mallary_create_webhook`, show the destination URL and event list. Explain that future Mallary event data will be sent to that external destination.
- Before `mallary_delete_webhook`, show the webhook ID and destination. State that future deliveries will stop.

## Safety

- Never guess profile, post, platform, or webhook IDs.
- Never reveal webhook secrets, OAuth tokens, API keys, social credentials, provider debug data, or signed upload URLs that are not needed by the user.
- Never silently retry a write after a timeout or unclear result. Read the current state, explain what is known, and ask before another write.
