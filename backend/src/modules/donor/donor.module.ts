import { CreateDonorDTO, Donor } from "./donor";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudService } from "../../common/base/base-crud.service";
import { Repository } from "typeorm";
import { Controller, Injectable, Module } from "@nestjs/common";
import { BaseCrudController } from "../../common/base/base-crud.controller";
import { CrudEntity } from '../../common/decorators/crud-entity.decorator';
import {Reflector} from "@nestjs/core";

@Injectable()
export class DonorService extends BaseCrudService<Donor> {
  constructor(@InjectRepository(Donor) repo: Repository<Donor>) {
    super(repo);
  }
}

@CrudEntity(Donor, CreateDonorDTO)
@Controller('donor')
export class DonorController extends BaseCrudController<Donor, CreateDonorDTO> {
  constructor(
      protected readonly service: DonorService,
      protected readonly reflector: Reflector
  ) {
    super(service, reflector);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Donor])],
  controllers: [DonorController],
  providers: [DonorService],
  exports: [DonorService],
})
export class DonorModule {}
