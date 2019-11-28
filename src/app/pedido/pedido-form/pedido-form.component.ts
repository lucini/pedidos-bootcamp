import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuItem, MessageService} from 'primeng/api';
import {Pedido} from '../../model/pedido';
import {PedidoService} from '../../service/pedido.service';
import {ClienteService} from '../../service/cliente.service';
import {Cliente} from '../../model/cliente';
import {FormComponent} from '../../component/form.component';
import {PedidoItem} from '../../model/pedidoItem';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent extends FormComponent<Pedido> implements OnInit {
  displayItem = false;
  clientes: Cliente[];
  pedidoItem: PedidoItem;
  rowIndex: number;
  menuItens: MenuItem[];

  constructor(private activatedRoute: ActivatedRoute,
              private pedidoService: PedidoService,
              private clienteService: ClienteService,
              private router: Router,
              private messageService: MessageService) {
    super();
    this.clienteService.findAll().subscribe(clientes => this.clientes = clientes);
    this.menuItens = [
      {
        label: 'Limpar',
        icon: 'pi pi-trash',
        command: () => this.limparItens(),
      }
    ];
  }

  private limparItens(): void {
    this.objeto.pedidoItemList = [];
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.pedidoService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
        });
      } else {
        this.resetaForm();
      }
    });
  }

  preSave(): void {
    const erros: string[] = [];

    if (!this.objeto.cliente) {
      erros.push('Selecione um cliente');
    }

    if (!(this.objeto.pedidoItemList.length > 0)) {
      erros.push('Adicione ao menos um item ao pedido.');
    }

    if (erros.length) {
      this.messageService.add({
        severity: 'error',
        summary: 'Atenção',
        detail: erros[0],
      });

      throw new Error(erros[0]);
    }
  }

  salvar(): void {
    super.salvar();
    this.pedidoService.save(this.objeto).subscribe(res => {
      this.objeto = res;

      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso!'
      });

      this.router.navigateByUrl('pedido');
    }, erro => {
      this.messageService.add({
        severity: 'error',
        summary: erro.error.message
      });
    });
  }

  resetaForm(): void {
    this.objeto = new Pedido();
    this.objeto.dataEmissao = new Date();
    this.objeto.pedidoItemList = [];
  }


  novoItem(): void {
    this.displayItem = true;
    this.rowIndex = -1;
  }

  editar(rowIndex: number): void {
    this.rowIndex = rowIndex;
    this.pedidoItem = JSON.parse(JSON.stringify(this.objeto.pedidoItemList[rowIndex]));
    this.displayItem = true;
  }

  adicionarItem(pedidoItem: PedidoItem) {
    if (this.rowIndex >= 0) {
      this.objeto.pedidoItemList[this.rowIndex] = JSON.parse(JSON.stringify(pedidoItem));
    } else {
      this.objeto.pedidoItemList.push(pedidoItem);
    }
  }

  excluir(index: number): void {
    this.objeto.pedidoItemList.splice(index, 1);
  }
}
