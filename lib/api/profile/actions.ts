'use server';

import {
  MOCK_USER_PROFILE,
  MOCK_USER_PROFILE_2,
  MOCK_USER_PROFILE_3,
  MOCK_USER_PROFILE_4,
} from './mock-data';

// List of valid usernames for checking existence
const VALID_USERNAMES = ['hacker123', 'webwizard', 'cryptokid', 'reversegod'];

// In a real app, this would come from an auth session
// For demo purposes, we're mocking "reversegod" as the logged-in user (who is an admin)
export async function getCurrentUser() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return the mock admin user as the current user
  return MOCK_USER_PROFILE_4;
}

export async function getUserProfile(username?: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return appropriate profile based on username
  if (username) {
    // Convert to lowercase for case-insensitive matching
    const lowercaseUsername = username.toLowerCase();

    // Check if username exists (case insensitive)
    if (!VALID_USERNAMES.some((u) => u.toLowerCase() === lowercaseUsername)) {
      return null; // User not found
    }

    if (lowercaseUsername === 'webwizard') {
      return MOCK_USER_PROFILE_2;
    } else if (lowercaseUsername === 'cryptokid') {
      return MOCK_USER_PROFILE_3;
    } else if (lowercaseUsername === 'reversegod') {
      return MOCK_USER_PROFILE_4;
    }
  }

  // Default to the first profile
  return MOCK_USER_PROFILE;
}
