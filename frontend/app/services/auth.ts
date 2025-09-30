import { supabase } from "app/lib/supabase/client";

// Signup
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:5173/dashboard",
      data: {
        display_name: "Marwyn",
      },
    },
  });
  if (error) throw error;
  return data;
}

// Login
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

// Logout
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Get current session
export async function getSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}
