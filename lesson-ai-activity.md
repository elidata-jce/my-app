# Lesson Activity: React + Firebase User List

## Goal

Build a React feature that reads users from Firebase Firestore, displays key fields in a table, supports role highlighting, and applies Bootstrap styling.

## Learning Objectives

1. Connect React to Firestore and read a collection.
2. Use environment variables for Firebase configuration.
3. Fix React Router context errors.
4. Display only required data fields from backend documents.
5. Add conditional row highlighting based on role.
6. Improve UI quickly with Bootstrap.

## Starter Context

- Existing React app in my-app.
- Firestore collection name: users.
- Menu uses Link from react-router-dom.

## Activity Steps

### 1) Firebase Setup

Create src/firebase.js and initialize Firebase + Firestore using env values.

Required env keys in .env.local:

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID

Expected result:

- Firebase is initialized once and Firestore is exported for reuse.

### 2) Security Hygiene

Ensure .env.local is ignored in .gitignore.

Expected result:

- Secrets are local only and not committed.

### 3) Build UserList Component

In src/components/UserList.jsx:

- Fetch users with getDocs(collection(db, 'users')).
- Handle loading, error, and empty states.
- Render a table.

Expected result:

- Data from Firestore appears in UI with robust state handling.

### 4) Fix Router Error

If Link throws useContext/basename null error, wrap App with BrowserRouter in src/main.jsx.

Expected result:

- Menu links render without crashing.

### 5) Refine Fields

Render only these fields:

- firstName
- lastName
- email
- role

Expected result:

- UI matches backend schema and avoids irrelevant columns.

### 6) Conditional Highlight

Add prop highlightRole to UserList.
If highlightRole is admin, visually highlight rows where user.role is admin.

Expected result:

- Admin rows are emphasized for quick scanning.

### 7) Bootstrap Styling

Install Bootstrap and import CSS once at app entry.
Apply Bootstrap classes to menu/table/layout as needed.

Expected result:

- Cleaner, consistent styling with minimal custom CSS.

## Common Errors and Fixes

1. Error: Cannot destructure basename from null

- Cause: Link outside Router
- Fix: Wrap app with BrowserRouter in src/main.jsx

2. Firebase values are undefined

- Cause: Wrong env key names or dev server not restarted
- Fix: Verify VITE_ names and restart dev server

3. No users shown

- Cause: Wrong collection name, Firestore rules, or schema mismatch
- Fix: Confirm users collection and field names in Firestore

## Success Criteria

1. App runs without runtime errors.
2. UserList loads records from users collection.
3. Table displays firstName, lastName, email, role.
4. Admin rows highlight when highlightRole is admin.
5. .env.local is ignored.
6. Bootstrap styling is visible.

## Reflection Questions

1. Why keep Firebase config in env files?
2. Why do Link components require router context?
3. Why are loading/error/empty states important?
4. How does prop-driven highlighting improve reuse?
