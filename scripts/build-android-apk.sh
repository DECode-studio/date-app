#!/usr/bin/env bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

ANDROID_SDK_DIR="${ANDROID_SDK_ROOT:-${ANDROID_HOME:-/Users/user/Library/Android/sdk}}"
if [[ ! -d "$ANDROID_SDK_DIR" ]]; then
  echo "Android SDK not found at: $ANDROID_SDK_DIR" >&2
  echo "Set ANDROID_SDK_ROOT or ANDROID_HOME to the correct path before running this script." >&2
  exit 1
fi

JAVA_DIR="${JAVA_HOME:-/Library/Java/JavaVirtualMachines/openjdk.jdk/Contents/Home}"
if [[ ! -d "$JAVA_DIR" ]]; then
  echo "JAVA_HOME directory not found at: $JAVA_DIR" >&2
  echo "Set JAVA_HOME to a valid JDK installation before running this script." >&2
  exit 1
fi

GRADLE_USER_DIR="${GRADLE_USER_HOME:-$PROJECT_ROOT/.gradle}"
export GRADLE_USER_HOME="$GRADLE_USER_DIR"
mkdir -p "$GRADLE_USER_HOME"

echo "Running Expo prebuild for Android..."
npx expo prebuild --platform android --no-install

echo "Writing android/local.properties with sdk.dir=$ANDROID_SDK_DIR"
printf "sdk.dir=%s\n" "$ANDROID_SDK_DIR" > "$PROJECT_ROOT/android/local.properties"

echo "Building Android release APK..."
(
  cd "$PROJECT_ROOT/android"
  JAVA_HOME="$JAVA_DIR" ./gradlew assembleRelease
)

echo "APK build complete. See android/app/build/outputs/apk/release/"
