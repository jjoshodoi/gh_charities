import {PickType} from '@nestjs/swagger';
import {Entity} from 'typeorm';
import {BaseDbEntity} from "../../common/entities/baseDb.entity";
import {EntityColumn, EntityRelation, RelationshipType} from '../../common/decorators/entity.decorator';
import {Charity} from '../charity/charity';

@Entity()
export class Location extends BaseDbEntity {
    @EntityColumn()
    city: string = '';

    @EntityColumn()
    region: string = '';

    @EntityColumn()
    country: string = '';

    @EntityRelation({
        type: RelationshipType.ONE_TO_MANY,
        entity: () => Charity,
        inverseSide: (charity: Charity) => charity.location,
    })
    charities: Charity[] = [];
}

export class CreateLocationDTO extends PickType(Location, [] as const) {}
