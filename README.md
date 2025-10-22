# OpenVoiceBox

OpenVoiceBox is a Free and Open Source Suggestion Box System designed for organizations and projects to collect, review, and manage community feedback.  
It features AI-assisted summarization, markdown-based submissions, and a full moderation dashboard.

---

## Overview

OpenVoiceBox provides an accessible and transparent way for users to submit suggestions while giving administrators complete control over moderation and management.  
It integrates Firebase for authentication and data storage, and uses AI to automatically summarize suggestions for faster review.

---

## Features

### User Features
- Post suggestions using a markdown editor with formatting support.
- View AI-generated summaries of their suggestions.
- Comment on other users’ posts.
- Create and manage a user profile.
- Sign up and log in securely via Firebase Authentication.

### Admin Features
- Access an admin dashboard for full control.
- Edit or delete user suggestions.
- Delete inappropriate comments.
- Ban users who violate rules or guidelines.
- View AI summaries to streamline moderation.

---

## Technology Stack

| Category | Technology |
|-----------|-------------|
| Frontend Framework | Angular |
| Styling | Bootstrap |
| Backend | Firebase (Firestore and Auth) |
| AI Integration | AI Summarization API |
| Hosting | GitHub Pages |
| Language | TypeScript |

---

## AI Summarization

Each suggestion is processed through an AI model that generates concise summaries.  
This allows moderators to review large numbers of suggestions efficiently without manually reading each one in full.

---

## Markdown Support

OpenVoiceBox supports full markdown syntax in user submissions.  
Users can structure their text, highlight ideas, and include lists for clarity.

Example:

```markdown
# Suggestion: Improve Dashboard Design

**Feature Request:** Introduce a cleaner, responsive dashboard layout.

- Enhance readability on mobile devices
- Add light/dark theme toggle
- Use more accessible color contrast
