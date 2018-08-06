import { Component } from '@angular/core';

// Angular Fire2
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  chats: Observable<any[]>;

  constructor(db: AngularFirestore) {

    // Cambiamos items por la colección que se haya creado en Firebase
    this.chats = db.collection('chats').valueChanges();
  }
}
