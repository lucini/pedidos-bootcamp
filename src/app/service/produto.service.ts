import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Cliente} from '../model/cliente';
import {HttpClient} from '@angular/common/http';
import {Produto} from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends BaseService<Produto> {

  constructor(protected http: HttpClient) {
    super(http, 'produto');
  }
}
