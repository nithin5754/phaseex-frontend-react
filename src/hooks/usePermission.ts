import { Role, ROLE_PERMISSIONS } from "@/lib/rolesPermission";
import { useMemo } from "react";

const usePermission = (role: Role | undefined) => {
  return useMemo(() => {
    if (!role)
      return {
        canInvite: false,
        canAssignRoles: false,
        canDeleteProject: false,
      };
    return {
      ...ROLE_PERMISSIONS[role],
    };
  }, [role]);
};
export default usePermission;
