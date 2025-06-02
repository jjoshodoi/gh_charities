// src/common/decorators/crud-entity.decorator.ts
import { SetMetadata, Type } from '@nestjs/common';

export const CrudEntity = <T, U>(entity: Type<T>, dto: Type<U>) => {
    return SetMetadata('crud:entity', entity) && SetMetadata('crud:dto', dto);
};
