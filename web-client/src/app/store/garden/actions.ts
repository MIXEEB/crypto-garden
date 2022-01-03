import { createAction, props } from "@ngrx/store";

export enum ActionTypes {
    GET_SEED_BALANCE = '[Garden] get seed balance',
    GET_SEED_BALANCE_SUCCESS = '[Garden] get seed balance success',
    
    PLANT_SEED = '[Garden] plant seed',
    PLANT_SEED_SUCCESS = '[Garden] plant seed',

    SET_FLOWER_PLACEHOLDER = '[Garden] set flower placeholder',

    GET_FLOWER_IDS = '[Garden] get flowerIds',
    GET_FLOWER = '[Garden] get flower',
    GET_FLOWER_SUCCESS = '[Garden] get flower success'
}

export const getSeedBalance = createAction(
    ActionTypes.GET_SEED_BALANCE,
    props<{address: string}>()
)

export const getSeedBalanceSuccess = createAction(
    ActionTypes.GET_SEED_BALANCE_SUCCESS,
    props<{balance:number}>()
)


export const plantSeed = createAction(
    ActionTypes.PLANT_SEED,
    props<{address: string}>()
)

export const plantSeedSuccess = createAction(
    ActionTypes.PLANT_SEED_SUCCESS
)

export const setFlowerPlaceholder = createAction(
    ActionTypes.SET_FLOWER_PLACEHOLDER
)

export const getFlowers = createAction(
    ActionTypes.GET_FLOWER_IDS,
    props<{address: string}>()
)

export const getFlowersSuccess = createAction(
    ActionTypes.GET_FLOWER_IDS,
    props<{ids: number[]}>()
)

export const getFlower = createAction(
    ActionTypes.GET_FLOWER,
    props<{id: number}>()
)

export const getFlowerSuccess = createAction(
    ActionTypes.GET_FLOWER_SUCCESS,
    props<{id: number, dna: number}>()
)