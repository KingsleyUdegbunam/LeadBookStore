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
export const getOrderByRef = async (ref) => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("reference", ref)
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
  const { error, data } = await supabase.from("orders").insert([orderData]);
  if (error) {
    console.log(error);
    throw new Error(error);
  }
  return data;
};
