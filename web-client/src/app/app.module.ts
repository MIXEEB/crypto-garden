import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent, TilemapComponent } from './components';
import { SeedTokenService, FlowerTokenService } from './services';

import { GardenStore } from './store'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TilemapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ garden: GardenStore.reducer }),
    EffectsModule.forRoot([GardenStore.GardenEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true
    })
  ],
  providers: [SeedTokenService, FlowerTokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
