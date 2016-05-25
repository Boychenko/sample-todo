export interface IListResponse<Dto> {
    page: number;
    pageSize: number;
    total: number;
    list: Dto[];
}
