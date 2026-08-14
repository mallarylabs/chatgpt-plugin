---
name: mallary-analytics
description: Use when the user explicitly asks to read or summarize post analytics, follower counts, subscriber counts, or audience growth from their Mallary account.
---

# Mallary Analytics

This is a read-only workflow.

## Workflow

1. Ask which profile or post to review when the target is unclear.
2. Use `mallary_list_profiles` or `mallary_list_posts` only when needed to find the requested public ID.
3. For post results, call `mallary_get_analytics` with the exact `post_id` or `profile_id`.
4. For account follower or subscriber counts, call `mallary_get_audience` with the exact `profile_id`, or omit it for the default profile.
5. Summarize the requested metrics, trends, and platform differences.

Do not change settings, publish content, reply to comments, delete data, or disconnect a platform during an analytics request.

## Accuracy and Privacy

- Keep each platform's results separate unless the user asks for a total.
- Do not add audience counts together unless the user asks. The same person may follow more than one account.
- Treat `permission_required`, `reconnect_required`, and `unsupported` as unavailable data, not zero.
- Say when a metric is missing or has not been collected yet.
- Do not guess missing values.
- Do not expose internal user IDs, credentials, billing data, private post content, provider debug bodies, or unrelated account details.
