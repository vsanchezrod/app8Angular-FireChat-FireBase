import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

// Interfaz
import { Mensaje } from '../interfaces/mensaje.interfaces';

// Se importa para poder usar map
import 'rxjs-compat';

// Autenticación
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  // Para poder leer una colección
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  // Array que contendrá los chats
  public chats: Mensaje[] = [];

  // Recoger el usuario del login
  public usuario: any = {};


  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth) {

    // Subscripción al observable de afAuth (AngularFireAuth) - authState ( Estado de la autenticación
    // De esta manera se está escuchando cualquier cambio que suceda en el estado de la autenticación
    this.afAuth.authState.subscribe( user => {
      console.log('Estado de usuario: ', user);

      // Si no existe usuario
      if (!user) {
        return;
      }

      // Si existe usuario creo una propiedad nueva en el objeto y se iguala al user.displayName
      this.usuario.nombre = user.displayName;

      // Se crea otra propiedad nueva en el objeto con user.uid (ÚNICA) para: mensajes de un usuario en particular de forma única
      this.usuario.uid = user.uid;
      this.usuario.foto = user.photoURL;

    });
  }



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
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid,
    };

    // Se manda el mensaje (devuelve una promesa, por lo que se puede usar el catch en cualquier lado que se necesite)
    return this.itemsCollection.add(mensaje);

  }


  // LOGIN CON GOOGLE PROVIDER
  login(proveedor: string) {
    if (proveedor === 'google') {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    if (proveedor === 'twitter') {
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }

  logout() {

    // Cuando se hace logout el usuario se iguala a un objeto vacío
    this.usuario = {};
    this.afAuth.auth.signOut();
  }


}
