class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    this.balance += amount;
    this.transactions.unshift({date: new Date(), credit: amount, debit: null, asOfBalance: this.balance});
  }

  withdrawal(amount) {
    if (amount > this.balance) {
      return console.log ("Insufficient funds");
    }
    else
      this.balance -= amount;
      this.transactions.unshift({date: new Date(), credit: null, debit: amount, asOfBalance: this.balance});
  }

  printBankStatements() {
    if (this.transactions.length === 0) {
      return console.log("No transactions to display");
    }
    console.log("date || credit || debit || balance");
    this.transactions.forEach((transaction) => {
      let credit = transaction.credit || 0;
      let debit = transaction.debit || 0;
      let currentBalance = transaction.asOfBalance || 0;
      return console.log(`${transaction.date} || ${credit} || ${debit} || ${currentBalance}`);
      });
  }
}

module.exports = BankAccount;