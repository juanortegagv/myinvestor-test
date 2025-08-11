export type Pagination = Readonly<{
  page: number;
  limit: number;
  totalFunds: number;
  totalPages: number;
}>;

export type PagedResponse<T> = Readonly<{
  pagination: Pagination;
  data: ReadonlyArray<T>;
}>;


