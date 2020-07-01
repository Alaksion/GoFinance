// import AppError from '../errors/AppError';
import { getCustomRepository, getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionRepository from '../repositories/TransactionsRepository';
import CreateCategoryService from './CreateCategoryService';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  value: number;
  category: string;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    category,
    type,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const categoryRepository = getRepository(Category);
    const { total } = await transactionRepository.getBalance();

    if (type === 'outcome' && value > total) {
      throw new AppError('Insuficient funds', 400);
    }

    const findCategory = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!findCategory) {
      const createCategoryService = new CreateCategoryService();
      const createdCategory = await createCategoryService.execute({
        title: category,
      });
      const newTransaction = transactionRepository.create({
        title,
        value,
        type,
        categoryId: createdCategory.id,
      });
      await transactionRepository.save(newTransaction);
      return newTransaction;
    }

    const newTransaction = transactionRepository.create({
      title,
      value,
      type,
      categoryId: findCategory?.id,
    });

    await transactionRepository.save(newTransaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
