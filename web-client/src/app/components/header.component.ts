import { Component } from '@angular/core'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GardenStore, State } from 'src/app/store';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./styles.scss']
})
export class HeaderComponent { 
    
    seedBalance$: Observable<number> | undefined;

    constructor(private store: Store<State>) {
        this.seedBalance$ = this.store.select(GardenStore.selectors.selectSeedBalance);
    }

    ngOnInit() {
        this.store.dispatch(GardenStore.actions.getSeedBalance({ address: environment.gardenerAddress }));
    }

    plant = () => this.store.dispatch(GardenStore.actions.plantSeed({ address: environment.gardenerAddress }));

}