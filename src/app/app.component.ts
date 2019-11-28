import {Component, OnInit} from '@angular/core';
import {SidebarService} from './service/sidebar.service';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pedidos-bootcamp';
  displaySidebar: boolean;
  menuList: MenuItem[];

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.getMostrar$().subscribe(val => this.displaySidebar = val);
    this.menuList = [
      {
        label: 'Home',
        routerLink: '/',
        icon: 'pi pi-home'
      },
      {
        label: 'Produto',
        routerLink: 'produto',
        icon: 'pi pi-briefcase'
      },
      {
        label: 'Cliente',
        routerLink: 'cliente',
        icon: 'pi pi-users'
      },
      {
        label: 'Pedido',
        routerLink: 'pedido',
        icon: 'pi pi-shopping-cart'
      },

    ];
  }

  ngOnInit(): void {
    // this.sidebarService.setMostrar(true);
  }

  abrirFecharMenu() {
    this.sidebarService.setMostrar(!this.displaySidebar);
  }
}
