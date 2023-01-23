let balance = 0;
let transaction = [];

const printBankStatements = () => {
  let currentBalance = balance;
  transactions.forEach((transaction) => {
    let credit = transaction.credit || 0;
    let debit = transaction.debit || 0;
    currentBalance = currentBalance - debit + credit;
    console.log(`${transaction.date} || ${credit} || ${debit} || ${currentBalance}`);
    });
}

const deposit = () => {

}

const withdrawal = () => {

}

module.exports = printBankStatements