const BankTransactions = require("./bankTransactions.js");

describe("BankTransactions", () => {
  let myAccount;
  let mockDateObject;
  let spy;

  beforeEach(() => {
    // to reset
    balance = 0;
    transactions = [];
    myAccount = new BankTransactions();
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

  it('updates debit and increase account balance by making a deposit', () => {
    myAccount.deposit(500);
    expect(myAccount.balance).toEqual(500);
    expect(myAccount.transactions[0]).toEqual({date: mockDate, credit: 500, debit: null, asOfBalance: 500,});
  });

  it('updates debit and increase account balance with multiple deposits', () => {
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
    expect(output).not.toHaveBeenCalledWith("Invalid amount. Must be a number.");
  });

  it('throws an error when input is zero', () => {
    const output = jest.spyOn(global.console, "log");
    myAccount.deposit(0);
    expect(myAccount.transactions.length).toEqual(0);
    expect(output).not.toHaveBeenCalledWith("Invalid amount. Must be greater than 0.");
  });

  it('updates credit and decrease account balance upon withdrawal', () => {
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
    expect(output).not.toHaveBeenCalledWith("Invalid amount. Must be a number.");
  });

  it('throws an error when withdrawal amount is zero', () => {
    const output = jest.spyOn(global.console, "log");
    myAccount.withdrawal(0);
    expect(myAccount.transactions.length).toEqual(0);
    expect(output).not.toHaveBeenCalledWith("Invalid amount. Must be greater than 0.");
  });

  it('throws an error if balance is insufficient', () => {
    myAccount.balance = 100;
    const output = jest.spyOn(global.console, "log");
    myAccount.withdrawal(500);
    expect(myAccount.balance).toEqual(100);
    expect(myAccount.transactions.length).toEqual(0);
    expect(output).not.toHaveBeenCalledWith("Insufficient funds.");
  });
});