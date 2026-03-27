interface CountableSet<T> {
    add (item: T): void;
    remove (item: T): void;
    contains (item: T): boolean;
    getNumberOfCopies (item: T): number;
}

class CountedSet<T> implements CountableSet<T> {
    private countsTable: Map<T, number> = new Map<T, number>();

    public add (item: T): void {
        if (!this.countsTable.has(item)) {
            this.countsTable.set(item, 0);
        }

        this.countsTable.set(
            item,
            this.countsTable.get(item)! + 1
        );
    }

    public remove (item: T): void {
        if (
            !this.countsTable.has(item) ||
            this.countsTable.get(item) === 0
        ) return;

        this.countsTable.set(
            item,
            this.countsTable.get(item)! - 1
        );
    }

    public contains (item: T): boolean {
        return this.countsTable.has(item) &&
            this.countsTable.get(item)! > 0;
    }

    public getNumberOfCopies (item: T): number {
        return this.countsTable.get(item) ?? 0;
    }
}

const countedSet = new CountedSet<string>();

countedSet.add('test');
countedSet.add('test');

console.log(countedSet.contains('test'));
console.log(countedSet.getNumberOfCopies('test'));

countedSet.remove('test');
countedSet.remove('test');
countedSet.remove('test');

console.log(countedSet.getNumberOfCopies('test'));
console.log(countedSet.contains('test'));

console.log('-----');

const codesCounterSet = new CountedSet<200 | 301 | 404 | 500>();

codesCounterSet.add(404);
codesCounterSet.add(200);

console.log(codesCounterSet.contains(404));
console.log(codesCounterSet.getNumberOfCopies(200));

// The following should produce TS errors:

// codesCounterSet.add(205);
// codesCounterSet.getNumberOfCopies(350);