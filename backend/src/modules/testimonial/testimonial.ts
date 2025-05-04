import {Entity} from 'typeorm';
import {BaseDbEntity} from "../../common/entities/baseDb.entity";
import {EntityColumn, EntityRelation, RelationshipType} from '../../common/decorators/entity.decorator';
import {Charity} from '../charity/charity';
import {PickType} from "@nestjs/swagger";

@Entity()
export class Testimonial extends BaseDbEntity {
    @EntityColumn()
    author: string = '';

    @EntityColumn({ db: { type: 'text' } })
    content: string = '';

    @EntityColumn()
    date: Date = new Date();

    @EntityRelation({
        type: RelationshipType.MANY_TO_ONE,
        entity: () => Charity,
        joinOptions: { name: 'charityId' },
    })
    charity!: Charity;
}

export class CreateTestimonialDTO extends PickType(Testimonial, [] as const) {}
