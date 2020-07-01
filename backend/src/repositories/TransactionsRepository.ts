import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const income = transactions
      .map(transaction => {
        if (transaction.type === 'income') {
          return transaction.value;
        }
        return 0;
      })
      .reduce((value, next) => value + next, 0);

    const outcome = transactions
      .map(transaction => {
        if (transaction.type === 'outcome') {
          return transaction.value;
        }
        return 0;
      })
      .reduce((value, next) => value + next, 0);

    return { outcome, income, total: income - outcome };
  }
}

export default TransactionsRepository;
