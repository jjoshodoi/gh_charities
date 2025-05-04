// common/decorators/use-crud-guard.decorator.ts
import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserCharityRoleGuard } from '../guards/user-charity-role.guard';
import { ROLES_KEY, FEATURES_KEY } from './roles.decorator';

export function UseCrudGuard(options: { roles?: string[]; features?: string[] }) {
    return applyDecorators(
        UseGuards(JwtAuthGuard, UserCharityRoleGuard),
        SetMetadata(ROLES_KEY, options.roles || []),
        SetMetadata(FEATURES_KEY, options.features || [])
    );
}
