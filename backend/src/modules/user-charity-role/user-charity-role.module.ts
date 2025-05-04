import { CreateUserCharityRoleDTO, UserCharityRole } from "./user-charity-role";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudService } from "../../common/base/base-crud.service";
import { Repository } from "typeorm";
import { Controller, Injectable, Module } from "@nestjs/common";
import { BaseCrudController } from "../../common/base/base-crud.controller";

@Injectable()
export class UserCharityRoleService extends BaseCrudService<UserCharityRole> {
  constructor(@InjectRepository(UserCharityRole) repo: Repository<UserCharityRole>) {
    super(repo);
  }
}

@Controller('user-charity-role')
export class UserCharityRoleController extends BaseCrudController<UserCharityRole, CreateUserCharityRoleDTO> {
  constructor(protected readonly service: UserCharityRoleService) {
    super(service);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([UserCharityRole])],
  controllers: [UserCharityRoleController],
  providers: [UserCharityRoleService],
  exports: [UserCharityRoleService],
})
export class UserCharityRoleModule {}
