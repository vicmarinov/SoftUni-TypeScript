class BankAccount {
    private balance: number;

    constructor (initialBalance: number) {
        this.balance = initialBalance;
    }

    public deposit (amount: number): void{
        this.balance += amount;
    }

    public withdraw (amount: number): void{
        if (amount > this.balance) {
            throw new Error('Withdrawing more than the account balance is not allowed!');
        }

        this.balance -= amount;
    }

    public getBalance (): number {
        return this.balance
    }
}

const account1 = new BankAccount(100);
account1.deposit(50);
account1.withdraw(30);
console.log(account1.getBalance());

const account2 = new BankAccount(20);
account2.withdraw(30);
console.log(account2.getBalance());