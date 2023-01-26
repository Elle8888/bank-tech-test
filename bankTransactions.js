class BankTransactions {
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

  getTransactions() {
    return this.transactions;
  }
}

module.exports = BankTransactions;