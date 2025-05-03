import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter entity name: ', (entity) => {
  rl.close();

  if (!entity) {
    console.error('❌ No entity name provided.');
    process.exit(1);
  }

  const className = entity.charAt(0).toUpperCase() + entity.slice(1);
  const basePath = path.resolve(__dirname, `../src/modules/${entity}`);
  const entityPath = path.join(basePath, `${entity}.ts`);
  const modulePath = path.join(basePath, `${entity}.module.ts`);

  const entityTemplate = `import { ApiHideProperty, PickType } from "@nestjs/swagger";
import { Entity } from "typeorm";
import { BaseDbEntity } from "../../common/entities/baseDb.entity";
import {
  EntityColumn,
  EntityEnumColumn,
  EntityRelation,
  OptionalEntityColumn,
  RelationshipType
} from "../../common/decorators/entity.decorator";

@Entity('${entity}')
export class ${className} extends BaseDbEntity {
  @EntityColumn()
  name!: string;
}

export class Create${className}DTO extends PickType(${className}, ["name"] as const) {}
`;

  const moduleTemplate = `import { Create${className}DTO, ${className} } from "./${entity}";
import { InjectRepository, TypeOrmModule } from "@nestjs/typeorm";
import { BaseCrudService } from "../../common/base/base-crud.service";
import { Repository } from "typeorm";
import { Controller, Injectable, Module } from "@nestjs/common";
import { BaseCrudController } from "../../common/base/base-crud.controller";

@Injectable()
export class ${className}Service extends BaseCrudService<${className}> {
  constructor(@InjectRepository(${className}) repo: Repository<${className}>) {
    super(repo);
  }
}

@Controller('${entity}')
export class ${className}Controller extends BaseCrudController<${className}, Create${className}DTO> {
  constructor(protected readonly service: ${className}Service) {
    super(service);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([${className}])],
  controllers: [${className}Controller],
  providers: [${className}Service],
  exports: [${className}Service],
})
export class ${className}Module {}
`;

  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }

  fs.writeFileSync(entityPath, entityTemplate);
  fs.writeFileSync(modulePath, moduleTemplate);

  console.log(`✅ Generated:
- Entity + DTO: ${entityPath}
- Module: ${modulePath}`);
});
