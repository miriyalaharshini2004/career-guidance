# Low-Level Design (LLD)

This document will contain the low-level design details of the Career Guidance application.

## Modules

### 1. Authentication Module

*   **Description:** Handles user and college authentication.
*   **Components:**
    *   `signup.html`: Student sign-up form.
    *   `college-signup.html`: College sign-up form.
    *   `index.html`: Login form.
    *   `script.js`: Contains the logic for handling sign-up and login using Firebase Authentication.
*   **Functions:**
    *   `createUserWithEmailAndPassword()`: Creates a new user in Firebase.
    *   `signInWithEmailAndPassword()`: Signs in an existing user.

### 2. Career and Location Selection Module

*   **Description:** Allows students to select their career and location preferences.
*   **Components:**
    *   `career-selection.html`: UI for selecting a career.
    *   `location-selection.html`: UI for selecting a location.
    *   `script.js`: Contains the logic for storing the user's selections in local storage.

### 3. College Information Module

*   **Description:** Displays information about colleges.
*   **Components:**
    *   `college-list.html`: Displays a list of colleges based on the user's selections.
    *   `college-details.html`: Displays detailed information about a specific college.
    *   `script.js`: Contains the logic for fetching college data from Firestore and displaying it.
*   **Functions:**
    *   `getDocs()`: Fetches a list of documents from a Firestore collection.
    *   `getDoc()`: Fetches a single document from a Firestore collection.

### 4. College Registration Module

*   **Description:** Allows students to register for a college.
*   **Components:**
    *   `college-registration.html`: Form for college registration.
    *   `script.js`: Contains the logic for saving the registration data to Firestore.
*   **Functions:**
    *   `addDoc()`: Adds a new document to a Firestore collection.

### 5. Aptitude Test Module

*   **Description:** Provides an aptitude test for students.
*   **Components:**
    *   `aptitude-test.html`: UI for the aptitude test.
    *   `test-completion.html`: Displays the test score.
    *   `script.js`: Contains the logic for generating the test, calculating the score, and displaying the result.