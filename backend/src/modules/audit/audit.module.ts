import {Audit, CreateAuditDTO} from "./audit";
import {InjectRepository, TypeOrmModule} from "@nestjs/typeorm";
import {BaseCrudService} from "../../common/base/base-crud.service";
import {Repository} from "typeorm";
import {Controller, Injectable, Module} from "@nestjs/common";
import {BaseCrudController} from "../../common/base/base-crud.controller";
import { CrudEntity } from '../../common/decorators/crud-entity.decorator';
import {Reflector} from "@nestjs/core";

@Injectable()
export class AuditService extends BaseCrudService<Audit> {
  constructor(@InjectRepository(Audit) repo: Repository<Audit>) {
    super(repo);
  }
}

@CrudEntity(Audit, CreateAuditDTO)
@Controller('audit')
export class AuditController extends BaseCrudController<Audit, CreateAuditDTO> {
  constructor(
      protected readonly service: AuditService,
      protected readonly reflector: Reflector
  ) {
    super(service, reflector);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Audit])],
  controllers: [AuditController],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
