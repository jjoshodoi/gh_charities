import { CreateTokenDTO, Token } from "./token";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudService } from "../../common/base/base-crud.service";
import { Repository } from "typeorm";
import { Controller, Injectable, Module } from "@nestjs/common";
import { BaseCrudController } from "../../common/base/base-crud.controller";

@Injectable()
export class TokenService extends BaseCrudService<Token> {
  constructor(@InjectRepository(Token) repo: Repository<Token>) {
    super(repo);
  }
}

@Controller('token')
export class TokenController extends BaseCrudController<Token, CreateTokenDTO> {
  constructor(protected readonly service: TokenService) {
    super(service);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
