# VibeMatch

VibeMatch is an Expo Router dating experience that helps people find their next connection with curated daily matches, swipe interactions, and a polished onboarding flow. The app targets iOS, Android, and web with a single React Native codebase.

## Features
- Personalized splash screen that checks stored auth tokens and routes users into the app automatically.
- Email/password authentication with secure token storage and Expo SecureStore integration.
- Swipe deck with animated like/pass gestures, optimistic actions, and infinite pagination powered by TanStack Query.
- Liked matches list for revisiting previously saved profiles.
- Profile hub with quick access to preferences, safety resources, and sign-out.
- Gradient-driven UI using React Native Paper components for a modern dating-app feel.

## Getting Started

### Prerequisites
- Node.js 18+ and pnpm (recommended) or npm/yarn.
- Expo CLI (`npm install --global expo-cli`) if you plan to run on a device or simulator.
- A running backend that implements the `/api/auth/*` and `/api/people/*` routes. The companion API lives in the `date-app-api` project.

### Installation
```bash
pnpm install          # or npm install / yarn install
```

Create a `.env` file (or edit the existing one) with your backend URL:
```bash
EXPO_PUBLIC_API_BASE_URL=https://your-api-host
```
> The current setup points to `http://103.129.148.74:9000`. Update it if you run the API locally.

### Running
```bash
pnpm start            # launches Expo Dev Tools
```

From the Expo Dev Tools you can:
- Press `i` to launch the iOS simulator.
- Press `a` to launch the Android emulator.
- Scan the QR code using Expo Go on a real device.

## Scripts
- `pnpm start` – start the Expo development server (clears cache by default in `package.json` via `expo start --clear`).
- `pnpm android` – open the project directly on Android.
- `pnpm ios` – open the project directly on iOS.
- `pnpm web` – run the web build in the browser.

## Project Structure
```
src/
  app/
    (auth)/        # sign-in and register routes
    (main)/        # home, liked, profile tabs
    _layout.tsx    # Expo Router layouts
  components/      # reusable UI (e.g., SwipeDeck, PersonCard)
  features/
    auth/          # API hooks & types for authentication
    people/        # API hooks & types for match discovery
  hooks/           # shared hooks such as auth redirect
  lib/             # API client, secure storage helpers
```

State and server synchronization are handled with Zustand and TanStack Query, while Axios communicates with the backend using the `EXPO_PUBLIC_API_BASE_URL` value.

## Tech Stack
- Expo 54 & React Native 0.81
- Expo Router for file-based navigation
- React Native Paper for UI components
- TanStack Query for data fetching and caching
- Zustand for lightweight client-side state
- Expo SecureStore for token persistence

## Author
- **Nur Wahid Azhar**
- Email: nur.wahid.azhar@gmail.com
- Portfolio: https://porto-ku.excitech.id/user?id=nur.wahid.azhar
