import {RouterModule, Routes} from '@angular/router';
import {PedidoComponent} from './pedido.component';
import {PedidoFormComponent} from './pedido-form/pedido-form.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PedidoComponent,
  },
  {
    path: 'pedido/form',
    component: PedidoFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule {
}
