import { useQuery } from "@tanstack/react-query"

interface ResponseValue {
  message: string
  time: string
}

function DelayedData() {
  const { data } = useQuery<ResponseValue>({
    queryKey: ["delay"],
    queryFn: async () =>
      (await fetch(`https://api.heropy.dev/v0/delay?t=1000`)).json(),
    staleTime: 1000 * 10,
  })
  return <div>{data?.time}</div>
}

export default DelayedData
