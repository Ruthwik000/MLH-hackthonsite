import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get admin emails from environment variable
  const adminEmails = useMemo(() => 
    import.meta.env.VITE_ADMIN_EMAILS?.split(',').map(email => email.trim()) || []
  , []);

  const checkAndSetUserRole = useCallback(async (firebaseUser) => {
    // Check if user email is in admin list
    const isAdmin = adminEmails.includes(firebaseUser.email);
    const role = isAdmin ? 'admin' : 'student';

    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
    if (userDoc.exists()) {
      // Update role if it's different
      const currentRole = userDoc.data().role;
      if (currentRole !== role) {
        await setDoc(doc(db, 'users', firebaseUser.uid), {
          ...userDoc.data(),
          role: role
        });
      }
      setUser(firebaseUser);
      setUserRole(role);
    } else {
      // Create user document if it doesn't exist
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email,
        role: role,
        createdAt: new Date().toISOString()
      });
      setUser(firebaseUser);
      setUserRole(role);
    }
  }, [adminEmails]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await checkAndSetUserRole(firebaseUser);
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [checkAndSetUserRole]);

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const isAdmin = adminEmails.includes(email);
    const role = isAdmin ? 'admin' : 'student';
    
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      uid: userCredential.user.uid,
      name,
      email,
      role: role,
      createdAt: new Date().toISOString()
    });
    return userCredential;
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    const isAdmin = adminEmails.includes(result.user.email);
    const role = isAdmin ? 'admin' : 'student';
    
    // Check if user document exists
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!userDoc.exists()) {
      // Create user document for new Google users
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name: result.user.displayName || 'User',
        email: result.user.email,
        role: role,
        createdAt: new Date().toISOString()
      });
    } else {
      // Update role if needed
      const currentRole = userDoc.data().role;
      if (currentRole !== role) {
        await setDoc(doc(db, 'users', result.user.uid), {
          ...userDoc.data(),
          role: role
        });
      }
    }
    
    return result;
  };

  const logout = () => signOut(auth);

  const value = {
    user,
    userRole,
    login,
    signup,
    loginWithGoogle,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
