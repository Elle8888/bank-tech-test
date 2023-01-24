class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  handleInputError(amount){
    if (typeof amount !== 'number') {
      throw new Error("Invalid amount. Must be a number.");
    }
    if (amount <= 0) {
      throw new Error("Invalid amount. Must be greater than 0.");
    }
  }

  deposit(depositAmount) {
    try {
      this.handleInputError(depositAmount);
      this.balance += depositAmount;
      this.transactions.unshift({
        date: new Date(),
        credit: depositAmount,
        debit: null,
        asOfBalance: this.balance});
    } catch (error) {
      console.error(error.message);
    }
  }

  withdrawal(withdrawalAmount) {
    try {
      this.handleInputError(withdrawalAmount);
      if (withdrawalAmount > this.balance) {
        throw new Error("Insufficient funds");
      }
      this.balance -= withdrawalAmount;
      this.transactions.unshift({
        date: new Date(),
        credit: null,
        debit: withdrawalAmount,
        asOfBalance: this.balance});
    } catch (error) {
      console.error(error.message);
    }
  }

  formatDate(date) {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"});
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
        return console.table(`${formattedDate} || ${credit} || ${debit} || ${currentBalance}`);
      });
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = BankAccount;