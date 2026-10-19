---
kind: external_dependency
name: Google GenAI SDK
slug: google-genai
category: external_dependency
category_hints:
    - vendor_identity
scope:
    - '**'
source_files:
    - package.json
    - .env.example
---

### Role

### Stable orientation
- Vendor: Google Cloud Generative AI (Gemini family).
- Consumed as an npm dependency; configuration is expected via environment variables (`.env.example` present in repo).
- See `src/` for the actual client initialization and model calls.