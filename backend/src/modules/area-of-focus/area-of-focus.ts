import { Entity } from 'typeorm';
import { BaseDbEntity } from '../../tools/baseDb.entity';
import { EntityColumn, EntityRelation, RelationshipType } from '../../tools/entity.decorator';
import { Charity } from '../charity/charity';

@Entity()
export class AreaOfFocus extends BaseDbEntity {
    @EntityColumn()
    name: string = '';

    @EntityRelation({
        type: RelationshipType.MANY_TO_MANY,
        entity: () => Charity,
        inverseSide: (charity: Charity) => charity.areasOfFocus,
    })
    charities: Charity[] = [];
}