import {Entity} from 'typeorm';
import {EntityColumn, OptionalEntityColumn, EntityRelation, RelationshipType} from '../../tools/entity.decorator';
import {BaseDbEntity} from "../../tools/baseDb.entity";
import {Charity} from '../charity/charity';
import {Donation} from '../donation/donation';

@Entity()
export class Campaign extends BaseDbEntity {
    @EntityColumn()
    title!: string;

    @EntityColumn({db: {type: 'decimal'}})
    goalAmount!: number;

    @EntityColumn({db: {type: 'decimal', default: 0}})
    raisedAmount!: number;

    @EntityColumn({db: {type: 'text'}})
    description!: string;

    @EntityColumn()
    startDate!: Date;

    @OptionalEntityColumn()
    endDate?: Date;

    @EntityRelation({
        type: RelationshipType.MANY_TO_ONE,
        entity: () => Charity,
        joinOptions: {name: 'charityId'},
    })
    charity!: Charity;

    @EntityRelation({
        type: RelationshipType.ONE_TO_MANY,
        entity: () => Donation,
        inverseSide: (donation: Donation) => donation.campaign,
    })
    donations: Donation[] = [];
}