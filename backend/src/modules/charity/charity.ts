import {Entity} from 'typeorm';
import {AreaOfFocus} from '../area-of-focus/area-of-focus';
import {Location} from '../location/location';
import {Event} from '../event/event';
import {Campaign} from '../campaign/campaign';
import {User} from "../user/user";
import {BaseDbEntity} from "../../common/entities/baseDb.entity";
import {PickType} from "@nestjs/swagger";
import {
    EntityColumn,
    EntityRelation,
    OptionalEntityColumn,
    RelationshipType
} from "../../common/decorators/entity.decorator";

@Entity()
export class Charity extends BaseDbEntity {
    @EntityColumn()
    name?: string;

    @OptionalEntityColumn()
    registrationNumber?: string;

    @EntityColumn()
    description?: string;

    @OptionalEntityColumn({api: {format: 'email'}})
    email?: string;

    @OptionalEntityColumn()
    phone?: string;

    @OptionalEntityColumn({api: {format: 'uri'}})
    website?: string;

    @OptionalEntityColumn()
    foundedYear?: number;

    @OptionalEntityColumn({api: {format: 'uri'}})
    logoUrl?: string;

    @EntityColumn({db: {default: 'active'}})
    status!: string;

    @EntityRelation({
        type: RelationshipType.MANY_TO_ONE,
        entity: () => Location,
        joinOptions: {name: 'locationId'},
    })
    location?: Location;

    @EntityRelation({
        type: RelationshipType.ONE_TO_MANY,
        entity: () => Event,
        inverseSide: (event: Event) => event.charity,
    })
    events?: Event[];

    @EntityRelation({
        type: RelationshipType.ONE_TO_MANY,
        entity: () => Campaign,
        inverseSide: (campaign: Campaign) => campaign.charity,
    })
    campaigns?: Campaign[];

    @EntityRelation({
        type: RelationshipType.ONE_TO_MANY,
        entity: () => User,
        inverseSide: (user: User) => user.charity,
    })
    users?: User[];

    @EntityRelation({
        type: RelationshipType.MANY_TO_MANY,
        entity: () => AreaOfFocus,
        inverseSide: (area: AreaOfFocus) => area.charities,
    })
    areasOfFocus: AreaOfFocus[] = [];
}

export class CreateCharityDTO extends PickType(Charity, [
    'name',
    'description',
    'registrationNumber',
    'email',
    'phone',
    'website',
    'foundedYear',
    'logoUrl',
    'status',
    'location',
    'areasOfFocus'
] as const) {}