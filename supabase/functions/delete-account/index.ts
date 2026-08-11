import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

export default {
  fetch: withSupabase({ auth: "user" }, async (_req, ctx) => {
    const userId = ctx.userClaims?.id;
    if (!userId){
      return Response.json(
        {error: "Unauthorized"}, {status: 401}
      )
    }

    const {error}  = await ctx.supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
      console.error("Account deletion failed:", error);

      return Response.json(
        { error: "Failed to delete account"}, {status: 500}
      )
    }
    
    return Response.json(
      {
        message: "Account deleted successfully", 
      }
    )
  }),
};
