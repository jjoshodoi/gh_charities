import {CreateDonationDTO, Donation} from "./donation";
import {InjectRepository, TypeOrmModule} from "@nestjs/typeorm";
import {BaseCrudService} from "../../common/base/base-crud.service";
import {Repository} from "typeorm";
import {Controller, Injectable, Module} from "@nestjs/common";
import {BaseCrudController} from "../../common/base/base-crud.controller";
import { CrudEntity } from '../../common/decorators/crud-entity.decorator';
import {Reflector} from "@nestjs/core";

@Injectable()
export class DonationService extends BaseCrudService<Donation> {
    constructor(@InjectRepository(Donation) repo: Repository<Donation>) {
        super(repo);
    }
}

@CrudEntity(Donation, CreateDonationDTO)
@Controller('donation')
export class DonationController extends BaseCrudController<Donation, CreateDonationDTO> {
    constructor(
        protected readonly service: DonationService,
        protected readonly reflector: Reflector
    ) {
        super(service, reflector);
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Donation])],
    controllers: [DonationController],
    providers: [DonationService],
    exports: [DonationService],
})
export class DonationModule {
}
