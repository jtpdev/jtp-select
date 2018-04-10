
# JtpSelect

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/bdf1956a2bf0447aad4fd96da6159c26)](https://www.codacy.com/app/jtpdev/ng-alert?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=jtpdev/ng-alert&amp;utm_campaign=Badge_Grade)

## Install

To install this, use:

> npm install --save jtp-select

## Use

To use in your project import it in your module like that:

    import { BrowserModule } from '@angular/platform-browser';
    import { NgModule } from '@angular/core';


    import { AppComponent } from './app.component';
    import { SelectModule } from 'jtp-select';
    import { LevenshteinService } from 'simple-levenshtein';


    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        SelectModule
      ],
      providers: [
        LevenshteinService
      ],
      bootstrap: [AppComponent]
    })
    export class AppModule { }


and use in your component:

    <jtp-select #select
      [data]="data"
      (onType)="type($event)"
      (onChange)="change($event)"></jtp-select>

and

    import { Component, ViewChild, ElementRef } from '@angular/core';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {

      @ViewChild('select') select;

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
              alert('You clicked in: Wood Jhonson') // this is the event that is call on  add event
            },
            add: false // If false, don't add on select's items
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
          text: 'Create: ' + value,
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


And done!
