# System Architecture

This document will contain the system architecture design of the Career Guidance application.

## Architecture Diagram

```
+-----------------+      +-----------------+      +-----------------+
|   Web Browser   |----->|   Firebase      |----->|   Firestore     |
| (HTML/CSS/JS)   |      |  Authentication |      |   Database      |
+-----------------+      +-----------------+      +-----------------+
        |
        |
        v
+-----------------+
|   Firebase      |
|   Hosting       |
+-----------------+
```

## Components

*   **Client-Side (Web Browser):**
    *   The user interface is built with HTML, CSS, and JavaScript.
    *   Handles user interactions and sends requests to Firebase.

*   **Backend (Firebase):**
    *   **Firebase Authentication:** Manages user and college sign-up and login.
    *   **Firestore:** A NoSQL database used to store college information, user data, and registration details.
    *   **Firebase Hosting:** Hosts the static web files (HTML, CSS, JavaScript).