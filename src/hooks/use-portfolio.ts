// import { useEffect } from 'react'
// import { useGet } from './use-fetch'
// import { usePortfolioStore } from '@/lib/store'
// import { ApiResponse } from '@/types/types'

// export const usePortfolio = () => {
//   const { 
//     portfolioData, 
//     mappedData,
//     isLoading,
//     error,
//     setPortfolioData,
//     setLoading,
//     setError 
//   } = usePortfolioStore()

//   const {
//     data,
//     isLoading: isFetching,
//     error: fetchError
//   } = useGet<ApiResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`)

//   useEffect(() => {
//     setLoading(isFetching)
//     if (fetchError) setError(fetchError)
//     if (data) setPortfolioData(data)
//   }, [data, isFetching, fetchError, setLoading, setError, setPortfolioData])

//   return {
//     portfolioData,
//     mappedData,
//     isLoading,
//     error
//   }
// } 