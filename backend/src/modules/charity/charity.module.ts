import { CreateCharityDTO, Charity } from "./charity";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudService } from "../../common/base/base-crud.service";
import { Repository } from "typeorm";
import { Controller, Injectable, Module } from "@nestjs/common";
import { BaseCrudController } from "../../common/base/base-crud.controller";
import {AreaOfFocus} from "../area-of-focus/area-of-focus";

@Injectable()
export class CharityService extends BaseCrudService<Charity> {
  constructor(@InjectRepository(Charity) repo: Repository<Charity>) {
    super(repo);
  }
}

@Controller('charity')
export class CharityController extends BaseCrudController<Charity, CreateCharityDTO> {
  constructor(protected readonly service: CharityService) {
    super(service);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Charity, AreaOfFocus])],
  controllers: [CharityController],
  providers: [CharityService],
  exports: [CharityService],
})
export class CharityModule {}
