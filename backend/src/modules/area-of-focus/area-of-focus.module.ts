import {AreaOfFocus, CreateAreaOfFocusDTO} from "./area-of-focus";
import {InjectRepository, TypeOrmModule} from "@nestjs/typeorm";
import {BaseCrudService} from "../../common/base/base-crud.service";
import {Repository} from "typeorm";
import {Controller, Injectable, Module} from "@nestjs/common";
import {BaseCrudController} from "../../common/base/base-crud.controller";
import {CrudEntity} from "../../common/decorators/crud-entity.decorator";
import {Charity} from "../charity/charity";
import {Reflector} from "@nestjs/core";

@Injectable()
export class AreaOfFocusService extends BaseCrudService<AreaOfFocus> {
    constructor(@InjectRepository(AreaOfFocus) repo: Repository<AreaOfFocus>) {
        super(repo);
    }
}

@CrudEntity(AreaOfFocus, CreateAreaOfFocusDTO)
@Controller('area-of-focus')
export class AreaOfFocusController extends BaseCrudController<AreaOfFocus, CreateAreaOfFocusDTO> {
    constructor(
        protected readonly service: AreaOfFocusService,
        protected readonly reflector: Reflector
    ) {
        super(service, reflector);
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([AreaOfFocus, Charity])],
    controllers: [AreaOfFocusController],
    providers: [AreaOfFocusService],
    exports: [AreaOfFocusService],
})
export class AreaOfFocusModule {
}
