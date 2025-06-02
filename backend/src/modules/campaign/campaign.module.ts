import {Campaign, CreateCampaignDTO} from "./campaign";
import {InjectRepository, TypeOrmModule} from "@nestjs/typeorm";
import {BaseCrudService} from "../../common/base/base-crud.service";
import {Repository} from "typeorm";
import {Body, Controller, Injectable, Module, Param, Patch} from "@nestjs/common";
import {BaseCrudController} from "../../common/base/base-crud.controller";
import {CrudEntity} from '../../common/decorators/crud-entity.decorator';
import {UserRole} from "../../enums/user.enum";
import {FeaturesEnum} from "../../enums/features.enum";
import {UseCrudGuard} from "../../common/decorators/use-crud-guard.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class CampaignService extends BaseCrudService<Campaign> {
    constructor(@InjectRepository(Campaign) repo: Repository<Campaign>) {
        super(repo);
    }
}

@CrudEntity(Campaign, CreateCampaignDTO)
@Controller('campaign')
export class CampaignController extends BaseCrudController<Campaign, CreateCampaignDTO> {
    constructor(
        protected readonly service: CampaignService,
        protected readonly reflector: Reflector
    ) {
        super(service, reflector);
    }

    @UseCrudGuard({
        roles: [UserRole.EDITOR],
        features: [FeaturesEnum.CAN_EDIT_CAMPAIGN],
    })
    @Patch(':charityId/:id')
    async updateForCharity(@Param('id') id: string, @Param('charityId') charityId: string, @Body() data: any) {
        return this.service.update(+id, data);
    }
}

@Module({
    imports: [TypeOrmModule.forFeature([Campaign])],
    controllers: [CampaignController],
    providers: [CampaignService],
    exports: [CampaignService],
})
export class CampaignModule {
}
