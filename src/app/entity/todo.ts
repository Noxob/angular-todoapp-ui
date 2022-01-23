export interface Todo {
    id: string;
    title: string;
    description: string;
    due: Date;
    created: Date;
    updated: Date;
    complete: boolean;
    user: string;
}