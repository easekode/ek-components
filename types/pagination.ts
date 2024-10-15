export interface FilterType {
 [key: string]: string[] | number[]
}

/*
q: show me query string filters
a: filters=firstName:1*2::lastName:1*2::middleName:1*2::
q: show me interface for the above filters string



*/
export interface QueryStringType {
 page?: number
 limit?: number
 keyword?: string
 sortField?: string
 sortDir?: number // 1 or -1
 filters?: string
 fromDate?: string
 toDate?: string
 id?: string
}
export interface IGetPaginationParamsResult {
 page: number
 limit: number
 keyword: string
 skip: number
 sort: { [key: string]: number }
 filters: unknown[]
}

export interface IGetPaginationParams {
 page?: number
 limit?: number
 keyword?: string
 sortField?: string
 sortDir?: number
 filters?: string
}

export interface PaginatedResult<T> {
 data: T[]
 totalResult: number
}

export interface ApiResponse<T> {
 success: boolean
 message: string
 data: T
 error: unknown
 errors: unknown
}

export const defaultPaginatedParams: IGetPaginationParams = {
 page: 1,
 limit: 10
}
