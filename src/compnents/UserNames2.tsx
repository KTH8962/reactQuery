import { useQuery } from "@tanstack/react-query"

export type Users = User[]
export interface User {
  name: string
  age: number
  isValid?: boolean
  emails?: string[]
  photo?: {
    name: string
    data: string // Base64
  }
  id?: string
}
export default function UserNames2() {
  const { data } = useQuery<Users, Error, string[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://api.heropy.dev/v0/users")
      const { users } = await res.json()
      console.log(users)
      return users
    },
    staleTime: 1000 * 10,
    select: (data) => data.map((user) => user.name),
  })
  return (
    <>
      <h2>User Names</h2>
      <ul>
        {data?.map((name, i) => (
          <li key={i}>{name}</li>
        ))}
      </ul>
    </>
  )
}
