import { CreateTestimonialDTO, Testimonial } from "./testimonial";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudService } from "../../common/base/base-crud.service";
import { Repository } from "typeorm";
import { Controller, Injectable, Module } from "@nestjs/common";
import { BaseCrudController } from "../../common/base/base-crud.controller";
import {Reflector} from "@nestjs/core";

@Injectable()
export class TestimonialService extends BaseCrudService<Testimonial> {
  constructor(@InjectRepository(Testimonial) repo: Repository<Testimonial>) {
    super(repo);
  }
}

@Controller('testimonial')
export class TestimonialController extends BaseCrudController<Testimonial, CreateTestimonialDTO> {
  constructor(
      protected readonly service: TestimonialService,
      protected readonly reflector: Reflector
  ) {
    super(service, reflector);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Testimonial])],
  controllers: [TestimonialController],
  providers: [TestimonialService],
  exports: [TestimonialService],
})
export class TestimonialModule {}
