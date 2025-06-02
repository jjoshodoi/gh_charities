import { CreateLocationDTO, Location } from "./location";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudService } from "../../common/base/base-crud.service";
import { Repository } from "typeorm";
import { Controller, Injectable, Module } from "@nestjs/common";
import { BaseCrudController } from "../../common/base/base-crud.controller";
import { CrudEntity } from '../../common/decorators/crud-entity.decorator';
import {Reflector} from "@nestjs/core";

@Injectable()
export class LocationService extends BaseCrudService<Location> {
  constructor(@InjectRepository(Location) repo: Repository<Location>) {
    super(repo);
  }
}

@CrudEntity(Location, CreateLocationDTO)
@Controller('location')
export class LocationController extends BaseCrudController<Location, CreateLocationDTO> {
  constructor(
      protected readonly service: LocationService,
      protected readonly reflector: Reflector
  ) {
    super(service, reflector);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
