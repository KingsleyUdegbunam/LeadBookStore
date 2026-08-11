import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../utilities/supabase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  //Sign up
  const signUpNewUser = async (email, password, firstName, lastName) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
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
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) {
      return { success: false };
    }
    return { success: true };
  };

  //Change password
  const changePassword = async (currentPassword, newPassword) => {
    const { error } = await supabase.auth.updateUser({
      current_password: currentPassword,
      password: newPassword,
    });
    if (error) {
      return { error: error, success: false };
    }
    return { error: false, success: true };
  };

  // Account deletion
  const deleteAccount = async () => {
    const { data, error } = await supabase.functions.invoke("delete-account");

    if (error) {
      throw error;
    }
    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        signUpNewUser,
        signInUser,
        signOut,
        changePassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => {
  return useContext(AuthContext);
};
