export function instanceOfType<T>(object: any): object is T{
    return 'member' in object;
}
