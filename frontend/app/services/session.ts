import { useEffect, useState } from "react";
import { supabase } from "app/lib/supabase/client";

export function useSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check existing session on mount
    supabase.auth.getSession().then(({ data }: any) => {
      setSession(data.session);
      setLoading(false);
    });

    // Listen for login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session: any) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return { session, loading };
}
