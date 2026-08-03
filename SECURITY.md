# Security

## Report a Problem

Email `support@mallary.ai` with a clear description of the issue. Do not include access tokens, social account credentials, API keys, webhook secrets, payment details, or private customer content.

## Authentication

This plugin uses Mallary OAuth. It does not need a Mallary API key in prompts, files, shell history, logs, or agent transcripts.

## Data Handling

The plugin should request only the Mallary scopes needed for the user's action. It should return only the account data needed to finish that action. Write actions need a clear preview and user confirmation.

Mallary's privacy policy is available at [mallary.ai/privacy](https://mallary.ai/privacy).
