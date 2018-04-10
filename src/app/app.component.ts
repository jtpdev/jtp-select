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
        genre: 'male',
        onclick: () => {
          alert('You clicked in: Wood Jhonson')
        },
        add: false
      }
    ]
  }

  change(value){
    this.selecteds = value;
  }

  type(event){
    const value = event.target.value;
    this.data.items = this.data.items.filter(i => i.id != 0);
    if(this.data.items.filter(i => i.text.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1).length == 0)
    this.data.items.push({
      id: 0,
      text: 'Criar: ' + value,
      genre: 'male',
      onclick: () => {
        const newPerson = {
          id: this.data.items.sort((i1, i2) => (i1.id - i2.id) * -1)[0].id + 1,
          text: value,
          genre: 'male'
        };
        this.data.items.push(newPerson)
        this.data.items = this.data.items.filter(i => i.id != 0);
        this.select.add(newPerson);
        this.select.updateItems();
      },
      add: false
    })
    // console.log(this.select)
    this.select.updateItems();
  }
}
