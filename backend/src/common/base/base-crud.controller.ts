import {
    Body,
    Controller,
    DefaultValuePipe,
    Delete,
    Get,
    Param,
    ParseBoolPipe,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import {BaseCrudService} from './base-crud.service';
import {RolesGuard} from '../guards/roles.guard';
import {Roles} from '../decorators/roles.decorator';
import {UserRole} from "../../enums/user.enum";
import qs from 'qs';
import {FastifyRequest} from "fastify";
import {QS_OPTIONS} from "../utils/query.options";
import {ObjectLiteral} from "typeorm";

@Controller()
@UseGuards(RolesGuard)
export abstract class BaseCrudController<T extends ObjectLiteral, U> {
    protected constructor(protected readonly service: BaseCrudService<T>) {}

    @Get()
    @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    async findAll() {
        return this.service.findAll();
    }

    @Get('query')
    @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    async findByQuery(@Req() request: FastifyRequest,
                      @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
                      @Query('take', new DefaultValuePipe(100), ParseIntPipe) take: number,
                      @Query('withDeleted', new DefaultValuePipe(false), ParseBoolPipe) withDeleted: boolean,
                      @Query('loadEagerRelations', new DefaultValuePipe(true), ParseBoolPipe) loadEagerRelations: boolean,
                      @Query('transaction', new DefaultValuePipe(false), ParseBoolPipe) transaction: boolean,
                      @Query('comment') comment: string) {

        const query = qs.parse(request.url.split('?')[1], QS_OPTIONS)
        return this.service.findByQuery({...query, skip, take, withDeleted, loadEagerRelations, transaction});
    }

    @Get(':id')
    @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOne(id);
    }

    @Post()
    @Roles(UserRole.ADMIN, UserRole.EDITOR)
    async create(@Body() dto: U) {
        return this.service.create(dto as any);
    }

    @Patch(':id')
    @Roles(UserRole.ADMIN, UserRole.EDITOR)
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.service.update(id, data);
    }

    @Delete(':id')
    @Roles(UserRole.ADMIN)
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.delete(id);
    }
}
