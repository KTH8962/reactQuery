import DelayedData from "@/compnents/DelayedData"
import { useUserStore } from "@/store/useUserStore"

function MainPage() {
  const user = useUserStore((state) => state.user)
  const isActive = useUserStore((state) => state.active)
  const { signIn } = useUserStore((state) => state.actions)

  const handleStorage = () => {
    console.log(typeof user)
    window.localStorage.removeItem("userStores")
  }
  return (
    <>
      <DelayedData />
      <div>
        {isActive &&
          user &&
          Object.entries(user).map((item) => {
            return (
              <p key={item[0]}>
                {item[0]} : {item[1]}
              </p>
            )
          })}
      </div>
      <button
        type="button"
        onClick={() => {
          signIn("test@gamil.com", "이름2")
        }}
      >
        입력하기
      </button>
      <button type="button" onClick={handleStorage}>
        삭제하기
      </button>
    </>
  )
}

export default MainPage
