import { Entity } from 'typeorm';
import { Donor } from '../donor/donor';
import { Charity } from '../charity/charity';
import { Campaign } from '../campaign/campaign';
import { PickType } from '@nestjs/swagger';
import { EntityColumn, EntityRelation, RelationshipType } from '../../common/decorators/entity.decorator';
import { BaseDbEntity } from '../../common/entities/baseDb.entity';

@Entity('donation')
export class Donation extends BaseDbEntity {
    @EntityColumn({ db: { type: 'decimal' } })
    amount: number = 0;

    @EntityColumn()
    date: Date = new Date();

    @EntityColumn()
    method: string = '';

    @EntityRelation({
        type: RelationshipType.MANY_TO_ONE,
        entity: () => Donor,
        joinOptions: { name: 'donorId' },
    })
    donor!: Donor;

    @EntityRelation({
        type: RelationshipType.MANY_TO_ONE,
        entity: () => Charity,
        joinOptions: { name: 'charityId' },
    })
    charity!: Charity;

    @EntityRelation({
        type: RelationshipType.MANY_TO_ONE,
        entity: () => Campaign,
        joinOptions: { name: 'campaignId' },
    })
    campaign?: Campaign;
}

export class CreateDonationDTO extends PickType(Donation, [
    'amount',
    'date',
    'method',
    'donor',
    'charity',
    'campaign'
] as const) {}
