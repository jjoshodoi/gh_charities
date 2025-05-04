import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
    Inject
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, FEATURES_KEY } from '../decorators/roles.decorator';
import { DataSource } from 'typeorm';
import {UserCharityRole} from "../../modules/user-charity-role/user-charity-role";

@Injectable()
export class UserCharityRoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @Inject(DataSource) private dataSource: DataSource
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user; // populated by your auth guard
        const charityId = request.params.charityId || request.body.charityId;

        if (!user || !charityId) {
            throw new ForbiddenException('Missing user or charity context');
        }

        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        const requiredFeatures = this.reflector.getAllAndOverride<string[]>(FEATURES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // Global override
        if (user.role === 'ADMIN') return true;

        const repo = this.dataSource.getRepository(UserCharityRole);
        const scopedRole = await repo.findOne({
            where: {
                user: { id: user.id },
                charity: { id: charityId },
            },
        });

        if (!scopedRole) throw new ForbiddenException('No access to this charity');

        if (
            requiredRoles?.length &&
            !requiredRoles.includes(scopedRole.role)
        ) {
            throw new ForbiddenException('Insufficient role for this action');
        }

        if (
            requiredFeatures?.length &&
            !requiredFeatures.every((feat) => scopedRole.features.includes(feat))
        ) {
            throw new ForbiddenException('Missing required features');
        }

        return true;
    }
}
