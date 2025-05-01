import { Entity } from 'typeorm';
import { BaseDbEntity } from '../../tools/baseDb.entity';
import { EntityColumn, EntityRelation, OptionalEntityColumn, RelationshipType } from '../../tools/entity.decorator';
import { Donor } from '../donor/donor';
import { Charity } from '../charity/charity';
import { Campaign } from '../campaign/campaign';

@Entity()
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