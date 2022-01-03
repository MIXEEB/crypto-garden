import { createSelector } from "@ngrx/store";
import { GardenState } from "./state";
import { State } from "../state";

const selectGardenFeature = (state: State) => state.garden;

export const selectSeedBalance = createSelector(
    selectGardenFeature,
    (state: GardenState) => state.seedBalance
)

export const selectFlowers = createSelector(
    selectGardenFeature,
    (state: GardenState) => state.flowers
)