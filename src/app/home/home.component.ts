import { Component, OnInit } from '@angular/core';
import {ClienteService} from '../service/cliente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  json: any;

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    // this.clienteService.findAll().subscribe(clientes => this.json = clientes);
    this.clienteService.findOne(1).subscribe(cliente => this.json = cliente.nome);
  }

}
