import { CreateAuditDTO, Audit } from "./audit";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudService } from "../../common/base/base-crud.service";
import { Repository } from "typeorm";
import { Controller, Injectable, Module } from "@nestjs/common";
import { BaseCrudController } from "../../common/base/base-crud.controller";

@Injectable()
export class AuditService extends BaseCrudService<Audit> {
  constructor(@InjectRepository(Audit) repo: Repository<Audit>) {
    super(repo);
  }
}

@Controller('audit')
export class AuditController extends BaseCrudController<Audit, CreateAuditDTO> {
  constructor(protected readonly service: AuditService) {
    super(service);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Audit])],
  controllers: [AuditController],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
