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
    active: boolean
  } | null
}

interface Actions {
  signIn: () => void
}

const initialState: State = {
  user: null,
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
                    active: false,
                  }
                })
              },
            },
          }))
        )
      ),
      {
        name: "userStores",
        partialize: (state) => ({ count: state.user }),
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
