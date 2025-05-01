import { Entity } from 'typeorm';
import { BaseDbEntity } from '../../tools/baseDb.entity';
import { EntityColumn, EntityRelation, RelationshipType } from '../../tools/entity.decorator';
import { Charity } from '../charity/charity';

@Entity()
export class Testimonial extends BaseDbEntity {
    @EntityColumn()
    author: string = '';

    @EntityColumn({ db: { type: 'text' } })
    content: string = '';

    @EntityColumn()
    date: Date = new Date();

    @EntityRelation({
        type: RelationshipType.MANY_TO_ONE,
        entity: () => Charity,
        joinOptions: { name: 'charityId' },
    })
    charity!: Charity;
}