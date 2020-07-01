import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import Transaction from '../models/Transaction';

class ImportTransactionsService {
  async execute(): Promise<Transaction[]> {
    const filePath = path.resolve(
      __dirname,
      '..',
      '__tests__',
      'import_template.csv',
    );
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', row => {
        console.log(row);
      })
      .on('end', () => {
        console.log('end of file');
      });
    return [];
  }
}

export default ImportTransactionsService;
