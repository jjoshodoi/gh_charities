import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const FEATURES_KEY = 'features';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
export const Features = (...features: string[]) => SetMetadata(FEATURES_KEY, features);

