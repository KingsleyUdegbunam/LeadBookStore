import { supabase } from "../../utilities/supabase";

export async function getUserOrders(user) {
  if (!user) return { success: false, error: "Not signed in" };
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .or(`user_id.eq.${user.id}, email.eq.${user.email}`)
    .order("created_at", { ascending: false });

  if (error) return { success: false, error };
  return { success: true, data };
}
