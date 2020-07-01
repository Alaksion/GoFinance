import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';
import TransactionsRepository from '../repositories/TransactionsRepository';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);
  const balance = await transactionRepository.getBalance();
  const transactions = await transactionRepository.find({
    relations: ['category'],
  });

  if (transactions.length === 0) {
    return response.json({ msg: 'No transactions available' });
  }

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const CreateTransaction = new CreateTransactionService();
  const { title, value, category, type } = request.body;
  const newTransaction = await CreateTransaction.execute({
    title,
    value,
    category,
    type,
  });
  return response.json(newTransaction);

  // TODO
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const DeleteTransaction = new DeleteTransactionService();
  await DeleteTransaction.execute({ id });
  return response.status(203).send();
});

transactionsRouter.post('/import', async (request, response) => {
  const ImportTransactions = new ImportTransactionsService();
  ImportTransactions.execute();
  return response.json('ok');
  // TODO
});

export default transactionsRouter;
