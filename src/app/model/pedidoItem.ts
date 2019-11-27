import {Produto} from './produto';

export class PedidoItem {
  id: number;
  produto: Produto;
  valorUnitario: number;
  quantidade: number;
  desconto: number;
  valorTotal?: number;
  valorDesconto?: number;
}
