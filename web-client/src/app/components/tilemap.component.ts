import { Component, Input, OnInit } from '@angular/core'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Flower } from 'src/app/models'
import { GardenStore, State } from 'src/app/store';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'tilemap',
    templateUrl: './tilemap.component.html',
    styleUrls: ['./styles.scss']
})
export class TilemapComponent implements OnInit{

    flowers$: Observable<Flower[]> | undefined;
  
    constructor(private store: Store<State>) {
        this.flowers$ = this.store.select(GardenStore.selectors.selectFlowers);
    }

    ngOnInit(): void {
        this.store.dispatch(GardenStore.actions.getFlowers({address: environment.gardenerAddress}));
    }

    getColorFilter(flowerId: number, color: number) {
        return flowerId !== -1 ? this.getHueRotate(color) : this.getGrayscale();
    }

    getHueRotate = (color: number) => ({'filter': `hue-rotate(${color}deg)`});
    getGrayscale = () => ({'filter': 'grayscale(100%)'});

}