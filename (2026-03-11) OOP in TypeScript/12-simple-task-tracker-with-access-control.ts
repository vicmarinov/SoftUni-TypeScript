class Task {
    private title: string;
    private description: string;
    private completed: boolean = false;
    private _createdBy: string;

    constructor (title: string, description: string, author: string) {
        this.title = title;
        this.description = description;
        this._createdBy = author;
    }

    public get createdBy () {
        return this._createdBy;
    }

    public toggleStatus (): void {
        this.completed = !this.completed;
    }
    
    public getDetails (): string {
        return `Task: ${this.title} - ${this.description} - ${
            this.completed ? 'Completed' : 'Pending'
        }`;
    }

    public static createSampleTasks (): Task[] {
        return [
            new Task(
                'Buy a birthday gift',
                'Look for a great gift for Annie\'s birthday',
                'Sophie'
            ),
            new Task(
                'Corporate Meeting',
                'Discuss the Q2 roadmap with the stakeholders',
                'John Doe'
            )
        ];
    }
}

const task1 = new Task('Complete homework', 'Finish math exercises', 'Charlie');
task1.toggleStatus();
console.log(task1.getDetails());

const task2 = new Task('Clean room', 'Clean the room', 'Mary');
console.log(task2.getDetails());

const tasks = Task.createSampleTasks();
tasks.forEach(task => console.log(task.getDetails()));