import { Component, OnInit } from '@angular/core';
import {DataStorageService} from "./data-storage.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [DataStorageService]
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
