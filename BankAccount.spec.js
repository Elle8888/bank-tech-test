const BankAccount = require('./BankAccount.js');

describe("BankAccount", () => {
  let myAccount;
  let mockDateObject;
  let spy;

  beforeEach(() => {
    // to reset
    balance = 0;
    transactions = [];
    myAccount = new BankAccount();
  });

  beforeEach(() => {
    // to mock new Date
    mockDate = new Date('2022-02-26T20:42:16.652Z');
    spy = jest
      .spyOn(global, "Date")
      .mockImplementation(() => mockDate);
  })

  afterEach(() => {
    spy.mockRestore();
  })

  it('deposit updates debit and increase account balance', () => {
    myAccount.deposit(500);
    expect(myAccount.balance).toEqual(500);
    expect(myAccount.transactions[0]).toEqual({date: mockDate, credit: 500, debit: null});
  });

  it('multiple deposits updates debit and increase account balance', () => {
    myAccount.deposit(500);
    expect(myAccount.balance).toEqual(500);
    myAccount.deposit(1000);
    expect(myAccount.balance).toEqual(1500);
    expect(myAccount.transactions.length).toEqual(2)
    expect(myAccount.transactions[0]).toMatchObject({credit: 500, debit: null});
    expect(myAccount.transactions[1]).toEqual({date: mockDate, credit: 1000, debit: null});
  });

  it('withdrawal updates credit and decrease account balance', () => {
    myAccount.deposit(2000);
    expect(myAccount.balance).toEqual(2000);
    myAccount.withdrawal(500);
    expect(myAccount.balance).toEqual(1500);
    expect(myAccount.transactions[1]).toEqual({date: mockDate, credit: null, debit: 500});
  });

  it('rejects a withdrawal if balance is insufficient', () => {
    myAccount.withdrawal(500);
    expect(myAccount.balance).toEqual(0);
    expect(myAccount.transactions.length).toEqual(0)
  });

  it('printBankStatement prints the list of transactions and current balance', () => {
    myAccount.deposit(1000)
    myAccount.deposit(2000)
    myAccount.withdrawal(500)
    expect(myAccount.balance).toEqual(2500);
    // const output = jest.spyOn(global.console, "log").mockImplementation();
    const output = jest.spyOn(global.console, "log");

    myAccount.printBankStatements();
    expect(output).toHaveBeenCalled();
    expect(output).toHaveBeenCalledWith(`${mockDate} || 1000 || 0 || 1000`);
    expect(output).toHaveBeenCalledWith(`${mockDate} || 2000 || 0 || 3000`);
    expect(output).toHaveBeenCalledWith(`${mockDate} || 0 || 500 || 2500`);
    output.mockRestore();

  // const statement = `${transaction1.date} || ${transaction1.credit} || ${transaction1.debit} || ${balance}`;
    // expect(console.log).toHaveBeenCalledWith(statement)
  //   let outputData = "Date || Credit || Debit || Balance";
  // console.log = jest.fn((data) => {
  //   outputData += data;
  // });
  // myAccount.printBankStatements();
  // let currentBalance = myAccount.balance;
  // myAccount.transactions.forEach((transaction) => {
  //   let credit = transaction.credit || 0;
  //   let debit = transaction.debit || 0;
  //   currentBalance = currentBalance - debit + credit;
  //   outputData += `${transaction.date} || ${credit} || ${debit} || ${currentBalance}\n`;
  // });
  // expect(outputData).toEqual(outputData);
  })

  // it('printBankStatement should print debit transaction with updated balance', () => {
  //   const transaction1 = {date: new Date(), credit: 0, debit: 500};
  //   transactions.push(transaction1);
  //   balance -= 500;
  //   console.log = jest.fn();
  //   printBankStatements();
  //   const statement = `${transaction1.date} || ${transaction1.credit} || ${transaction1.debit} || ${balance}`;
  //   expect(console.log).toHaveBeenCalledWith(statement)
  // })

  // it('printBankStatement should updated balance for multiple transactions', () => {
  //   const transaction1 = {date: new Date(), credit: 1000, debit: 0};
  //   transactions.push(transaction1);
  //   balance += 500;
  //   const transaction2 = {date: new Date(), credit: 0, debit: 50};
  //   transactions.push(transaction2);
  //   balance -= 50;
  //   let outputData = "Date || Credit || Debit || Balance";
  //   transactions.forEach((transaction) => {
  //     let currentBalance = balance;
  //     currentBalance = currentBalance - transaction.debit + transaction.credit;
  //     outputData += `${transaction.date} || ${transaction.credit} || ${transaction.debit} || ${currentBalance}\n`;
  //   });
  //   console.log = jest.fn((data) => {
  //     outputData += data;
  //   });
  //   printBankStatements();
  //   expect(outputData).toEqual(outputData);
  // });

  // it('printBankStatement should print empty statement for zero transactions', () => {
  //   const transaction1 = {date: new Date(), credit: 0, debit: 0};
  //   transactions.push(transaction1);
  //   balance += 0;
  //   console.log = jest.fn();
  //   printBankStatements();
  //   const statement = `${transaction1.date} || ${transaction1.credit} || ${transaction1.debit} || ${balance}`;
  //   expect(console.log).toHaveBeenCalledWith(statement)
  // })
});

// Here is an example of how you can rewrite the test to assert on the balance and the transactions instead of the output of console.log:

// Copy code
// it('printBankStatement prints the list of transactions and current balance', () => {
//     myAccount.deposit(1000)
//     myAccount.deposit(2000)
//     myAccount.withdrawal(500)
//     expect(myAccount.balance).toEqual(2500);
//     const transactions = myAccount.getTransactions();
//     expect(transactions.length).toEqual(3);
//     expect(transactions[0].amount).toEqual(1000);
//     expect(transactions[0].type).toEqual("deposit");
//     expect(transactions[1].amount).toEqual(2000);
//     expect(transactions[1].type).toEqual("deposit");
//     expect(transactions[2].amount).toEqual(500);
//     expect(transactions[2].type).toEqual("withdrawal");
// });