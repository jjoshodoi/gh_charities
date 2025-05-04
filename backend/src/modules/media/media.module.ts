import { CreateMediaDTO, Media } from "./media";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudService } from "../../common/base/base-crud.service";
import { Repository } from "typeorm";
import { Controller, Injectable, Module } from "@nestjs/common";
import { BaseCrudController } from "../../common/base/base-crud.controller";

@Injectable()
export class MediaService extends BaseCrudService<Media> {
  constructor(@InjectRepository(Media) repo: Repository<Media>) {
    super(repo);
  }
}

@Controller('media')
export class MediaController extends BaseCrudController<Media, CreateMediaDTO> {
  constructor(protected readonly service: MediaService) {
    super(service);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
