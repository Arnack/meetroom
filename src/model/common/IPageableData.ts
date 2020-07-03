export interface IPageableData<T> {
    items: Array<T>;
    count?: number;
    pages: number;
    page: number;
    perPage: number;
}