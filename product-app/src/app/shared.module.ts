import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatToolbarModule } from '@angular/material/toolbar';
import { ScrollingModule } from "@angular/cdk/scrolling";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

const MATERIAL_MODULES = [
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatSidenavModule,
  MatToolbarModule,
  ScrollingModule, // Add this line
];

@NgModule({

  declarations: [

  ],
  imports: [
    FlexLayoutModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MATERIAL_MODULES,
  ],
  exports: [
    FormsModule,
    FlexLayoutModule,
    MATERIAL_MODULES,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
  ],
})
export class SharedModule {
}
