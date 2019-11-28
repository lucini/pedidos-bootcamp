import { Component, OnInit } from '@angular/core';
import {ListComponent} from '../component/list.component';
import {Produto} from '../model/produto';
import {ProdutoService} from '../service/produto.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent extends ListComponent<Produto> implements OnInit {

  constructor(private produtoService: ProdutoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private titleService: Title) {
    super();
    this.cols = [
      {field: 'id', header: 'Código'},
      {field: 'descricao', header: 'Descrição'},
      {field: 'valorUnitario', header: 'Valor Unitário'},
    ];
  }

  ngOnInit() {
    this.titleService.setTitle('Lista de Produtos');
  }

  carregarLista(): void {
    this.loading = true;
    this.produtoService.findAll().subscribe(res => {
      this.lista = res;
      setTimeout(() => this.loading = false);
    });
  }

  excluir(id: number): void {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir esse produto?',
      accept: () => this.deletar(id),
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',
    });
  }

  private deletar(id: number): void {
    this.loading = true;
    this.produtoService.delete(id).subscribe(() => {
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
