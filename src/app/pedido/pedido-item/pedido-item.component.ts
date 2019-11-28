import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PedidoItem} from '../../model/pedidoItem';
import {FormComponent} from '../../component/form.component';
import {Produto} from '../../model/produto';
import {ProdutoService} from '../../service/produto.service';

@Component({
  selector: 'app-pedido-item',
  templateUrl: './pedido-item.component.html',
  styleUrls: ['./pedido-item.component.scss']
})
export class PedidoItemComponent extends FormComponent<PedidoItem> implements OnInit {

  produtos: Produto[];
  @Input() displayItem = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSalvar = new EventEmitter<PedidoItem>();

  constructor(private produtoService: ProdutoService) {
    super();
  }

  ngOnInit() {
    this.resetaForm();
  }

  resetaForm(): void {
    this.objeto = new PedidoItem();
  }

  salvarItem(): void {
    this.onSalvar.emit(this.objeto);
    this.onClose.emit();
    this.resetaForm();
  }

  search($event: any): void {
    this.produtoService.complete($event.query).subscribe( val => this.produtos = val);
  }

  selecionarProduto(produto: Produto) {
    this.objeto.valorUnitario = produto.valorUnitario;
  }
}
