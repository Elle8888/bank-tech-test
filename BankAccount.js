class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    try {
      if (typeof amount !== 'number') {
      throw new Error("Invalid deposit amount. Must be a number.");
      }
      if (amount <= 0) {
      throw new Error("Invalid deposit amount. Must be greater than 0.");
      }
    this.balance += amount;
    this.transactions.unshift({date: new Date(), credit: amount, debit: null, asOfBalance: this.balance});
    } catch (error) {
      console.error(error.message);
    }
  }

  withdrawal(amount) {
    try {
      if (typeof amount !== 'number') {
        throw new Error("Invalid withdrawal amount. Must be a number.");
      }
      if (amount === 0) {
        throw new Error("Invalid withdrawal amount. Must be greater than 0.");
      }
      if (amount > this.balance) {
        throw new Error("Insufficient funds");
      }
      this.balance -= amount;
      this.transactions.unshift({date: new Date(), credit: null, debit: amount, asOfBalance: this.balance});
    } catch (error) {
      console.error(error.message);
    }
    }

  formatDate(date) {
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric"});
  }

  printBankStatements() {
    try {
      if (this.transactions.length === 0) {
        throw new Error("No transactions to display.");
      }
    console.table("date || credit || debit || balance");
    this.transactions.forEach((transaction) => {
      let credit = transaction.credit || 0;
      let debit = transaction.debit || 0;
      let currentBalance = transaction.asOfBalance || 0;
      let formattedDate = this.formatDate(transaction.date);
      return console.log(`${formattedDate} || ${credit} || ${debit} || ${currentBalance}`);
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = BankAccount;