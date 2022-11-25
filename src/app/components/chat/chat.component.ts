import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MensagemService } from 'src/app/shared/services/mensagem.service';
import { Mensagem } from '../../shared/services/mensagem';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('filterName') redel!: string;

  constructor(public mensagemService: MensagemService, public authService: AuthService) { }

  mensagem!: Mensagem;
  mensagens!: Observable<any>;
  ngOnInit(): void {
    this.mensagem = new Mensagem();
    this.mensagens = this.mensagemService.getAll();
  }

  onSubimit() {

    // recebida = recebida.substr(0, 18) + " " + recebida.substr(-2);

    // var data = new Date("dd/mm/yyyy");

    // var resultado = data.toLocaleString();
    this.mensagem.date = this.formatDate(new Date());
    this.mensagem.nameUser = this.authService.userData.displayName;
    this.mensagemService.insert(this.mensagem);
    this.redel = "";

  }

  formatDate(date:any) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  padTo2Digits(num:any) {
    return num.toString().padStart(2, '0');
  }



}
