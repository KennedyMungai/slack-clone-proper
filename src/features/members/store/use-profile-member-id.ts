import { useQueryState } from "nuqs";

// Basically use state but synced using the URL
export const useProfileMemberId = () => useQueryState("profileMemberId");
