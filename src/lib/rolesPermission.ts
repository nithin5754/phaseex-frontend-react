
export type Role = 'owner' | 'manager' | 'developer'|'viewer'

export type Permission = 'canInvite' | 'canAssignRoles' | 'canDeleteProject';
export type RolesPermissionTypes={
   [key in Role]:Record<Permission,boolean>
}



const ROLE_PERMISSIONS: RolesPermissionTypes = {
  owner: {

    canInvite: true,
    canAssignRoles: true,
    canDeleteProject: true,
  },
  manager: {
 
    canInvite: true,
    canAssignRoles: false,
    canDeleteProject: false,
  },
  developer: {
  
    canInvite: false,
    canAssignRoles: false,
    canDeleteProject: false,
  },
   viewer: {
    canInvite: false,
    canAssignRoles: false,
    canDeleteProject: false,
  },
};

export  {ROLE_PERMISSIONS};
