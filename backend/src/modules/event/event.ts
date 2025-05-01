import { Entity } from 'typeorm';
import { BaseDbEntity } from '../../tools/baseDb.entity';
import { EntityColumn, OptionalEntityColumn, EntityRelation, RelationshipType } from '../../tools/entity.decorator';
import { Charity } from '../charity/charity';

@Entity()
export class Event extends BaseDbEntity {
    @EntityColumn()
    title: string = '';

    @EntityColumn({ db: { type: 'text' } })
    description: string = '';

    @EntityColumn()
    startDate: Date = new Date();

    @OptionalEntityColumn()
    endDate?: Date;

    @EntityColumn()
    location: string = '';

    @OptionalEntityColumn({ api: { format: 'uri' } })
    bannerImageUrl?: string;

    @EntityRelation({
        type: RelationshipType.MANY_TO_ONE,
        entity: () => Charity,
        joinOptions: { name: 'charityId' },
    })
    charity!: Charity;
}