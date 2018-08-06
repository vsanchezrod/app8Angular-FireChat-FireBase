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

  constructor(public chatService: ChatService) {

    // Subscripción al observable
    this.chatService.cargarMensajes().subscribe();

  }

  // Método para enviar mensajes
  enviarMensaje() {
    console.log(this.mensaje);

    // Si la longitud del mensaje es 0, no se hace nada
    if (this.mensaje.length === 0) {
      return;
    }

    // Si hay un mensaje escrito, lo agrego a firebase. Este método devuelve una promesa por lo que se puede usar then y catch
    this.chatService.agregarMensaje(this.mensaje)
        .then( () => {
          console.log('Mensaje guardado');
          this.mensaje = '';
        })
        .catch((err) => { console.error('Error ', err); });

  }

}
