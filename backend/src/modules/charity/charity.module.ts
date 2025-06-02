import {CreateCharityDTO, Charity} from "./charity";
import {InjectRepository, TypeOrmModule} from "@nestjs/typeorm";
import {BaseCrudService} from "../../common/base/base-crud.service";
import {Repository} from "typeorm";
import {Controller, Injectable, Module} from "@nestjs/common";
import {AreaOfFocus} from "../area-of-focus/area-of-focus";
import {BaseCrudController} from "../../common/base/base-crud.controller";
import {CrudEntity} from "../../common/decorators/crud-entity.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class CharityService extends BaseCrudService<Charity> {
    constructor(@InjectRepository(Charity) repo: Repository<Charity>) {
        super(repo);
    }
}

@CrudEntity(Charity, CreateCharityDTO)
@Controller('charity')
export class CharityController extends BaseCrudController<Charity, CreateCharityDTO> {
    constructor(
        protected readonly service: CharityService,
        protected readonly reflector: Reflector
    ) {
        super(service, reflector);
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Charity, AreaOfFocus])],
    controllers: [CharityController],
    providers: [CharityService],
    exports: [CharityService],
})
export class CharityModule {
}
