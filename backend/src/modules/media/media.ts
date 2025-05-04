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

@Entity('media')
export class Media extends BaseDbEntity {
}

export class CreateMediaDTO extends PickType(Media, [] as const) {}
