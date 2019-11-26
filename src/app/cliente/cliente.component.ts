import {Component, OnInit} from '@angular/core';
import {Cliente} from '../model/cliente';
import {ClienteService} from '../service/cliente.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  lista: Cliente[];
  cols: any;
  loading = false;

  constructor(private clienteService: ClienteService) {
    this.cols = [
      {field: 'id', header: 'Código'},
      {field: 'nome', header: 'Nome'},
      {field: 'cpf', header: 'CPF'},
      {field: 'telefone', header: 'Telefone'},
    ];
  }

  ngOnInit() {
  }

  carregarLista(): void {
    this.loading = true;
    this.clienteService.findAll().pipe(delay(1000)).subscribe(res => {
      this.lista = res;
      setTimeout(() => this.loading = false);
    });
  }
}
