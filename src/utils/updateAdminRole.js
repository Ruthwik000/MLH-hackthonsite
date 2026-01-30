// Utility to manually update user role to admin
// Run this in browser console if needed

import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config';

export const updateCurrentUserToAdmin = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error('❌ No user logged in');
      return;
    }

    console.log('Updating user:', user.email);
    
    await updateDoc(doc(db, 'users', user.uid), {
      role: 'admin'
    });

    console.log('✅ User role updated to admin!');
    console.log('Please refresh the page to see changes.');
    
    return true;
  } catch (error) {
    console.error('❌ Error updating role:', error);
    return false;
  }
};

// Make it available globally for console use
if (typeof window !== 'undefined') {
  window.updateCurrentUserToAdmin = updateCurrentUserToAdmin;
}
