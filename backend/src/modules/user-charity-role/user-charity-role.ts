import { ApiHideProperty, PickType } from "@nestjs/swagger";
import { Entity } from "typeorm";
import { BaseDbEntity } from "../../common/entities/baseDb.entity";
import {
  EntityColumn,
  EntityEnumColumn,
  EntityRelation,
  OptionalEntityColumn,
  RelationshipType
} from "../../common/decorators/entity.decorator";
import {UserRole} from "../../enums/user.enum";
import {Charity} from "../charity/charity";
import {User} from "../user/user";

@Entity('user-charity-role')
export class UserCharityRole extends BaseDbEntity {
  @EntityRelation({ type: RelationshipType.MANY_TO_ONE, entity: () => User })
  user!: User;

  @EntityRelation({ type: RelationshipType.MANY_TO_ONE, entity: () => Charity })
  charity!: Charity;

  @EntityColumn({ db: { type: 'enum', enum: UserRole } })
  role!: UserRole;

  @EntityColumn({ db: { type: 'simple-array' }, api: { isArray: true } })
  features: string[] = [];
}

export class CreateUserCharityRoleDTO extends PickType(UserCharityRole, ["user", "charity", "role"] as const) {}
