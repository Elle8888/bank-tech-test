class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  printBankStatements = () => {
    let currentBalance = balance;
    if (this.transactions.length === 0) {
      return console.log("No transactions to display");
    }
    this.transactions.forEach((transaction) => {
      let credit = transaction.credit || 0;
      let debit = transaction.debit || 0;
      currentBalance = currentBalance - debit + credit;
      console.log(`${transaction.date} || ${credit} || ${debit} || ${currentBalance}`);
      });
  }

  deposit = (amount) => {
    this.balance += amount;
    this.transactions.push({date: new Date(), credit: amount, debit: null});
  }

  withdrawal = (amount) => {
    if (amount > this.balance) {
      return console.log ("insufficient funds");
    }
    else
      this.balance -= amount;
      this.transactions.push({date: new Date(), credit: null, debit: amount});
  }
}

module.exports = BankAccount;