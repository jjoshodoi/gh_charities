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
    Req, SetMetadata,
    UseGuards,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ObjectLiteral } from 'typeorm';
import { Type } from '@nestjs/common';
import { ApiExtraModels } from '@nestjs/swagger';

import { BaseCrudService } from './base-crud.service';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { UserRole } from '../../enums/user.enum';
import { CrudApi } from '../decorators/swagger-generic.decorator';
import { QS_OPTIONS } from '../utils/query.options';

import qs from 'qs';
import {Reflector} from "@nestjs/core";

@Controller()
@UseGuards(RolesGuard)
@ApiExtraModels()
export abstract class BaseCrudController<T extends ObjectLiteral, U> {
    protected readonly entity: Type<T>;
    protected readonly dto: Type<U>;

    protected constructor(
        protected readonly service: BaseCrudService<T>,
        protected readonly reflector: Reflector
    ) {
        this.entity = this.reflector.get<Type<T>>('crud:entity', this.constructor);
        this.dto = this.reflector.get<Type<U>>('crud:dto', this.constructor);
    }

    @CrudApi('findAll')
    @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    async findAll() {
        return this.service.findAll();
    }

    @CrudApi('query')
    @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    async findByQuery(
        @Req() request: FastifyRequest,
        @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
        @Query('take', new DefaultValuePipe(100), ParseIntPipe) take: number,
        @Query('withDeleted', new DefaultValuePipe(false), ParseBoolPipe) withDeleted: boolean,
        @Query('loadEagerRelations', new DefaultValuePipe(true), ParseBoolPipe) loadEagerRelations: boolean,
        @Query('transaction', new DefaultValuePipe(false), ParseBoolPipe) transaction: boolean,
        @Query('comment') comment: string,
    ) {
        const query = qs.parse(request.url.split('?')[1], QS_OPTIONS);
        return this.service.findByQuery({ ...query, skip, take, withDeleted, loadEagerRelations, transaction });
    }

    @CrudApi('findOne')
    @Roles(UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER)
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.service.findOne(id);
    }

    @CrudApi('create')
    @Roles(UserRole.ADMIN, UserRole.EDITOR)
    async create(@Body() body: U) {
        return this.service.create(body as any);
    }

    @CrudApi('update')
    @Roles(UserRole.ADMIN, UserRole.EDITOR)
    async update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return this.service.update(id, data);
    }

    @CrudApi('delete')
    @Roles(UserRole.ADMIN)
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.service.delete(id);
    }
}
