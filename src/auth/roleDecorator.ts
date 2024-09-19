import { SetMetadata } from "@nestjs/common";
import { Roles } from './role.enum';

export const Role = (...role: Roles[]) => SetMetadata('roles', role)