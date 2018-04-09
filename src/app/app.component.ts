import { Component, ViewChild, ElementRef } from '@angular/core';
import { SelectComponent } from './select/select.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selecteds = [];

  data = {
    placeholder: 'Type here',
    items: [
      {
        id: 1,
        text: 'John Doe',
        genre: 'male'
      },
      {
        id: 2,
        text: 'Janete Doe',
        genre: 'female'
      },
      {
        id: 3,
        text: 'Elisabeth Owlsen',
        genre: 'female'
      },
      {
        id: 4,
        text: 'Jonny Jhonson',
        genre: 'male'
      },
      {
        id: 5,
        text: 'Marlon Doe',
        genre: 'male'
      },
      {
        id: 6,
        text: 'Marlene Doe',
        genre: 'female'
      },
      {
        id: 7,
        text: 'Ester Owlsen',
        genre: 'female'
      },
      {
        id: 8,
        text: 'Wood Jhonson',
        genre: 'male'
      }
    ]
  }

  change(value){
    this.selecteds = value;
  }
}
