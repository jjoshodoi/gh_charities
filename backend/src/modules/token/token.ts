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
import {User} from "../user/user";
import {TokenType} from "../../enums/token.enum";

@Entity('token')
export class Token extends BaseDbEntity {

  @EntityColumn()
  token!: string;  // This will be the hashed token

  @EntityEnumColumn({
    db: { enum: TokenType },
  })
  type!: TokenType;  // e.g., ACCESS, REFRESH, PASSWORD_RESET

  @EntityColumn()
  expiresAt!: Date;

  @EntityRelation({
    type: RelationshipType.MANY_TO_ONE,
    entity: () => User,
    description: 'The user this token belongs to',
  })
  user!: User;
}

export class CreateTokenDTO extends PickType(Token, ["type", "expiresAt", "token"] as const) {}
