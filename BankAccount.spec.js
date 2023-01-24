const BankAccount = require("./bankAccount.js");

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
    mockDate = new Date('26/02/2022');
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
    expect(myAccount.transactions[0]).toEqual({date: mockDate, credit: 500, debit: null, asOfBalance: 500,});
  });

  it('multiple deposits updates debit and increase account balance', () => {
    myAccount.deposit(500);
    expect(myAccount.balance).toEqual(500);
    myAccount.deposit(1000);
    expect(myAccount.balance).toEqual(1500);
    expect(myAccount.transactions.length).toEqual(2)
    expect(myAccount.transactions[1]).toMatchObject({credit: 500, debit: null});
    expect(myAccount.transactions[0]).toEqual({date: mockDate, credit: 1000, debit: null, asOfBalance: 1500});
  });

  it('throws an error when input is not a number', () => {
    const output = jest.spyOn(global.console, "log");
    myAccount.deposit("Hi");
    expect(myAccount.transactions.length).toEqual(0);
    expect(output).not.toHaveBeenCalledWith("Invalid deposit amount. Must be a number.");
  });

  it('throws an error when input is zero', () => {
    const output = jest.spyOn(global.console, "log");
    myAccount.deposit(0);
    expect(myAccount.transactions.length).toEqual(0);
    expect(output).not.toHaveBeenCalledWith("Invalid deposit amount. Must be greater than 0.");
  });

  it('withdrawal updates credit and decrease account balance', () => {
    myAccount.deposit(2000);
    expect(myAccount.balance).toEqual(2000);
    myAccount.withdrawal(500);
    expect(myAccount.balance).toEqual(1500);
    expect(myAccount.transactions[0]).toEqual({date: mockDate, credit: null, debit: 500, asOfBalance: 1500});
  });

  it('throws an error when input is not a number', () => {
    const output = jest.spyOn(global.console, "log");
    myAccount.withdrawal("Hi");
    expect(myAccount.transactions.length).toEqual(0);
    expect(output).not.toHaveBeenCalledWith("Invalid withdrawal amount. Must be a number.");
  });

  it('throws an error when withdrawal amount is zero', () => {
    const output = jest.spyOn(global.console, "log");
    myAccount.withdrawal(0);
    expect(myAccount.transactions.length).toEqual(0);
    expect(output).not.toHaveBeenCalledWith("Invalid withdrawal amount. Must be greater than 0.");
  });

  it('throws an error if balance is insufficient', () => {
    myAccount.balance = 100;
    const output = jest.spyOn(global.console, "log");
    myAccount.withdrawal(500);
    expect(myAccount.balance).toEqual(100);
    expect(myAccount.transactions.length).toEqual(0);
    expect(output).not.toHaveBeenCalledWith("Insufficient funds.");
  });

  it('printBankStatement prints the list of transactions and current balance', () => {
    myAccount.deposit(1000)
    expect(myAccount.balance).toEqual(1000);
    myAccount.deposit(2000)
    expect(myAccount.balance).toEqual(3000);
    myAccount.withdrawal(500)
    expect(myAccount.balance).toEqual(2500);
    const output = jest.spyOn(global.console, "log");

    myAccount.printBankStatements();
    expect(myAccount.transactions.length).toEqual(3);
    expect(myAccount.transactions[2].credit).toEqual(1000);
    expect(myAccount.transactions[1].credit).toEqual(2000);
    expect(myAccount.transactions[0].asOfBalance).toEqual(2500);
    expect(output).toHaveBeenCalled();
    expect(output).toHaveBeenCalledWith(`${myAccount.transactions[2].date} || 0 || 500 || 2500`);
    expect(output).toHaveBeenCalledWith(`${myAccount.transactions[1].date} || 2000 || 0 || 3000`);
    expect(output).toHaveBeenCalledWith(`${myAccount.transactions[0].date} || 1000 || 0 || 1000`);
    output.mockRestore();
  })

  it('prints "No transactions to display" for zero transactions', () => {
    expect(myAccount.balance).toEqual(0);
    const output = jest.spyOn(global.console, "log");

    myAccount.printBankStatements();
    expect(myAccount.transactions.length).toEqual(0);
    expect(output).not.toHaveBeenCalledWith("No transactions to display.");
    output.mockRestore();
  })

  it('prints statement excluding transaction for withdrawals exceeding the balance', () => {
    myAccount.deposit(400)
    myAccount.withdrawal(500)
    expect(myAccount.balance).toEqual(400);
    const output = jest.spyOn(global.console, "log");

    myAccount.printBankStatements();
    expect(myAccount.transactions.length).toEqual(1);
    expect(output).toHaveBeenCalled();
    expect(output).toHaveBeenCalledWith(`${mockDate} || 400 || 0 || 400`);
    output.mockRestore();
  })
});