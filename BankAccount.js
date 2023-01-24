class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  printBankStatements() {
    if (this.transactions.length === 0) {
      return console.log("No transactions to display");
    }
    let currentBalance = balance;
    this.transactions.forEach((transaction) => {
      let credit = transaction.credit || 0;
      let debit = transaction.debit || 0;
      currentBalance = currentBalance - debit + credit;
      return console.log(`${transaction.date} || ${credit} || ${debit} || ${currentBalance}`);
      });
  }

  deposit(amount) {
    this.balance += amount;
    this.transactions.push({date: new Date(), credit: amount, debit: null});
  }

  withdrawal(amount) {
    if (amount > this.balance) {
      return console.log ("Insufficient funds");
    }
    else
      this.balance -= amount;
      this.transactions.push({date: new Date(), credit: null, debit: amount});
  }
}

module.exports = BankAccount;