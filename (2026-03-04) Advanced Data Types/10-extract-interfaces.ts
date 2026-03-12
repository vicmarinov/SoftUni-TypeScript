type User = {
    username: string;
    signupDate: Date;
};

type Status = 'Logged' | 'Started' | 'InProgress' | 'Done';

type Task = {
    status: Status;
    title: string;
    daysRequired: number;
    assignedTo: User | undefined;
    changeStatus: (newStatus: Status) => void;
};

function assignTask (user: User, task: Task): void {
    if (task.assignedTo == undefined) {
        task.assignedTo = user;
        console.log(`User ${user.username} assigned to task '${task.title}'`);
    }
}

const user = {
    username: 'Margaret',
    signupDate: new Date(2022, 1, 13),
    passwordHash: 'random'
};

const task1 = {
    status: <Status>'Logged',
    title: 'Need assistance',
    daysRequired: 1,
    assignedTo: undefined,
    changeStatus (newStatus: Status) {
        this.status = newStatus;
    }
};

const task2 = {
    status: <Status>'Done',
    title: 'Test',
    daysRequired: 12,
    assignedTo: undefined,
    changeStatus (newStatus: Status) {
        this.status = newStatus;
    },
    moreProps: 300,
    evenMore: 'wow'
};

assignTask(user, task1);
assignTask(user, task2);