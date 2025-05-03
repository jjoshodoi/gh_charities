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
}

export class CreateUserDTO extends PickType(User, ["firstName", "lastName", "userName", "email", "role", "charity"] as const) {
}
