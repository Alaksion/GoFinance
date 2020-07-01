// import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';
import TransactionRepository from '../repositories/TransactionsRepository';
import AppError from '../errors/AppError';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const findTransaction = await transactionRepository.findOne({
      where: { id },
    });

    if (!findTransaction) {
      throw new AppError('Repository not found', 400);
    }
    await transactionRepository.delete(id);
    // TODO
  }
}

export default DeleteTransactionService;
