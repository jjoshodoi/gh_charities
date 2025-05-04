import { Entity } from 'typeorm';
import { BaseDbEntity } from '../../common/entities/baseDb.entity';
import {
    EntityColumn,
    EntityRelation,
    OptionalEntityColumn,
    RelationshipType
} from '../../common/decorators/entity.decorator';
import { Charity } from '../charity/charity';
import { PickType } from '@nestjs/swagger';

@Entity('event')
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

export class CreateEventDTO extends PickType(Event, [
    'title',
    'description',
    'startDate',
    'endDate',
    'location',
    'bannerImageUrl',
    'charity'
] as const) {}
