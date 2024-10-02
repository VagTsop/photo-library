import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

const MATERIAL_MODULES = [
  MatProgressSpinnerModule,
  MatToolbarModule,
];

@NgModule({

  declarations: [],

  imports: [
    MATERIAL_MODULES,
    CommonModule,
  ],
  exports: [
    MATERIAL_MODULES,
    CommonModule,
  ],
  providers: [
  ],
})
export class SharedModule {
}
