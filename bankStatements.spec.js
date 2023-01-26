const bankStatement = require("./bankStatements.js");

describe("BankTransactions", () => {
    let myAccount;
    let myStatement;
    let mockDate;
    let spy;

    beforeEach(() => {
        myStatement = new bankStatement();
        myAccount = myStatement.bankTransactions
      });

    beforeEach(() => {
      // to reset
      balance = 0;
      transactions = [];
    });

    beforeEach(() => {
      mockDate = new Date("2021-02-07")
      spy = jest
        .spyOn(global, "Date")
        .mockImplementation(() => mockDate);
    })

    afterEach(() => {
      spy.mockRestore();
    })

it('prints the list of transactions and current balance', () => {
    myAccount.deposit(1000)
    expect(myAccount.balance).toEqual(1000);
    myAccount.deposit(2000)
    expect(myAccount.balance).toEqual(3000);
    myAccount.withdrawal(500)
    expect(myAccount.balance).toEqual(2500);
    const output = jest.spyOn(global.console, "log");

    myStatement.printBankStatements();
    expect(myAccount.transactions.length).toEqual(3);
    expect(myAccount.transactions[2].credit).toEqual(1000);
    expect(myAccount.transactions[1].credit).toEqual(2000);
    expect(myAccount.transactions[0].asOfBalance).toEqual(2500);
    expect(output).toHaveBeenCalled();
    // to check the string output
    expect(output).toHaveBeenCalledWith(expect.stringMatching("date || credit || debit || balance"))
    expect(output).toHaveBeenCalledWith(expect.stringMatching("07/02/2021 || 0 || 500 || 2500"))
    expect(output).toHaveBeenCalledWith(expect.stringMatching("07/02/2021 || 2000 || 0 || 3000"))
    expect(output).toHaveBeenCalledWith(expect.stringMatching("07/02/2021 || 1000 || 0 || 1000"))
    // to check the order of the string output
    const expectedOutput = ["date || credit || debit || balance",
    "07/02/2021 || 0 || 500 || 2500", "07/02/2021 || 2000 || 0 || 3000",
    "07/02/2021 || 1000 || 0 || 1000" ];
    expectedOutput.forEach((expectedLine, index) => {
        expect(output).toHaveBeenNthCalledWith(index + 1, expectedLine);
    });

    output.mockRestore();
  })

  it('prints multiple bank statements after a transaction', () => {
    myAccount.balance = 1000
    expect(myAccount.balance).toEqual(1000);
    myAccount.deposit(2000)
    expect(myAccount.balance).toEqual(3000);
    myAccount.withdrawal(500)
    expect(myAccount.balance).toEqual(2500);
    const output = jest.spyOn(global.console, "log");

    myStatement.printBankStatements();
    expect(myAccount.transactions.length).toEqual(2);
    expect(myAccount.transactions[0].asOfBalance).toEqual(2500);
    expect(output).toHaveBeenCalled();

    const expectedOutput = ["date || credit || debit || balance",
    "07/02/2021 || 0 || 500 || 2500", "07/02/2021 || 2000 || 0 || 3000"];
    expectedOutput.forEach((expectedLine, index) => {
        expect(output).toHaveBeenNthCalledWith(index + 1, expectedLine);
    });

    myStatement.printBankStatements();
    expect(myAccount.transactions.length).toEqual(2);
    expect(myAccount.transactions[0].asOfBalance).toEqual(2500);
    expect(output).toHaveBeenCalled();
    expectedOutput.forEach((expectedLine, index) => {
        expect(output).toHaveBeenNthCalledWith(index + 1, expectedLine);
    });
    output.mockRestore();
  })

  it('prints updated bank statements after every transaction', () => {
    myAccount.balance = 1000
    expect(myAccount.balance).toEqual(1000);
    myAccount.deposit(2000)
    expect(myAccount.balance).toEqual(3000);
    const output = jest.spyOn(global.console, "log");

    myStatement.printBankStatements();
    expect(myAccount.transactions.length).toEqual(1);
    expect(myAccount.transactions[0].asOfBalance).toEqual(3000);
    expect(output).toHaveBeenCalled();
    expect(output).toHaveBeenCalledWith(expect.stringMatching("date || credit || debit || balance"))
    expect(output).toHaveBeenCalledWith(expect.stringMatching("07/02/2021 || 2000 || 0 || 3000"))

    myAccount.withdrawal(500)
    expect(myAccount.balance).toEqual(2500);
    myStatement.printBankStatements();
    expect(myAccount.transactions.length).toEqual(2);
    expect(myAccount.transactions[0].asOfBalance).toEqual(2500);
    expect(output).toHaveBeenCalled();
    expect(output).toHaveBeenCalledWith(expect.stringMatching("date || credit || debit || balance"));
    expect(output).toHaveBeenCalledWith(expect.stringMatching("07/02/2021 || 0 || 500 || 2500"));
    expect(output).toHaveBeenCalledWith(expect.stringMatching("07/02/2021 || 2000 || 0 || 3000"));
    output.mockRestore();
  })

  it('throws an error for zero transactions', () => {
    expect(myAccount.balance).toEqual(0);
    const output = jest.spyOn(global.console, "log");

    myStatement.printBankStatements();
    expect(myAccount.transactions.length).toEqual(0);
    expect(output).not.toHaveBeenCalledWith("No transactions to display.");
    output.mockRestore();
  })

  it('prints statement excluding transaction for withdrawals exceeding the balance', () => {
    myAccount.deposit(400)
    myAccount.withdrawal(500)
    expect(myAccount.balance).toEqual(400);
    const output = jest.spyOn(global.console, "log");

    myStatement.printBankStatements();
    expect(myAccount.transactions.length).toEqual(1);
    expect(output).toHaveBeenCalled();
    expect(output).toHaveBeenCalledWith(expect.stringMatching("date || credit || debit || balance"));
    expect(output).toHaveBeenCalledWith(expect.stringMatching("07/02/2021 || 400 || 0 || 400"));
    output.mockRestore();
  })
});