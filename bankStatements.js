const BankTransactions = require("./bankTransactions.js");

class BankStatements {
  constructor() {
    this.bankTransactions = new BankTransactions();
  }

  formatDate(date) {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"});
  }

  printBankStatements() {
    try {
      if (this.bankTransactions.getTransactions().length === 0) {
        throw new Error("No transactions to display.");
      }
      console.log("date || credit || debit || balance");
      this.bankTransactions.getTransactions().forEach((transaction) => {
        let credit = transaction.credit || 0;
        let debit = transaction.debit || 0;
        let currentBalance = transaction.asOfBalance || 0;
        let formattedDate = this.formatDate(transaction.date);
        console.log(`${formattedDate} || ${credit} || ${debit} || ${currentBalance}`);
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = BankStatements