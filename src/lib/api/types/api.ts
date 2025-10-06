export interface ApiResponse<T> {
  data: T;
  message: string;
  status_code: string;
  pagination?: Pagination;
}

export interface Pagination {
  current_page: number;
  count: number;
  total_pages: number;
}

export interface PaginationParams {
  page: number;
  page_size: number;
  search: string;
}

export interface ErrorResponse {
  error: {
    message: string;
    code: string;
    details: {
      [key: string]: string;
    };
  };
}
