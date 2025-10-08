import { Role } from "@prisma/client";

export interface GetUsersAnonimityResponse {
  anonimity: boolean;
}

export interface ToggleUsersAnonimityResponse extends GetUsersAnonimityResponse { }

export interface GetUsersRoleResponse {
  role: Role;
}
