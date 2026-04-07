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
