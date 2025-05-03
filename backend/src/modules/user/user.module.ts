import {CreateUserDTO, User} from "./user";
import {InjectRepository, TypeOrmModule} from "@nestjs/typeorm";
import {BaseCrudService} from "../../common/base/base-crud.service";
import {Repository} from "typeorm";
import {Controller, Injectable, Module} from "@nestjs/common";
import {BaseCrudController} from "../../common/base/base-crud.controller";

@Injectable()
export class UserService extends BaseCrudService<User> {
    constructor(@InjectRepository(User) repo: Repository<User>) {
        super(repo);
    }
}
@Controller('user')
export class UserController extends BaseCrudController<User, CreateUserDTO> {
    constructor(protected readonly service: UserService) {
        super(service)
    }

    // You can override any base method if needed, e.g. hide passwords in `findAll()`
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