export interface PaginationQuery<T> {
  limit: number;
  page: number;
  data: T;
}

export interface CommonRes<T> {
  status: "success";
  data: T;
}
