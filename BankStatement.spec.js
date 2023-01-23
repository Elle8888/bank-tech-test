const printBankStatements = require ('./BankStatement.js');

describe("BankStatement functions", () => {
  beforeEach(() => {
  // to reset
  balance = 0;
  transactions = [];
});

  it('printBankStatement should print all transactions', () => {
    const transaction1 = {date: new Date(), credit:500, debit: 0};
    transactions.push(transaction1);
    balance += 500;

    console.log = jest.fn();

    printBankStatements();

    const statement = `${transaction1.date} || ${transaction1.credit} || ${transaction1.debit} || ${balance}`;
    // expect(printBankStatements).toEqual(statement);
    expect(console.log).toHaveBeenCalledWith(statement)
  })
});
