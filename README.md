# Bank tech test

This is part of Makers individual technical challenges for week 10.

This is a simple bank statement application that allows users to perform transactions such as deposits and withdrawals and also allows them to view their bank statement.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have Node.js installed on your machine to run this project.

### Installing
Clone the repository to your local machine

```git clone https://github.com/Elle8888/bank-tech-test.git```

Navigate to the project directory and install the required packages

```
npm install
```
Running the Application


To run the application, simply use node REPL

```
$ node
> const BankAccount = require('./bankAccount.js')
undefined
> myAccount = new BankAccount()
BankAccount { balance: 0, transactions: [] }
> myAccount.deposit(1000)
undefined
> myAccount.deposit(2000)
undefined
> myAccount.withdrawal(500)
undefined
> myAccount.printBankStatements()
date || credit || debit || balance
24/01/2023 || 0 || 500 || 2500
24/01/2023 || 2000 || 0 || 3000
24/01/2023 || 1000 || 0 || 1000
undefined
```
### Running the tests
To run the tests, you can use the command
```
npm run test
```
### Built With

Node.js
Jest testing framework

### Testing Coverage

File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------|---------|----------|---------|---------|-------------------
All files       |     100 |    92.85 |     100 |     100 |
 bankAccount.js |     100 |    92.85 |     100 |     100 | 63


### Approach

* Created functions based on the functionalities required.
* Determined if there are any dependencies among these functions.
* Created a class based on the dependencies and structure the code accordingly.
* Followed the TDD, OOD, debugging approach.
* Added edge cases and respective tests.
* Refactored and added more tests.
### Requirements

* You should be able to interact with your code via a REPL like IRB or Node.  (You don't need to implement a command line interface that takes input from STDIN.)
* Deposits, withdrawal.
* Account statement (date, amount, balance) printing.
* Data can be kept in memory (it doesn't need to be stored to a database or anything).
### Acceptance criteria

**Given** a client makes a deposit of 1000 on 10-01-2023
**And** a deposit of 2000 on 13-01-2023
**And** a withdrawal of 500 on 14-01-2023
**When** she prints her bank statement
**Then** she would see

```
date || credit || debit || balance
14/01/2023 || || 500.00 || 2500.00
13/01/2023 || 2000.00 || || 3000.00
10/01/2023 || 1000.00 || || 1000.00
```