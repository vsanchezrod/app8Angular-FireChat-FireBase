import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent {

  mensaje: string = '';

  constructor() { }

  // Método para enviar mensajes
  enviarMensaje() {
    console.log(this.mensaje);
  }

}
