
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const user = localStorage.getItem('cryptoPilot-user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Sign up function
  const signup = (email, password, name) => {
    // For demo purposes, we'll simulate a successful signup
    // In a real app, this would be an API call to your backend
    
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date().toISOString()
    };
    
    setCurrentUser(newUser);
    localStorage.setItem('cryptoPilot-user', JSON.stringify(newUser));
    
    // Simulate sending welcome email
    toast({
      title: "Welcome to Crypto Pilot!",
      description: "A welcome email has been sent to your inbox.",
    });
    
    navigate("/dashboard");
    return Promise.resolve();
  };

  // Sign in function
  const signin = (email, password) => {
    // For demo purposes, we'll simulate a successful login
    // In a real app, this would be an API call to your backend
    
    // Mock user data
    const user = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      createdAt: new Date().toISOString()
    };
    
    setCurrentUser(user);
    localStorage.setItem('cryptoPilot-user', JSON.stringify(user));
    navigate("/dashboard");
    return Promise.resolve();
  };

  // Sign out function
  const signout = () => {
    setCurrentUser(null);
    localStorage.removeItem('cryptoPilot-user');
    navigate("/");
    return Promise.resolve();
  };

  const value = {
    currentUser,
    signin,
    signup,
    signout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
