import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class createTransactionCategoryFK1593552418735
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'transaction_CategoryId_FK',
        columnNames: ['categoryId'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropForeignKey('transactions', 'transaction_CategoryId_FK');
  }
}
