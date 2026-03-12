type Status = 'Locked' | 'Unlocked' | 'Deleted';

type User = {
    id: number | string,
    username: string,
    passwordHash: string | string[],
    status: Status,
    email?: string;
};

function validateUser (user: unknown): user is User {
    if (typeof user !== 'object') return false;
    if (user === null) return false;

    const hasValidId: boolean = 'id' in user && (
        (
            typeof user.id === 'number' &&
            user.id > 100
        ) || (
            typeof user.id === 'string' &&
            user.id.length === 14
        )
    );

    const hasValidUsername: boolean = 'username' in user &&
        typeof user.username === 'string' &&
        (
            user.username.length >= 5 &&
            user.username.length <= 10
        );
    
    const hasValidPasswordHash: boolean = 'passwordHash' in user && (
        (
            typeof user.passwordHash === 'string' &&
            user.passwordHash.length === 20
        ) || (
            Array.isArray(user.passwordHash) &&
            user.passwordHash.length === 4 &&
            user.passwordHash.every(element => (
                typeof element === 'string' &&
                element.length === 8
            ))
        )
    );

    const hasValidStatus = 'status' in user &&
        typeof user.status === 'string' &&
        (
            [
                'Locked',
                'Unlocked',
                'Deleted'
            ].includes(user.status)
        );
    
    const hasValidEmail: boolean = 'email' in user ?
        typeof user.email === 'string' : true;
    
    return hasValidId &&
        hasValidUsername &&
        hasValidPasswordHash &&
        hasValidStatus &&
        hasValidEmail;
}

console.log(validateUser(
    {
        id: 120,
        username: 'testing',
        passwordHash: '123456-123456-123456',
        status: 'Deleted',
        email: 'something'
    }
));

console.log(validateUser(
    {
        id: '1234-abcd-5678',
        username: 'testing',
        passwordHash: '123456-123456-123456',
        status: 'Unlocked'
    }
));

console.log(validateUser(
    {
        id: '20',
        username: 'testing',
        passwordHash: '123456-123456-123456',
        status: 'Deleted',
        email: 'something'
    }));

console.log(validateUser(
    {
        id: 255,
        username: 'Pesho',
        passwordHash: [
            'asdf1245',
            'qrqweggw',
            '123-4567',
            '98765432'
        ],
        status: 'Locked',
        email: 'something'
    }
));

console.log(validateUser(
    {
        id: 'qwwe-azfg-ey38',
        username: 'Someone',
        passwordHash: [
            'qwezz8jg',
            'asdg-444',
            '12-34-56'
        ],
        status: 'Unlocked'
    }
));

console.log(validateUser(
    {
        id: 1344,
        username: 'wow123',
        passwordHash: '123456-123456-1234567',
        status: 'Locked',
        email: 'something@abv.bg'
    }
));