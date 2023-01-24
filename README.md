# Bank tech test

This is part of Makers individual technical challenges for week 10.

This is a simple bank statement application that allows users to perform transactions such as deposits and withdrawals and also allows them to view their bank statement.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have Node.js and npm installed on your machine to run this project.

### Installing
Clone the repository to your local machine

```git clone https://github.com/yourusername/bank-statement.git```

Navigate to the project directory and install the required packages

```
npm install
```
Running the Application
To run the application, simply use node REPL

```
$ node
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

Node.js - JavaScript runtime
Jest testing framework

### Testing Coverage

File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------|---------|----------|---------|---------|-------------------
All files       |     100 |       90 |     100 |     100 |
 bankAccount.js |     100 |       90 |     100 |     100 | 29

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