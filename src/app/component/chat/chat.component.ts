import { Component } from '@angular/core';

// Se carga el servicio
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent {

  mensaje: string = '';

  constructor(private chatService: ChatService) {

    this.chatService.cargarMensajes().subscribe( mensajes => {
      console.log(mensajes);
    });

  }

  // Método para enviar mensajes
  enviarMensaje() {
    console.log(this.mensaje);
  }

}
