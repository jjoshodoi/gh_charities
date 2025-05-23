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
import { Charity } from "../charity/charity";

@Entity('area-of-focus')
export class AreaOfFocus extends BaseDbEntity {
  @EntityColumn({
    db: { unique: true },
    api: { description: 'Name of the focus area (e.g. Health, Education)' }
  })
  name!: string;

  @OptionalEntityColumn({
    api: { description: 'Optional description of the area of focus' }
  })
  description?: string;

  @EntityRelation({
    type: RelationshipType.MANY_TO_MANY,
    entity: () => Charity,
    inverseSide: (charity: Charity) => charity.areasOfFocus,
    joinOptions: { name: 'area_of_focus_charity' },
  })
  charities?: Charity[];
}

export class CreateAreaOfFocusDTO extends PickType(AreaOfFocus, ['name', 'description'] as const) {}
