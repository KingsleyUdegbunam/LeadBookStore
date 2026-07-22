import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utilities/supabase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  //Sign up
  const signUpNewUser = async (email, password, firstName) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          display_name: firstName,
        },
      },
    });

    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  };

  //sign in
  const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { success: false, error };
    }
    return { success: true, data };
  };

  //Sign Out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false };
    }
    return { success: true };
  };
  return (
    <AuthContext.Provider
      value={{ session, signUpNewUser, signInUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
