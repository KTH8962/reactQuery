import { useQuery } from "@tanstack/react-query"

interface ResponseValue {
  message: string
  time: string
}

function DelayedData() {
  const options = useQuery<ResponseValue>({
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
  const { data, error, isFetching, isPending, isLoading, isStale, refetch } =
    options

  function fetchData() {
    refetch()
  }
  return (
    <>
      <div>isFetching: {JSON.stringify(isFetching)}</div>
      {/* 쿼리 함수(queryFn)가 실행 중인지의 여부로, 데이터를 가져오는 중을
      나타냅니다. */}
      <div>isPending: {JSON.stringify(isPending)}</div>
      {/* 캐시된 데이터가 없고 쿼리가 아직 완료되지 않은 상태의 여부로, initialData
      혹은 placeholderData 옵션으로 데이터를 제공하면 출력 대기(Pending)가
      필요하지 않으므로 false를 반환합니다. 
      enabled 옵션을 false로 지정.하면, 쿼리가 대기 상태로 시작하므로 isPending는 true를 반환합니다.*/}
      <div>isLoading: {JSON.stringify(isLoading)}</div>
      {/* isFetching && isPending와 같은 의미로, 쿼리의 첫 번째 가져오기가 진행 중인
      경우를 나타냅니다. */}
      {data && <div>{JSON.stringify(data)}</div>}
      {error && <div>{error.message}</div>}

      {isLoading ? (
        <div>로딩 중...</div>
      ) : (
        <>
          <div>{data?.time}</div>
          <div>데이터가 어떤상황임? : {JSON.stringify(isStale)}</div>
          <button type="button" disabled={isFetching} onClick={() => refetch()}>
            {isFetching ? "데이터 가져오는 중" : "데이터 다시 가져오기"}
          </button>
          <button type="button" onClick={fetchData}>
            테스트
          </button>
        </>
      )}
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
