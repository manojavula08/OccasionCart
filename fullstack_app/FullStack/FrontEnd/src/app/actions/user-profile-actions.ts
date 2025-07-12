
'use server';

import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/firestore'; // Import initialized db and auth
import type { User } from 'firebase/auth';

export interface UserProfileData {
  fullName?: string;
  companyName?: string;
  email?: string; // email is usually from auth, but can be stored for convenience
  lastUpdated?: any; // Firestore ServerTimestamp
  createdAt?: any; // Firestore ServerTimestamp
}

export async function updateUserProfile(
  data: Pick<UserProfileData, 'fullName' | 'companyName'>
): Promise<{ success: boolean; message: string }> {
  // Gracefully fail if Firebase is not initialized
  if (!auth || !db) {
    const message = 'Firebase is not configured. Cannot update profile.';
    console.error(message);
    return { success: false, message: message };
  }
  
  try {
    const currentUser: User | null = auth.currentUser;

    if (!currentUser) {
      console.error('Update user profile failed: User not authenticated.');
      return { success: false, message: 'User not authenticated. Please log in.' };
    }

    const profileData: Partial<UserProfileData> = {
      fullName: data.fullName,
      companyName: data.companyName,
      email: currentUser.email || undefined, // Store email for reference
      lastUpdated: serverTimestamp(),
    };

    // Add createdAt only if it's a new profile
    const userDocRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(userDocRef);
    if (!docSnap.exists()) {
        profileData.createdAt = serverTimestamp();
    }

    await setDoc(userDocRef, profileData, { merge: true });
    return { success: true, message: 'Profile updated successfully.' };
  } catch (error) {
    console.error('Error updating user profile:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, message: `Failed to update profile: ${errorMessage}` };
  }
}

export async function getUserProfile(): Promise<{
  success: boolean;
  message: string;
  data?: UserProfileData;
}> {
  // Gracefully fail if Firebase is not initialized
  if (!auth || !db) {
    const message = 'Firebase is not configured. Cannot get profile.';
    console.error(message);
    return { success: false, message: message, data: { email: 'Firebase not configured.' } };
  }

  try {
    const currentUser: User | null = auth.currentUser;

    if (!currentUser) {
      return { success: false, message: 'User not authenticated. Please log in.' };
    }

    const userDocRef = doc(db, 'users', currentUser.uid);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      return {
        success: true,
        message: 'Profile fetched successfully.',
        data: docSnap.data() as UserProfileData,
      };
    } else {
      // Optionally, create a basic profile if it doesn't exist, or just return not found
      // For now, let's just indicate it's not found, the update action will create it.
      return { success: true, message: 'No profile data found. Please save your profile.', data: { email: currentUser.email || undefined} };
    }
  } catch (error) {
    console.error('Error fetching user profile:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, message: `Failed to fetch profile: ${errorMessage}` };
  }
}

