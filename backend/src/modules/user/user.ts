import {ApiHideProperty, ApiProperty, ApiPropertyOptional, PickType} from "@nestjs/swagger";
import {Entity, OneToMany} from "typeorm";
import {UserType} from "../../enums/user.enum";
import {BaseDbEntity} from "../../tools/baseDb.entity";
import {
    EntityColumn,
    EntityEnumColumn,
    EntityRelation,
    OptionalEntityColumn,
    RelationshipType
} from "../../tools/entity.decorator";
import {Charity} from "../charity/charity";


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
        db: {default: UserType.CONTACT, enum: UserType},
    })
    type!: UserType

    @EntityRelation({type: RelationshipType.MANY_TO_ONE, entity: () => Charity, joinOptions: {name: 'users'}})
    charity?: Charity;
}

export class CreateUserDTO extends PickType(User, ["firstName", "lastName", "userName", "email", "type", "charity"] as const) {
}
