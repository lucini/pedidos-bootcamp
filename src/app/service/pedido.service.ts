import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Pedido} from '../model/pedido';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {dateStringToDateJs} from '../helper/date.helper';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends BaseService<Pedido> {

  constructor(protected http: HttpClient) {
    super(http, 'pedido');
  }

  findOne(id: number): Observable<Pedido> {
    return super.findOne(id).pipe(map(value => {
      value.dataEmissao = dateStringToDateJs(value.dataEmissao.toString());
      return value;
    }));
  }
}
