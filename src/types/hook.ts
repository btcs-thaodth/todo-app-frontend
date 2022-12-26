import { FormInstance } from 'antd'

import {
  API_ERROR_CODES,
  FORM_VALIDATION_ERROR_CODES,
} from '../constants/apiErrorCodes'

export type UseQueryOptions = {
  errorMessage?: string
  params?: any
}

export type ErrorCode = keyof typeof API_ERROR_CODES
export type FormValidationErrorCodes = keyof typeof FORM_VALIDATION_ERROR_CODES

export type ApiError = {
  error?: {
    errorCode?: ErrorCode | FormValidationErrorCodes
    message?: string
  }
}

export type ApiMethod = 'post' | 'patch' | 'put' | 'delete'

export type MutateVariables<Data, Response> = {
  method?: ApiMethod
  values: Data
  successMessage: string
  errorMessage: string
  onSuccess?: (response: Response) => void
}

export type UseMutationParams = {
  form?: FormInstance<any>
}
