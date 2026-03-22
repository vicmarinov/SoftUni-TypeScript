class User {
    private _username!: string;

    constructor (username: string) {
        this.username = username;
    }

    public get username (): string {
        return this._username;
    }

    public set username (newUsername: string) {
        if (newUsername.length < 3) {
            throw new Error('Username must be at least 3 characters long!');
        }

        this._username = newUsername;
    }
}

const user1 = new User('Martin');
user1.username = 'johnDoe';
console.log(user1.username);

// The following should produce errors:

// const user2 = new User('jo');

// const user3 = new User('Martin');
// user3.username = 'Do';