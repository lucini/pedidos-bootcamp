import {Component, OnInit} from '@angular/core';
import {Cliente} from '../model/cliente';
import {ClienteService} from '../service/cliente.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ListComponent} from '../component/list.component';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent extends ListComponent<Cliente> implements OnInit {

  constructor(private clienteService: ClienteService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private titleService: Title) {
    super();
    this.cols = [
      {field: 'id', header: 'Código'},
      {field: 'nome', header: 'Nome'},
      {field: 'cpf', header: 'CPF'},
      {field: 'telefone', header: 'Telefone'},
    ];
  }

  ngOnInit() {
    this.titleService.setTitle('Lista de Clientes');
  }

  carregarLista(): void {
    this.loading = true;
    this.clienteService.findAll().subscribe(res => {
      this.lista = res;
      setTimeout(() => this.loading = false);
    });
  }

  excluir(id: number): void {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja excluir esse cliente?',
      accept: () => this.deletar(id),
      acceptLabel: 'SIM',
      rejectLabel: 'NÃO',
    });
  }

  private deletar(id: number): void {
    this.loading = true;
    this.clienteService.delete(id).subscribe(() => {
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
