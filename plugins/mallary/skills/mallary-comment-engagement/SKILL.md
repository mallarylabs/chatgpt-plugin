---
name: mallary-comment-engagement
description: Use when the user explicitly asks to list, draft, or post replies to comments on posts published through Mallary.
---

# Mallary Comment Engagement

Use this skill only for comments connected to the user's Mallary posts.

## Read Comments

1. Use `mallary_list_posts` if the Mallary post ID is not known.
2. Use `mallary_list_comments` with the exact `post_id`.
3. Return only the comment details needed for the user's request.

Do not invent a post ID, comment ID, platform, author name, or username. Some platforms may not return every author field.

## Draft and Post a Reply

1. Draft the reply in the voice and tone the user requested.
2. If the user asked only for a draft, return the draft and do not call a write tool.
3. If the user clearly asked to post an exact reply, verify the post ID and comment ID from Mallary data.
4. Call `mallary_reply_to_comment` once with the exact IDs and reply text.

The reply changes a public external conversation. Never post from a general advice request or an unfinished draft. Never silently retry a reply after a timeout or unclear result. Check comments first, then ask before another write.

## Privacy

Treat comment text and author details as account data. Show only what the user needs. Never expose OAuth tokens, social account credentials, API keys, provider debug data, or unrelated comments.

Do not send payment data, health records, government IDs, biometric records, credentials, or private customer files in a reply.
