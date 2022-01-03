import { createReducer, on } from '@ngrx/store';
import { Flower } from 'src/app/models';
import * as GardenActions from './actions';
import { GardenState } from './state';

const dnaMask = "00000000";

export const initialState: GardenState = {
    seedBalance: 0,
    flowers: []
};

export const reducer = createReducer(
    initialState,
    on(GardenActions.setFlowerPlaceholder, (state) => {
        return {
            ...state, 
            flowers: [...state.flowers, createFlowerPlaceholder()]
        }
    }),
    on(GardenActions.getSeedBalanceSuccess, (state, {balance}) => ({...state, seedBalance: balance})),
    on(GardenActions.getFlowerSuccess, (state, {id, dna}) => { 
        if (state.flowers.findIndex((flower: Flower) => flower.id === id) !== -1){
            return {...state};
        }

        return {
            ...state,
            flowers: [...state.flowers.filter(f => f.id !== -1), createFlowerFromDna(id, dna)]
        }
    })
)

const createFlowerPlaceholder = () => {
    return{ 
        id: -1,
        flowerColor: -1,
        flowerSrc: `assets/images/flower1.png`,
        potColor: -1,
        potSrc: `assets/images/pot1.png`,
    }
}

const createFlowerFromDna = (id: number, dna: number): Flower => {
    let stringDna = dna.toString();
    stringDna = dnaMask.substring(0, dnaMask.length - stringDna.length) + stringDna;
 
    return {
        id,
        flowerColor: parseInt(stringDna.substring(6, 8)),
        flowerSrc: `assets/images/flower${Math.floor(parseInt(stringDna.substring(4, 6)) / 25) + 1}.png`,
        potColor: parseInt(stringDna.substring(2, 4)),
        potSrc: `assets/images/pot${Math.floor(parseInt(stringDna.substring(0, 2)) / 25) + 1}.png`,
    }
}
