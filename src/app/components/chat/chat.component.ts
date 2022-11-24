import { Component, OnInit } from '@angular/core';
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

  constructor(public mensagemService: MensagemService, public authService: AuthService) { }

  mensagem!:Mensagem;
  mensagens!: Observable<any>;
  ngOnInit(): void {
    this.mensagem = new Mensagem();
    this.mensagens = this.mensagemService.getAll();
  }

  onSubimit() {
    this.mensagemService.insert(this.mensagem);

  }


}
