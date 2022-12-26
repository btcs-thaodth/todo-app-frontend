import { isAxiosError } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  API_ERROR_CODES,
  FORM_VALIDATION_ERROR_CODES,
} from '../constants/apiErrorCodes'
import api from '../services/api'
import { notificationState } from '../store/notification'
import {
  ApiError,
  ErrorCode,
  FormValidationErrorCodes,
  MutateVariables,
  UseMutationParams,
} from '../types/hook'
import { trimObjectValues } from '../utils'

function useMutation(params?: UseMutationParams) {
  const form = params?.form
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const isSubmitting = useRef<boolean>(false)

  const { t, i18n } = useTranslation()
  const setToastMessage = useSetRecoilState(notificationState)

  const mutate = async <Data, Response>(
    url: string,
    variables: MutateVariables<Data, Response>
  ) => {
    const {
      method = 'post',
      values,
      successMessage,
      errorMessage,
      onSuccess,
    } = variables

    try {
      if (!isSubmitting.current) {
        isSubmitting.current = true
        const data = trimObjectValues(values)
        setIsLoading(true)
        const response = await api[method]<Data>(url, data)
        isSubmitting.current = false
        setIsLoading(false)
        if (form) {
          form.resetFields()
        }
        if (onSuccess) {
          onSuccess(response)
        }
        setToastMessage({ success: successMessage })
      }
    } catch (error) {
      isSubmitting.current = false
      setIsLoading(false)
      if (!isAxiosError<ApiError>(error)) {
        setToastMessage({ error: 'error.default' })
        return
      }
      const errorCode = error.response?.data?.error?.errorCode

      if (
        errorCode &&
        FORM_VALIDATION_ERROR_CODES[errorCode as FormValidationErrorCodes] &&
        form
      ) {
        form.setFields([
          {
            name: FORM_VALIDATION_ERROR_CODES[
              errorCode as FormValidationErrorCodes
            ],
            errors: [t(`validationError.${errorCode}`)],
          },
        ])
        return
      }

      if (errorCode && API_ERROR_CODES[errorCode as ErrorCode]) {
        setToastMessage({
          error: API_ERROR_CODES[errorCode as ErrorCode],
        })
        return
      }

      setToastMessage({ error: errorMessage })
    }
  }

  useEffect(() => {
    if (form) {
      const erroredFields = form
        .getFieldsError()
        .filter((field) => field.errors.length > 0)
      if (erroredFields.length > 0) {
        const fieldNames = erroredFields.map((field) => field.name).flat()
        form.validateFields(fieldNames)
      }
    }
  }, [i18n.language, form])

  return { mutate, isSubmitting: isLoading }
}

export default useMutation
