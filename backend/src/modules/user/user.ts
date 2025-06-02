import {ApiHideProperty, PickType} from "@nestjs/swagger";
import {Entity} from "typeorm";
import {UserRole} from "../../enums/user.enum";

import {Charity} from "../charity/charity";
import {BaseDbEntity} from "../../common/entities/baseDb.entity";
import {
    EntityColumn,
    EntityEnumColumn,
    EntityRelation,
    OptionalEntityColumn,
    RelationshipType
} from "../../common/decorators/entity.decorator";
import {Token} from "../token/token";
import {AuthProvider} from "../../enums/auth.enum";


@Entity('user')
export class User extends BaseDbEntity {
    @EntityColumn()
    firstName!: string

    @EntityColumn()
    lastName!: string

    @EntityColumn()
    userName!: string

    @EntityColumn({
        db: {unique: true},
        api: {format: 'email'}
    })
    email!: string

    @OptionalEntityColumn({api: {minLength: 8, maxLength: 32}})
    @ApiHideProperty()
    password?: string

    @EntityEnumColumn({
        db: {default: UserRole.CONTACT, enum: UserRole},
    })
    role!: UserRole

    @EntityRelation({type: RelationshipType.MANY_TO_ONE, entity: () => Charity, joinOptions: {name: 'users'}})
    charity?: Charity;


    @OptionalEntityColumn({
        db: { type: 'enum', enum: AuthProvider, default: AuthProvider.LOCAL },
        api: { enum: AuthProvider },
    })
    provider?: AuthProvider;

    @OptionalEntityColumn()
    providerId?: string; // e.g., Google's unique user ID

    @EntityRelation({
        type: RelationshipType.ONE_TO_MANY,
        entity: () => Token,
        inverseSide: 'user',
        description: 'Tokens belonging to the user',
    })
    tokens?: Token[];
}

export class CreateUserDTO extends PickType(User, ["firstName", "lastName", "userName", "email", "role", "charity"] as const) {
}
