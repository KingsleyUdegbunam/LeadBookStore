import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wzlttutwnbflmurdvzzj.supabase.co";
const supabaseKey = "sb_publishable_Cl3GQIK4nNkgDqVTduja6w_-LU6H1ZN";

export const supabase = createClient(supabaseUrl, supabaseKey);
