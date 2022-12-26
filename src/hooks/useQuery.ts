import { isAxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { API_ERROR_CODES } from '../constants/apiErrorCodes'
import api from '../services/api'
import { notificationState } from '../store/notification'
import { ApiError, ErrorCode, UseQueryOptions } from '../types/hook'

function useQuery<T>(url: string, options?: UseQueryOptions) {
  const [data, setData] = useState<T>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isFetched, setIsFetched] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const [isRefetch, setIsRefetch] = useState<boolean>(false)

  const apiParamsJsonString = JSON.stringify(options?.params)

  const setToastMessage = useSetRecoilState(notificationState)

  const refetch = () => setIsRefetch((prev) => !prev)

  useEffect(() => {
    if (!url) return undefined

    let cancelRequest = false

    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await api.get<T>(url, options?.params)
        if (cancelRequest) return
        setData(response)
        setIsLoading(false)
        setIsFetched(true)
      } catch (err) {
        if (!isAxiosError<ApiError>(err)) {
          setToastMessage({ error: 'error.default' })
          return
        }

        const errorCode = err.response?.data?.error?.errorCode
        const errorMessage =
          errorCode && API_ERROR_CODES[errorCode as ErrorCode]
            ? API_ERROR_CODES[errorCode as ErrorCode]
            : options?.errorMessage || 'error.fetchDataError'

        setToastMessage({ error: errorMessage })

        if (cancelRequest) return
        setError(error as Error)
        setIsLoading(false)
        setIsFetched(false)
      }
    }

    fetchData()

    return () => {
      cancelRequest = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, isRefetch, options?.errorMessage, apiParamsJsonString])

  return {
    isLoading,
    isFetched,
    data,
    error,
    refetch,
  }
}

export default useQuery
