import {
    applyDecorators,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    Query,
    Req,
    UseGuards,
    Controller,
    Type,
    SetMetadata,
} from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiBody,
} from '@nestjs/swagger';
import { Reflector } from '@nestjs/core';

export type CrudOperation = 'findAll' | 'query' | 'findOne' | 'create' | 'update' | 'delete';

export function CrudApi(operation: CrudOperation, path?: string): MethodDecorator {
    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const reflector = new Reflector();
        const controllerClass = target.constructor;

        const entity = reflector.get('crud:entity', controllerClass);
        const dto = reflector.get('crud:dto', controllerClass);

        const decorators = [];

        const routePath = path ?? (operation === 'query' ? 'query' : operation === 'findOne' || operation === 'update' || operation === 'delete' ? ':id' : '');

        switch (operation) {
            case 'findAll':
                decorators.push(Get());
                decorators.push(ApiOperation({ summary: 'Get all' }));
                decorators.push(ApiOkResponse({ type: entity, isArray: true }));
                break;
            case 'query':
                decorators.push(Get(routePath));
                decorators.push(ApiOperation({ summary: 'Query with filters' }));
                decorators.push(ApiOkResponse({ type: entity, isArray: true }));
                break;
            case 'findOne':
                decorators.push(Get(routePath));
                decorators.push(ApiOperation({ summary: 'Get one' }));
                decorators.push(ApiOkResponse({ type: entity }));
                break;
            case 'create':
                decorators.push(Post());
                decorators.push(ApiOperation({ summary: 'Create' }));
                decorators.push(ApiBody({ type: dto }));
                decorators.push(ApiOkResponse({ type: entity }));
                break;
            case 'update':
                decorators.push(Patch(routePath));
                decorators.push(ApiOperation({ summary: 'Update' }));
                decorators.push(ApiBody({ type: dto }));
                decorators.push(ApiOkResponse({ type: entity }));
                break;
            case 'delete':
                decorators.push(Delete(routePath));
                decorators.push(ApiOperation({ summary: 'Delete' }));
                decorators.push(ApiOkResponse({ type: entity }));
                break;
        }

        applyDecorators(...decorators)(target, propertyKey, descriptor);
    };
}
