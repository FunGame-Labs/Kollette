import create from "zustand";
import { PackRewards } from "@thirdweb-dev/sdk/dist/declarations/src/evm/schema";

interface State {
  openedPackRewards: PackRewards | undefined;
  setOpenedPackRewards: (openedRewards: PackRewards | undefined) => void;
}

const useStore = create<State>((set) => ({
  openedPackRewards: undefined,
  setOpenedPackRewards: (openedRewards) =>
    set((state) => ({
      ...state,
      openedPackRewards: openedRewards,
    })),
}));

export default useStore;
