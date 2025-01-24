import React, { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Users, User } from "@/compnents/UserNames2"

export default function UserList2() {
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [datas, setDatas] = useState([])
  const queryClient = useQueryClient()

  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: async (newUser: User) => {
      //
      const res = await fetch("https://api.heropy.dev/v0/users", {
        method: "POST",
        body: JSON.stringify(newUser),
      })
      if (!res.ok) throw new Error("변이 중 에러 발생!") // 변이 실패!
      return res.json() // 변이 성공!
    },
    onMutate: async (newUser) => {
      // 낙관적 업데이트 전에 사용자 목록 쿼리를 취소해 잠재적인 충돌 방지!
      await queryClient.cancelQueries({ queryKey: ["users"] })

      // 캐시된 데이터(사용자 목록) 가져오기!
      const previousUsers = queryClient.getQueryData<Users>(["users"])

      // 낙관적 업데이트
      if (previousUsers) {
        queryClient.setQueryData<Users>(["users"], [...previousUsers, newUser])
      }

      // 각 콜백의 context로 전달할 데이터 반환!
      return { previousUsers }
    },
    onSuccess: (data, newUser, context) => {
      console.log("onSuccess", data, newUser, context)
      // 변이 성공 시 캐시 무효화로 사용자 목록 데이터 갱신!
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (error, newUser, context) => {
      console.log("onError", error, newUser, context)
      // 변이 실패 시, 낙관적 업데이트 결과를 이전 사용자 목록으로 되돌리기!
      if (context) {
        queryClient.setQueryData(["users"], context.previousUsers)
      }
    },
    onSettled: (data, error, newUser, context) => {
      setDatas(data)
      console.log("onSettled", data, error, newUser, context)
    },
    retry: 3, // 변이 실패 시 3번 재시도
    retryDelay: 500, // 0.5초 간격으로 재시도
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({ name, age }) // 변이!
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="사용자 이름"
      />
      <input
        type="number"
        value={age || ""}
        onChange={(e) => setAge(Number.parseInt(e.target.value, 10))}
        placeholder="사용자 나이"
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "사용자 추가 중.." : "사용자 추가하기!"}
      </button>
      {isError && <p>에러 발생: {error.message}</p>}
      {datas &&
        Object.entries(datas).map((item: [string, string]) => {
          return (
            <p key={item[0]}>
              {item[0]} : {item[1]}
            </p>
          )
        })}
      {JSON.stringify(datas)}
    </form>
  )
}
