import { PickType } from '@nestjs/swagger';
import { Entity } from 'typeorm';
import { BaseDbEntity } from '../../common/entities/baseDb.entity';
import { Donation } from '../donation/donation';
import { EntityRelation, RelationshipType, EntityColumn } from '../../common/decorators/entity.decorator';

@Entity('donor')
export class Donor extends BaseDbEntity {
    @EntityColumn()
    name!: string;

    @EntityColumn()
    email!: string;

    @EntityColumn()
    phone!: string;

    @EntityColumn({ db: { default: true } })
    isAnonymous!: boolean;

    @EntityRelation({
        type: RelationshipType.ONE_TO_MANY,
        entity: () => Donation,
        inverseSide: (donation: Donation) => donation.donor,
    })
    donations: Donation[] = [];
}

export class CreateDonorDTO extends PickType(Donor, [
    'name',
    'email',
    'phone',
    'isAnonymous'
] as const) {}
