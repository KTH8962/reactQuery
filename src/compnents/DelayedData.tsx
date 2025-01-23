import { useQuery } from "@tanstack/react-query"

interface ResponseValue {
  message: string
  time: string
}

function DelayedData() {
  const { data, error } = useQuery<ResponseValue>({
    queryKey: ["delay"],
    queryFn: async () => {
      const res = await fetch("https://api.heropy.dev/v0/delay?t=1000")
      const data = await res.json()
      if (!data.time) {
        throw new Error("문제가 발생했습니다!")
      }
      return data
    },
    staleTime: 1000 * 10,
    retry: 1,
  })
  return (
    <>
      {data && <div>{JSON.stringify(data)}</div>}
      {error && <div>{error.message}</div>}
    </>
  )
}

// function DelayedData({ wait = 1000 }: { wait: number }) {
//   const { data, isError, isLoading } = useQuery<ResponseValue>({
//     queryKey: ["delay", wait],
//     queryFn: async () => {
//       console.log(`Waiting for: ${wait} ms`)
//       const response = await axios.get(
//         `https://api.heropy.dev/v0/delay?t=${wait}`
//       )
//       return response.data
//     },
//     staleTime: 1000 * 10,
//   })
//   console.log(data, isError, isLoading)
//   return <div>{data?.time}</div>
// }

export default DelayedData
