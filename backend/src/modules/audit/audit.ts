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

@Entity('audit')
export class Audit extends BaseDbEntity {
  @EntityColumn()
  name!: string;
}

export class CreateAuditDTO extends PickType(Audit, ["name"] as const) {}
