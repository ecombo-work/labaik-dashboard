export type UserRole = number;
export enum UserType {
  SUPER_ADMIN = '3',
  ADMIN = '4',
  CALL_SERVICE = '5',
  ACCOUNTANT = '6',
  PERFORMER = '2',
}

export const RoleRoutes = {
  SUPER_ADMIN: "/super-admin",
  CALL_SERVICE: "/call-service",
  ACCOUNTANT: "/accountant",
};
