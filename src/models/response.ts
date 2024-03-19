export interface Response<T> {
    model: T,
    message: string,
    errors: string[]
}
