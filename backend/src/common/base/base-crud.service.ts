import {
    ArrayContains,
    Between,
    DeepPartial, FindManyOptions,
    FindOptionsRelations,
    FindOptionsWhere, ILike, In, LessThan,
    LessThanOrEqual, MoreThan,
    MoreThanOrEqual, Not,
    ObjectLiteral, Raw,
    Repository
} from 'typeorm';
import {recurseWithAsyncValueFunction, recurseWithObjFunction} from "../utils/helpers";

export abstract class BaseCrudService<T extends ObjectLiteral> {
    keys = ['$gte', '$lte', '$btwn', '$gt', '$lt', '$not', '$in', '$like', '$raw', '$contains'];
    protected constructor(protected readonly repo: Repository<T>) {}


    async findAll(): Promise<T[]> {
        return this.repo.find();
    }
    async findByQuery(query: FindManyOptions<T>): Promise<T[]> {
        const finalQuery = await this.parseQueryOptions(query)
        return this.repo.find(finalQuery);
    }
    async findOne(id: number): Promise<T | null> {
        return this.repo.findOneBy({ id } as unknown as FindOptionsWhere<T>);
    }

    async create(data: T): Promise<T | null> {
        return this.repo.save(data);
    }

    async update(id: number, data: DeepPartial<T>): Promise<DeepPartial<T> | null> {
        return this.repo.save({ ...data, id } as any);
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete(id);
    }

    parseQueryOptions = async (query: FindManyOptions<T>): Promise<FindManyOptions<T>> => {
        let parsedRelations: object | FindOptionsRelations<T>;

        if (query.relations) {
            parsedRelations = (await recurseWithAsyncValueFunction(query.relations, async (obj, key, val) => {
                if (val === 'true') {
                    return true;
                } else {
                    return val;
                }
            })) as FindOptionsRelations<T>;
        } else {
            parsedRelations = {};
        }

        console.log(query.where)

        const parsedWhere = await recurseWithObjFunction(
            query.where,
            (obj: any) => {
                return Object.keys(obj).length === 1 && Object.keys(obj).some((key) => this.keys.includes(key));
            },
            (obj: any) => {
                const specialKey = Object.keys(obj)[0];
                switch (specialKey) {
                    case '$gte':
                        return MoreThanOrEqual(obj[specialKey]);
                    case '$lte':
                        return LessThanOrEqual(obj[specialKey]);
                    case '$btwn':
                        return Between(obj[specialKey][0], obj[specialKey][1]);
                    case '$gt':
                        return MoreThan(obj[specialKey]);
                    case '$lt':
                        return LessThan(obj[specialKey]);
                    case '$not':
                        return Not(obj[specialKey]);
                    case '$in':
                        return In(obj[specialKey]);
                    case '$like':
                        return ILike(obj[specialKey]);
                    case '$raw':
                        return Raw(obj[specialKey]);
                    case '$contains':
                        return ArrayContains(obj[specialKey]);
                    default:
                        return obj;
                }
            }
        );

        return {
            ...query,
            where: parsedWhere,
            relations: parsedRelations
        };
    };
}
