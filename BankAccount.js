class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  printBankStatements() {
    if (this.transactions.length === 0) {
      return console.log("No transactions to display");
    }
    this.transactions.reverse().forEach((transaction) => {
      let credit = transaction.credit || 0;
      let debit = transaction.debit || 0;
      let currentBalance = transaction.asOfBalance || 0;
      return console.log(`${transaction.date} || ${credit} || ${debit} || ${currentBalance}`);
      });
  }
  // printBankStatements() {
  //   if (this.transactions.length === 0) {
  //     return console.log("No transactions to display");
  //   }
  //   let currentBalance = 0;
  //   for (let i = this.transactions.length - 1; i >= 0; i--) {
  //     let transaction = this.transactions[i];
  //     let credit = transaction.credit || 0;
  //     let debit = transaction.debit || 0;
  //     currentBalance = currentBalance + credit - debit;
  //     console.log(`${transaction.date} || ${credit} || ${debit} || ${currentBalance}`);
  //   }
  // }
//   printBankStatements() {
//     if (this.transactions.length === 0) {
//       return console.log("No transactions to display");
//     }
//     let currentBalance = 0; // initialize to starting balance
//     this.transactions.reverse(); // reverse the order of the transactions
//     this.transactions.forEach((transaction) => {
//       let credit = transaction.credit || 0;
//       let debit = transaction.debit || 0;
//       currentBalance = currentBalance - credit + debit; // subtract credit and add debit
//       console.log(`${transaction.date} || ${credit} || ${debit} || ${currentBalance}`);
//     });
// }
  deposit(amount) {
    this.balance += amount;
    this.transactions.push({date: new Date(), credit: amount, debit: null, asOfBalance: this.balance});
  }

  withdrawal(amount) {
    if (amount > this.balance) {
      return console.log ("Insufficient funds");
    }
    else
      this.balance -= amount;
      this.transactions.push({date: new Date(), credit: null, debit: amount, asOfBalance: this.balance});
  }
}

module.exports = BankAccount;