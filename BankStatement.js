class BankAccount {
  constructor() {
    let balance = 0;
    let transaction = [];
  }
}

const printBankStatements = () => {
  let currentBalance = balance;
  transactions.forEach((transaction) => {
    let credit = transaction.credit || 0;
    let debit = transaction.debit || 0;
    currentBalance = currentBalance - debit + credit;
    console.log(`${transaction.date} || ${credit} || ${debit} || ${currentBalance}`);
    });
}

deposit = (amount) => {
  this.balance += amount;
  this.transactions.push({date: new Date(), credit: null, debit: amount});
}

withdrawal = (amount) => {
  this.balance -= amount;
  this.transactions.push({date: new Date(), credit: null, debit: amount});
}

module.exports = printBankStatements