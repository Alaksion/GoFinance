import { getRepository } from 'typeorm';
import Category from '../models/Category';
import AppError from '../errors/AppError';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<Category> {
    if (!title) {
      throw new AppError('invalid title', 400);
    }

    const CategoryRepository = getRepository(Category);
    const NewCategory = CategoryRepository.create({
      title,
    });
    await CategoryRepository.save(NewCategory);
    return NewCategory;
  }
}

export default CreateCategoryService;
