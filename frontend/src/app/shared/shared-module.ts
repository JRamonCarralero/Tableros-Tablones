import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

// Aquí vamos a importar todos los imports de PrimeNG y vamos a exportarlos,
// para importar este módulo en otros módulos y no haya problemas de múltiples importaciones con el mismo nombre
