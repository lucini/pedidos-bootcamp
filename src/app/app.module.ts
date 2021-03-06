import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ClienteComponent} from './cliente/cliente.component';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {ClienteFormComponent} from './cliente/cliente-form/cliente-form.component';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AutoCompleteModule, CalendarModule, DialogModule, DropdownModule, MenuModule, SidebarModule, TooltipModule} from 'primeng/primeng';
import {SidebarService} from './service/sidebar.service';
import {ProdutoComponent} from './produto/produto.component';
import {ProdutoFormComponent} from './produto/produto-form/produto-form.component';
import {PedidoModule} from './pedido/pedido.module';
import { MarcaTextoDirective } from './directive/marca-texto.directive';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import {HttpRequestInterceptor} from './config/http-request.interceptor';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    ClienteFormComponent,
    ProdutoComponent,
    ProdutoFormComponent,
    MarcaTextoDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ToastModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    SidebarModule,
    CalendarModule,
    DropdownModule,
    DialogModule,
    AutoCompleteModule,
    PedidoModule,
    MenuModule,
    TooltipModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    SidebarService,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  exports: [
    MarcaTextoDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
