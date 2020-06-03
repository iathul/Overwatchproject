import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatTabsModule } from '@angular/material';
import { MatToolbarModule} from '@angular/material/toolbar'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


const MaterialComponents = [
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatTabsModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
