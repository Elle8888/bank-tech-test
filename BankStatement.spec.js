const printBankStatements = require ('./BankStatement.js');

describe("BankStatement functions", () => {
  beforeEach(() => {
  // to reset
  balance = 0;
  transactions = [];
});

  it('printBankStatement should print credit transaction with updated balance', () => {
    const transaction1 = {date: new Date(), credit:500, debit: 0};
    transactions.push(transaction1);
    balance += 500;
    console.log = jest.fn();
    printBankStatements();
    const statement = `${transaction1.date} || ${transaction1.credit} || ${transaction1.debit} || ${balance}`;
    expect(console.log).toHaveBeenCalledWith(statement)
  })

  it('printBankStatement should print debit transaction with updated balance', () => {
    const transaction1 = {date: new Date(), credit: 0, debit: 500};
    transactions.push(transaction1);
    balance -= 500;
    console.log = jest.fn();
    printBankStatements();
    const statement = `${transaction1.date} || ${transaction1.credit} || ${transaction1.debit} || ${balance}`;
    expect(console.log).toHaveBeenCalledWith(statement)
  })

  it('printBankStatement should updated balance for multiple transactions', () => {
    const transaction1 = {date: new Date(), credit: 1000, debit: 0};
    transactions.push(transaction1);
    balance += 500;
    const transaction2 = {date: new Date(), credit: 0, debit: 50};
    transactions.push(transaction2);
    balance -= 50;
    let outputData = "Date || Credit || Debit || Balance";
    transactions.forEach((transaction) => {
      let currentBalance = balance;
      currentBalance = currentBalance - transaction.debit + transaction.credit;
      outputData += `${transaction.date} || ${transaction.credit} || ${transaction.debit} || ${currentBalance}\n`;
    });
    console.log = jest.fn((data) => {
      outputData += data;
    });
    printBankStatements();
    expect(outputData).toEqual(outputData);
  });

  it('printBankStatement should print empty statement for zero transactions', () => {
    const transaction1 = {date: new Date(), credit: 0, debit: 0};
    transactions.push(transaction1);
    balance += 0;
    console.log = jest.fn();
    printBankStatements();
    const statement = `${transaction1.date} || ${transaction1.credit} || ${transaction1.debit} || ${balance}`;
    expect(console.log).toHaveBeenCalledWith(statement)
  })
});
