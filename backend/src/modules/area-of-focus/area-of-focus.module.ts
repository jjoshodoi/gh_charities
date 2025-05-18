import { CreateAreaOfFocusDTO, AreaOfFocus } from "./area-of-focus";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudService } from "../../common/base/base-crud.service";
import { Repository } from "typeorm";
import { Controller, Injectable, Module } from "@nestjs/common";
import { BaseCrudController } from "../../common/base/base-crud.controller";
import {Charity} from "../charity/charity";

@Injectable()
export class AreaOfFocusService extends BaseCrudService<AreaOfFocus> {
  constructor(@InjectRepository(AreaOfFocus) repo: Repository<AreaOfFocus>) {
    super(repo);
  }
}

@Controller('area-of-focus')
export class AreaOfFocusController extends BaseCrudController<AreaOfFocus, CreateAreaOfFocusDTO> {
  constructor(protected readonly service: AreaOfFocusService) {
    super(service);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([AreaOfFocus, Charity])],
  controllers: [AreaOfFocusController],
  providers: [AreaOfFocusService],
  exports: [AreaOfFocusService],
})
export class AreaOfFocusModule {}
