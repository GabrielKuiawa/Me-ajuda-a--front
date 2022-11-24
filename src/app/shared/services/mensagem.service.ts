import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Mensagem } from './mensagem';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private db: AngularFireDatabase) { }

  mensagem: Mensagem = new Mensagem();
  mensagess: Observable<any> | undefined;

  insert(mensagem: Mensagem) {
    this.db.list('mensagem').push(mensagem)
      .then((result: any) => {
        console.log(result.key);
      });
  }

  getAll() {
    return this.db.list('mensagem')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({  key: c.payload.key, ...c.payload.exportVal() }));
        })
      );
  }
}
