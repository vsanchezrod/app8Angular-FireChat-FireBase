import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

// Interfaz
import { Mensaje } from '../interfaces/mensaje.interfaces';

// Se importa para poder usar map
import 'rxjs-compat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // Para poder leer una colección
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  // Array que contendrá los chats
  public chat: Mensaje[] = [];

  constructor(private afs: AngularFirestore) {}

  // Método para cargar mensajes
  cargarMensajes() {

    this.itemsCollection = this.afs.collection<Mensaje>('chats');

    // Con valueChanges se está pendiente de todos los cambios.
    // Esta función devuelve un observable
    return this.itemsCollection.valueChanges().map ((mensajes: Mensaje[]) => {
      console.log(mensajes);

      // Guardo el array de mensajes en el array chat y se podrá trabajar con el en ChatComponent
      this.chat = mensajes;
    });
  }

  // Método para mandar el mensaje a Firebase
  agregarMensaje(texto: string) {

    // Se crea una variable de tipo mensaje. FALTA el uid del usuario
    let mensaje: Mensaje = {
      nombre: 'Prueba',
      mensaje: texto,
      fecha: new Date().getTime(),
    };

    // Se manda el mensaje (devuelve una promesa, por lo que se puede usar el catch en cualquier lado que se necesite)
    return this.itemsCollection.add(mensaje);


  }



}
