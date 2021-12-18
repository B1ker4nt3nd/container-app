import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileSelectorDialogComponent } from './components/file-selector-dialog/file-selector-dialog.component';
import { FileSelectorComponent } from './components/file-selector/file-selector.component';
import { DragandDropDirective } from './directives/dragndrop.directive';
import { DisplayFileSizePipe } from './utilities/pipes/display-file-size-pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    FileSelectorComponent,
    FileSelectorDialogComponent,
    DisplayFileSizePipe,
    DragandDropDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatDialogModule,
    MatCardModule,
    MatProgressBarModule,
  ],
  exports: [FileSelectorComponent],
  providers: [DisplayFileSizePipe],
})
export class NgxFileUploader {}
