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
  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) {}

  // Método para cargar mensajes
  cargarMensajes() {

    // Se necesita mandar una query a Firebase para ordenar los mensajes que se cargan (ref => ...) y con se limitan los mensajes a cargar
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5));

    // Con valueChanges se está pendiente de todos los cambios. Esta función devuelve un observable
    return this.itemsCollection.valueChanges().map ((mensajes: Mensaje[]) => {
      console.log(mensajes);

      /* Guardo el array de mensajes en el array chat pero siempre insertándolos en la primera posición del array
      Si no se hace esto, saldrán los mensajes en orden inverso*/
      this.chats = [];

      for (let mensaje of mensajes) {
        this.chats.unshift(mensaje);
      }

      return this.chats;
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
