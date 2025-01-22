import { create } from "zustand"
import {
  combine,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

interface State {
  user: {
    email: string
    name: string
  } | null
  active: boolean
}

interface Actions {
  signIn: (email: string, name: string) => void
}

const initialState: State = {
  user: null,
  active: false,
}

export const useUserStore = create(
  devtools(
    persist(
      subscribeWithSelector(
        immer(
          combine(initialState, (set) => ({
            actions: <Actions>{
              signIn: (email: string, name: string) => {
                set((state: State) => {
                  state.user = {
                    email: email,
                    name: name,
                  }
                })
              },
            },
          }))
        )
      ),
      {
        name: "userStores",
        partialize: (state) => ({ user: state.user, active: true }),
      }
    )
  )
)

useUserStore.subscribe(
  (state) => state.user?.email,
  () => {
    useUserStore.setState(() => ({ active: true }))
  }
)
