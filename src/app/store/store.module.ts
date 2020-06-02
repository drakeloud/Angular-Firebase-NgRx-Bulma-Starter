import { NgModule } from '@angular/core';

import { StoreModule as NgrxStoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers } from './reducers';
import { AuthEffects } from './auth';


@NgModule({
    imports: [
        NgrxStoreModule.forRoot(reducers),
        EffectsModule.forRoot([
            AuthEffects
        ]),
        StoreDevtoolsModule.instrument({
            maxAge: 25
        })
    ]
})
export class StoreModule {}
