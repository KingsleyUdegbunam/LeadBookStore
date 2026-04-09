import { supabase } from "../utilities/supabase";

export const getOrderById = async (id) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const getOrdersByEmail = async (email) => {
  if (!email) {
    throw new Error("Email is required");
  }
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);

  return data;
};

export const createOrder = async (orderData) => {
  const { error, data } = await supabase
    .from("orders")
    .insert([orderData])
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
