import { Entity } from 'typeorm';
import { BaseDbEntity } from '../../common/entities/baseDb.entity';
import { Charity } from '../charity/charity';
import { Donation } from '../donation/donation';
import { PickType } from '@nestjs/swagger';
import {
    EntityColumn,
    EntityRelation,
    OptionalEntityColumn,
    RelationshipType
} from '../../common/decorators/entity.decorator';

@Entity('campaign')
export class Campaign extends BaseDbEntity {
    @EntityColumn()
    title!: string;

    @EntityColumn({ db: { type: 'decimal' } })
    goalAmount!: number;

    @EntityColumn({ db: { type: 'decimal', default: 0 } })
    raisedAmount!: number;

    @EntityColumn({ db: { type: 'text' } })
    description!: string;

    @EntityColumn()
    startDate!: Date;

    @OptionalEntityColumn()
    endDate?: Date;

    @EntityRelation({
        type: RelationshipType.MANY_TO_ONE,
        entity: () => Charity,
        joinOptions: { name: 'charityId' },
    })
    charity!: Charity;

    @EntityRelation({
        type: RelationshipType.ONE_TO_MANY,
        entity: () => Donation,
        inverseSide: (donation: Donation) => donation.campaign,
    })
    donations: Donation[] = [];
}

export class CreateCampaignDTO extends PickType(Campaign, [
    'title',
    'goalAmount',
    'description',
    'startDate',
    'endDate',
    'charity'
] as const) {}
