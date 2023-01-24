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
    const output = jest.spyOn(global.console, "log");

    myAccount.printBankStatements();
    expect(myAccount.transactions.length).toEqual(3);
    expect(myAccount.transactions[0].credit).toEqual(1000);
    expect(myAccount.transactions[1].credit).toEqual(2000);
    expect(myAccount.transactions[2].debit).toEqual(500);
    expect(output).toHaveBeenCalled();
    expect(output).toHaveBeenCalledWith(`${mockDate} || 1000 || 0 || 1000`);
    expect(output).toHaveBeenCalledWith(`${mockDate} || 2000 || 0 || 3000`);
    expect(output).toHaveBeenCalledWith(`${mockDate} || 0 || 500 || 2500`);
    output.mockRestore();
  })

  it('printBankStatement should print empty statement for zero transactions', () => {
    expect(myAccount.balance).toEqual(0);
    const output = jest.spyOn(global.console, "log");

    myAccount.printBankStatements();
    expect(myAccount.transactions.length).toEqual(0);
    expect(output).toHaveBeenCalled();
    expect(output).toHaveBeenCalledWith(`${null} || 0 || 0 || 0`);
    output.mockRestore();
  })
});