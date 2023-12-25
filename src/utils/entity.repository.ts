import {
    AggregateOptions,
    Document,
    FilterQuery,
    Model,
    MongooseBulkWriteOptions,
    PipelineStage,
    PopulateOptions,
    SortOrder,
    UpdateQuery,
  } from 'mongoose';
  
  type Population = PopulateOptions | (PopulateOptions | string)[];
  
  type Options = {
    sort?: { [key: string]: SortOrder };
    projection?: Record<string, unknown>;
    populate?: Population;
    skip?: number;
    limit?: number;
  };
  
  export abstract class EntityRepository<T extends Document> {
    protected constructor(protected entityModel: Model<T>) {}
  
    async findOne(filter: FilterQuery<T>, options?: Options) {
      const { sort, projection, populate, limit } = options || {};
      let query = this.entityModel.findOne(filter, {
        ...projection,
      });
      if (sort) {
        query = query.sort(sort);
      }
      if (limit) {
        query = query.limit(limit);
      }
      if (populate) {
        query.populate(populate);
      }
      return query.exec();
    }
  
    async find(filter: FilterQuery<T>, options?: Options) {
      const { sort, projection, populate, skip, limit } = options || {};
      const query = this.entityModel.find(filter, { ...projection });
      if (sort) query.sort(sort);
      if (populate) query.populate(populate);
      if (skip) query.skip(skip);
      if (limit) query.limit(limit);
      return query.exec();
    }
  
    async create(createEntityData: unknown) {
      const entity = new this.entityModel(createEntityData);
      return entity.save();
    }
  
    async insertMany(entitiesData: unknown) {
      return this.entityModel.insertMany(entitiesData);
    }
  
    async findOneAndUpdate(
      filter: FilterQuery<T>,
      updateEntityData: UpdateQuery<T>,
      populate?: PopulateOptions,
    ) {
      return this.entityModel.findOneAndUpdate(filter, updateEntityData, {
        new: true,
        populate,
      });
    }
  
    async exists(filter: FilterQuery<T>) {
      return this.entityModel.exists(filter);
    }
  
    async count(filter?: FilterQuery<T>) {
      return this.entityModel.countDocuments(filter);
    }
  
    async deleteMany(filter?: FilterQuery<T>) {
      return this.entityModel.deleteMany(filter);
    }
  
    async updateMany(
      filter: FilterQuery<T> = {},
      updateEntityData: UpdateQuery<T>,
    ) {
      return this.entityModel.updateMany(filter, updateEntityData, {
        new: true,
      });
    }
  
    async findOneAndDelete(filter: FilterQuery<T>) {
      return this.entityModel.findOneAndDelete(filter);
    }
  
    async aggregate(pipeline: PipelineStage[], options?: AggregateOptions) {
      return this.entityModel.aggregate(pipeline, options);
    }
  
    async bulkWrite(ops: any[], options?: MongooseBulkWriteOptions) {
      return this.entityModel.bulkWrite(ops, options);
    }
  }
  