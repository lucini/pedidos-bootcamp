import {Component, OnInit} from '@angular/core';
import {Cliente} from '../../model/cliente';
import {ActivatedRoute, Router} from '@angular/router';
import {ClienteService} from '../../service/cliente.service';
import {MessageService, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html'
})
export class ClienteFormComponent implements OnInit {

  objeto: Cliente;

  constructor(private activatedRoute: ActivatedRoute,
              private clienteService: ClienteService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
        this.clienteService.findOne(parseInt(params.get('id'))).subscribe(res => {
          this.objeto = res;
        });
      } else {
        this.resetaForm();
      }
    });
  }

  salvar(): void {
    this.clienteService.save(this.objeto).subscribe(res => {
      this.objeto = res;

      this.messageService.add({
        severity: 'success',
        summary: 'Salvo com sucesso!'
      });

      this.router.navigateByUrl('cliente');
    }, erro => {
      this.messageService.add({
        severity: 'error',
        summary: erro.error.message
      });
    });
  }

  private resetaForm(): void {
    this.objeto = new Cliente();
    this.objeto.nome = '';
    this.objeto.cpf = '';
    this.objeto.telefone = '';
  }
}
