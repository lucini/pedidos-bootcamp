import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PedidoComponent} from './pedido.component';
import {PedidoFormComponent} from './pedido-form/pedido-form.component';
import {PedidoItemComponent} from './pedido-item/pedido-item.component';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import {AutoCompleteModule, ConfirmationService, DialogModule, SplitButtonModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import {PedidoService} from '../service/pedido.service';


@NgModule({
  declarations: [
    PedidoComponent,
    PedidoFormComponent,
    PedidoItemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    CardModule,
    ConfirmDialogModule,
    CalendarModule,
    DropdownModule,
    SplitButtonModule,
    AutoCompleteModule,
    FormsModule,
    DialogModule,
  ],
  exports: [
    PedidoComponent,
    PedidoFormComponent,
    PedidoItemComponent,
  ],
  providers: [
    ConfirmationService,
    PedidoService,
  ]
})
export class PedidoModule {
}
