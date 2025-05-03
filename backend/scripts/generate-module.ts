import * as fs from 'fs';
import * as path from 'path';

const entity = process.argv[2];

if (!entity) {
    console.error('❌ Please provide an entity name (e.g. `user`)');
    process.exit(1);
}

const className = entity.charAt(0).toUpperCase() + entity.slice(1);
const folderPath = path.resolve(__dirname, `../src/modules/${entity}`);
const filePath = path.join(folderPath, `${entity}.module.ts`);

if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
}

const template = `import { Create${className}DTO, ${className} } from "./${entity}";
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

fs.writeFileSync(filePath, template);
console.log(`✅ ${className} module scaffold generated at ${filePath}`);
