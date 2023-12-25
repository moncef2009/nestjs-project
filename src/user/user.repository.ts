import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { EntityRepository } from '../utils/entity.repository';

export class UserRepository extends EntityRepository<UserDocument> {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>,
  ) {
    super(model);
  }
}
