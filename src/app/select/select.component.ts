import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { LevenshteinService } from "simple-levenshtein";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'jtp-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() data;
  @Input() multiple = true;
  @Output() onSelect = new EventEmitter<any>();
  @Output() onRemove = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<any>();
  @Output() onType = new EventEmitter<any>();
  @ViewChild('typer') typer;
  items = [];
  onSelectSub: Subscription;
  onRemoveSub: Subscription;
  selecteds = [];
  isOpen = false;
  selectedIndex = 0;
  typed;

  constructor(
    private levenshtein: LevenshteinService
  ) { }

  ngOnInit() {
    if (this.data && this.data.items) {
      this.updateItems();
    }
    this.onSelectSub = this.onSelect.subscribe(value => this.onChange.emit(value));
    this.onRemoveSub = this.onRemove.subscribe(value => this.onChange.emit(value));
  }

  ngOnDestroy() {
    this.unsubscribe(this.onSelectSub, this.onRemoveSub);
  }

  public updateItems() {
    this.items = this.data.items;
    this.items = this.items.filter(f => f && f.text);
    this.items.sort((i1, i2) => i1.text.localeCompare(i2.text));
    this.find(this.typer.nativeElement.value);
  }

  unsubscribe(...subscriptions: Subscription[]) {
    subscriptions.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  private sort() {
    this.items.sort((i1, i2) => i1.text.localeCompare(i2.text));
  }

  find(value) {
    if(this.multiple) {
      if (this.data && this.data.items) {
        this.items = this.data.items.filter(i => i && i.text && (i.text.toLowerCase().trim().indexOf(value.toLowerCase().trim()) !== -1
          || this.levenshtein.distance(i.text.toLowerCase().trim(), value.toLowerCase().trim()) < 3));
        if (this.selecteds.length > 0) {
          this.items = this.items.filter(i => this.selecteds.map(it => JSON.stringify(it)).indexOf(JSON.stringify(i)) == -1);
        }
      }
    } else {
      this.items = this.data.items.filter(i => i && i.text && (i.text.toLowerCase().trim().indexOf(value.toLowerCase().trim()) !== -1
      || this.levenshtein.distance(i.text.toLowerCase().trim(), value.toLowerCase().trim()) < 3));
    }
    // this.selectedIndex = 0;
  }

  add(item) {
    if (this.multiple) {
      if (this.selecteds.filter(i => JSON.stringify(i) == JSON.stringify(item)).length == 0
      && (item.add || item.add == null)) {
        console.log('entrou')
        this.selecteds.push(item);
        this.onSelect.emit(this.selecteds);
        this.items = this.items.filter(i => this.selecteds.map(it => JSON.stringify(it)).indexOf(JSON.stringify(i)) == -1);
      }
      this.selectedIndex = 0;
    } else {
      this.selecteds = [item];
      this.onSelect.emit(this.selecteds);
      this.isOpen = false;
      this.typed = item.text;
    }
    if (item.onadd) {
      item.onadd();
    }
  }

  remove(selected) {
    this.selecteds = this.selecteds.filter(i => JSON.stringify(i) != JSON.stringify(selected));
    this.onRemove.emit(this.selecteds);
    if (this.multiple) {
      this.items.push(selected);
    }
    this.sort();
    this.selectedIndex = 0;
  }

  keyUp(event) {
    this.onType.emit(event);
    if (!this.multiple
      && this.selecteds.length > 0
      && event.target.value.length == 0
      && this.isOpen) {
      this.remove(this.selecteds[this.selecteds.length - 1]);
    }
    if (event.keyCode == 9) {
      event.preventDefault();
    }
    if (event.keyCode == 13 && this.items.length > 0) {
      this.add(this.items[this.selectedIndex]);
      event.target.value = null;
      this.find(event.target.value);
    }
    if (event.keyCode == 40 && this.items.length > 0) {
      if (this.selectedIndex < this.items.length - 1) {
        this.selectedIndex++;
      }
    }
    if (event.keyCode == 38 && this.items.length > 0) {
      if (this.selectedIndex > 0) {
        this.selectedIndex--;
      }
    }
  }

  keyDown(event) {
    if(!this.isOpen) {
      this.isOpen = true;
    }
    if (event.keyCode == 8
      && this.selecteds.length > 0
      && event.target.value.length == 0) {
      this.remove(this.selecteds[this.selecteds.length - 1]);
    }
    if (event.keyCode == 9
      && this.items.length > 0) {
        // if(this.multiple) {
        //   this.add(this.items[0]);
        // }
      event.preventDefault();
      // this.focus();
    }
  }

  setSelectedIndex(index) {
    this.selectedIndex = index;
  }

  close(event) {
    if (this.isOpen && this.selectedIndex < 0) {
      this.isOpen = false;
      if (this.selecteds.length == 0) {
        this.typed = '';
        this.find(this.typed);
      }
    }
  }

  addByClick(item) {
    this.focus();
    this.add(item);
    if (this.items.length > 0) this.selectedIndex = 0;
  }

  onclick(clickFunction) {
    if (clickFunction) {
      clickFunction();
    }
  }

  open(value){
    this.isOpen = true;
    this.items = this.data.items.filter(i => !value || i && i.text && (i.text.toLowerCase().trim().indexOf(value.toLowerCase().trim()) !== -1
      || this.levenshtein.distance(i.text.toLowerCase().trim(), value.toLowerCase().trim()) < 3));
  }

  private focus() {
    this.typer.nativeElement.focus();
    this.selectedIndex = 0;
  }

  private blurInputCursor() {
    return document.activeElement.id != 'typer';
  }
}
