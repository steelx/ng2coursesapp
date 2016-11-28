import { Component } from '@angular/core';
import {initializeApp, database} from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  constructor() {
    // Initialize Firebase
    let config = {
      apiKey: "AIzaSyD9iohQt7IfvOohTy0btaotpoAGtbYdDFg",
      authDomain: "ng2project01.firebaseapp.com",
      databaseURL: "https://ng2project01.firebaseio.com",
      storageBucket: "ng2project01.appspot.com",
      messagingSenderId: "154189419076"
    };
    initializeApp(config);

    let root = database().ref();

    root.on('value', (snap) => {
      console.log(snap.val());
      
    });

  }
}
