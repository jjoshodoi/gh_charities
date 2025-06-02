import {CreateUserDTO, User} from "./user";
import {InjectRepository, TypeOrmModule} from "@nestjs/typeorm";
import {BaseCrudService} from "../../common/base/base-crud.service";
import {Repository} from "typeorm";
import {Controller, Injectable, Module} from "@nestjs/common";
import {BaseCrudController} from "../../common/base/base-crud.controller";
import { CrudEntity } from '../../common/decorators/crud-entity.decorator';

import {Reflector} from "@nestjs/core";

@Injectable()
export class UserService extends BaseCrudService<User> {
    constructor(@InjectRepository(User) repo: Repository<User>) {
        super(repo);
    }
}

@CrudEntity(User, CreateUserDTO)
@Controller('user')
export class UserController extends BaseCrudController<User, CreateUserDTO> {
    constructor(
        protected readonly service: UserService,
        protected readonly reflector: Reflector
    ) {
        super(service, reflector);
    }

    async findAll() {
        const users = await super.findAll();
        return users.map(({ password, ...rest }) => rest);
    }
}


@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})


export class UserModule {}