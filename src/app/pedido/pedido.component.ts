import {Component, OnInit} from '@angular/core';
import {ListComponent} from '../component/list.component';
import {Pedido} from '../model/pedido';
import {ConfirmationService, MessageService} from 'primeng/api';
import {PedidoService} from '../service/pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent extends ListComponent<Pedido> implements OnInit {

  constructor(private pedidoService: PedidoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
    super();
    this.cols = [
      {field: 'id', header: 'Código'},
      {field: 'cliente', header: 'Cliente'},
      {field: 'dataEmissao', header: 'Data de Emissão'},
      {field: 'total', header: 'Total'},
    ];
  }

  ngOnInit() {
  }

  carregarLista(): void {
    this.loading = true;
    this.pedidoService.findAll().subscribe(res => {
      this.lista = res;
      setTimeout(() => this.loading = false);
    });
  }

  excluir(id: number): void {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir esse pedido?',
      accept: () => this.deletar(id),
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',
    });
  }

  private deletar(id: number): void {
    this.loading = true;
    this.pedidoService.delete(id).subscribe(() => {
      this.carregarLista();

      this.messageService.add({
        severity: 'success',
        summary: 'Deletado com sucesso!'
      });
      setTimeout(() => this.loading = false);
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: error.error.message
      });
      setTimeout(() => this.loading = false);
    });
  }
}
