import { Model, PipelineStage } from 'mongoose'
import { QueryStringType } from './pagination'
import { IUser } from './user'

export interface RequestInput<T> {
 //  query?: QueryStringType
 query?: Record<string, any>
 body?: T
 params?: Record<string, any>
 user?: IUser
}

export interface GetAggregateResultInput {
 params?: QueryStringType
 searchFields?: string[]
 lookupWithProject?: PipelineStage[]
 Service: Model<any>
 mainPipeline?: PipelineStage[]
}

export type GetOneAggregateInput = {
 keyName?: string
 paramKey?: string
} & Omit<GetAggregateResultInput, 'searchFields' | 'additionalFilters'>

export interface AggregateResultResponse {
 totalResult: number
 data: any[]
}

export interface IGetPipeline {
 params: QueryStringType
 lookupWithProject: PipelineStage[]
 searchFields: string[]
 additionalFilters: PipelineStage[]
}

export interface IGetPipelineResult {
 customPipeline: PipelineStage[]
 defaultPipeline: PipelineStage[]
}
