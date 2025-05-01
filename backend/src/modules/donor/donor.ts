import { Entity } from 'typeorm';
import { BaseDbEntity } from '../../tools/baseDb.entity';
import { EntityColumn, OptionalEntityColumn, EntityRelation, RelationshipType } from '../../tools/entity.decorator';
import { Donation } from '../donation/donation';

@Entity()
export class Donor extends BaseDbEntity {
    @EntityColumn()
    name!: string;

    @EntityColumn()
    email!: string;

    @EntityColumn()
    phone!: string;

    @EntityColumn({ db: { default: false } })
    isAnonymous!: boolean;

    @EntityRelation({
        type: RelationshipType.ONE_TO_MANY,
        entity: () => Donation,
        inverseSide: (donation: Donation) => donation.donor,
    })
    donations: Donation[] = [];
}