import { CreateCampaignDTO, Campaign } from "./campaign";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudService } from "../../common/base/base-crud.service";
import { Repository } from "typeorm";
import { Controller, Injectable, Module } from "@nestjs/common";
import { BaseCrudController } from "../../common/base/base-crud.controller";

@Injectable()
export class CampaignService extends BaseCrudService<Campaign> {
  constructor(@InjectRepository(Campaign) repo: Repository<Campaign>) {
    super(repo);
  }
}

@Controller('campaign')
export class CampaignController extends BaseCrudController<Campaign, CreateCampaignDTO> {
  constructor(protected readonly service: CampaignService) {
    super(service);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Campaign])],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignModule {}
