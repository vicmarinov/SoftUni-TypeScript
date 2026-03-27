type AllFunctions<T> = {
    [key in keyof T as (T[key] extends Function ? key : never)]: T[key];
};

type test = {
    name: string,
    age: number,
    test: () => string;
};

type extracted = AllFunctions<test>;

type Employee = {
    name: string,
    salary: number,
    work: () => void,
    takeBreak: () => string;
};

type extracted2 = AllFunctions<Employee>;

type Nope = {
    name: string;
};

type extracted3 = AllFunctions<Nope>;