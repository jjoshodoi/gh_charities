import {CreateMediaDTO, Media} from "./media";
import {InjectRepository, TypeOrmModule} from "@nestjs/typeorm";
import {BaseCrudService} from "../../common/base/base-crud.service";
import {Repository} from "typeorm";
import {Controller, Injectable, Module} from "@nestjs/common";
import {BaseCrudController} from "../../common/base/base-crud.controller";
import { CrudEntity } from '../../common/decorators/crud-entity.decorator';
import {Reflector} from "@nestjs/core";

@Injectable()
export class MediaService extends BaseCrudService<Media> {
    constructor(@InjectRepository(Media) repo: Repository<Media>) {
        super(repo);
    }
}

@CrudEntity(Media, CreateMediaDTO)
@Controller('media')
export class MediaController extends BaseCrudController<Media, CreateMediaDTO> {
    constructor(
        protected readonly service: MediaService,
        protected readonly reflector: Reflector
    ) {
        super(service, reflector);
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Media])],
    controllers: [MediaController],
    providers: [MediaService],
    exports: [MediaService],
})
export class MediaModule {
}
