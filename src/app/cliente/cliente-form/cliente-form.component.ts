import {Component, OnInit} from '@angular/core';
import {Cliente} from '../../model/cliente';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ClienteService} from '../../service/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  objeto: Cliente;

  constructor(private activatedRoute: ActivatedRoute,
              private clienteService: ClienteService,
              private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      if (params.has('id')) {
      } else {
        this.resetaForm();
      }
    });
  }

  private resetaForm(): void {
    this.objeto = new Cliente();
    this.objeto.nome = '';
    this.objeto.cpf = '';
    this.objeto.telefone = '';
  }

  salvar(): void {
    this.clienteService.save(this.objeto).subscribe(res => {
      this.objeto = res;
      this.router.navigateByUrl('cliente');
    });
  }
}
