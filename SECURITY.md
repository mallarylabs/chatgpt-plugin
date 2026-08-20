# Security

## Report a Problem

Email `support@mallary.ai` with a clear description of the issue. Do not include access tokens, social account credentials, API keys, webhook secrets, payment details, or private customer content.

## Authentication

This plugin uses Mallary OAuth through `https://mallary.ai/mcp/openai`. It does not need a Mallary API key in prompts, files, shell history, logs, or agent transcripts.

## Data Handling

The connector is for social post text, approved social images, publishing status, comments, post analytics, and audience counts. It does not expose account settings, webhooks, platform disconnects, profile changes, or post deletion.

Publishing, replying, and image uploads are marked as write actions. Run them only for a clear user request, never as a test, and never repeat them after an unclear result without first checking the current state.

`mallary_upload_image` accepts one user-approved JPEG, PNG, WebP, or GIF social image up to 25 MB. Mallary stores it at `files.mallary.ai` and does not save the temporary OpenAI download URL or OpenAI file ID in the post record.

Do not request, accept, or send payment-card data, protected health information, government IDs, biometric records, account passwords, access tokens, API keys, or private customer files. Mallary may block requests that contain this data.

Mallary's privacy policy is available at [mallary.ai/privacy](https://mallary.ai/privacy).
