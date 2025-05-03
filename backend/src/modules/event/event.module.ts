import { CreateEventDTO, Event } from "./event";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudService } from "../../common/base/base-crud.service";
import { Repository } from "typeorm";
import { Controller, Injectable, Module } from "@nestjs/common";
import { BaseCrudController } from "../../common/base/base-crud.controller";

@Injectable()
export class EventService extends BaseCrudService<Event> {
  constructor(@InjectRepository(Event) repo: Repository<Event>) {
    super(repo);
  }
}

@Controller('event')
export class EventController extends BaseCrudController<Event, CreateEventDTO> {
  constructor(protected readonly service: EventService) {
    super(service);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
