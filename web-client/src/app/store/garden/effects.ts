import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from "@ngrx/store";
import { catchError, EMPTY, map, mergeMap, Observable, pipe, switchMap } from "rxjs";
import { FlowerTokenService, SeedTokenService } from "src/app/services";
import * as actions from './actions'


@Injectable()
export class GardenEffects {
    constructor(private actions$: Actions, private seedTokenService: SeedTokenService, private flowerTokenService: FlowerTokenService) { }

    getSeedBalance$ = createEffect(() =>
        this.actions$.pipe( 
            ofType(actions.getSeedBalance),
            switchMap(action => this.seedTokenService.getSeedBalance(action.address).pipe(
                map((balance: string) => actions.getSeedBalanceSuccess({balance: parseInt(balance)})),
                catchError(() => EMPTY)
            ))
        )
    )

    plantFlower$ = createEffect(() => 
        this.actions$.pipe(
            ofType(actions.plantSeed),
            switchMap(action => this.seedTokenService.plant(action.address).pipe(
                mergeMap(() => ([
                    actions.getFlowers({address: action.address}),
                    actions.getSeedBalance({address: action.address})
                ])),
                catchError(() => EMPTY)
            ))
            
        )
    )

    setFlowerPlaceholder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.plantSeed),
            map(() => actions.setFlowerPlaceholder())
        )
    )

    getFlowers$ = createEffect(() => 
        this.actions$.pipe(
            ofType(actions.getFlowers),
            switchMap(action => this.flowerTokenService.getFlowerIds(action.address).pipe(
                mergeMap((response: any) => {
                    return response.map((flowerId: number) => actions.getFlower({id: flowerId})) as Action[]
                }),
                catchError((err) => EMPTY)
            )
        )) 
    )

    getFlower$ = createEffect(() => 
       this.actions$.pipe(
            ofType(actions.getFlower),
            mergeMap(action => this.flowerTokenService.getFlower(action.id).pipe(
                map((flowerDna: number) => {
                    console.log(flowerDna);
                    return actions.getFlowerSuccess({id: action.id, dna: flowerDna})
                } ),
                catchError((err) => EMPTY)
            ))
       )
   )
}