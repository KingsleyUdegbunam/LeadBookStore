import { toast } from "sonner";

export const handleLogOut = async (signOut, setIsLoggingOut) => {
  setIsLoggingOut(true);
  try {
    const result = await signOut();
    if (!result.success) {
      throw new Error("Cannot log out. Please try again.");
    }
    toast.success("Signed out successfully");
  } catch (e) {
    toast.error(e.message);
  } finally {
    setIsLoggingOut(false);
  }
};

export const handleDeletion = async (
  signOut,
  setIsDeleting,
  setIsDeletionDialogOpen,
  deleteAccount,
) => {
  setIsDeleting(true);
  try {
    const result = await deleteAccount();
    toast.success(result.message);
    setIsDeletionDialogOpen(false);
    await signOut();
  } catch (e) {
    toast.error(e.message);
  } finally {
    setIsDeleting(false);
  }
};
