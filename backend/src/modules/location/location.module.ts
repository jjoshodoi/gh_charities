import { CreateLocationDTO, Location } from "./location";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudService } from "../../common/base/base-crud.service";
import { Repository } from "typeorm";
import { Controller, Injectable, Module } from "@nestjs/common";
import { BaseCrudController } from "../../common/base/base-crud.controller";

@Injectable()
export class LocationService extends BaseCrudService<Location> {
  constructor(@InjectRepository(Location) repo: Repository<Location>) {
    super(repo);
  }
}

@Controller('location')
export class LocationController extends BaseCrudController<Location, CreateLocationDTO> {
  constructor(protected readonly service: LocationService) {
    super(service);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
