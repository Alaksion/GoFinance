import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import TransactionsRepository from '../repositories/TransactionsRepository';
import ImportTransactionService from '../services/ImportTransactionsService';
import UploadConfig from '../config/MulterUpload';

const transactionsRouter = Router();
const upload = multer(UploadConfig);

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

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const FileImporter = new ImportTransactionService();
    const res = await FileImporter.execute(request.file.path);
    return response.json(res);

    // TODO
  },
);

export default transactionsRouter;
