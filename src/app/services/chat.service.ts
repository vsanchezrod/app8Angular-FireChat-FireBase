import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { ObservableLike } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // Para poder leer una colección
  private itemsCollection: AngularFirestoreCollection<any>;
  // Array que contendrá los chats
  public chat: any[] = [];

  constructor(private afs: AngularFirestore) {}

  // Método para cargar mensajes
  cargarMensajes() {

    this.itemsCollection = this.afs.collection<any>('chats');

    // Con valueChanges se está pendiente de todos los cambios.
    // Esta función devuelve un observable
    return this.itemsCollection.valueChanges();
  }

}
