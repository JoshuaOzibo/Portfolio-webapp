import { create } from 'zustand'

interface BearsType {
  bears: number
  increase: (by: number) => void;
  decrease: (by: number) => void;
}

const useStore = create<BearsType>((set) => ({
  bears: 0,
  increase: (by) =>set((state) => ({bears: state.bears + by})),
  decrease: (by) => set((state) => ({bears: state.bears - by})),
 
}))

export default useStore
