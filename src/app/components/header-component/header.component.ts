//Hassan ALYafai - Rihal Application challenge - 11/1/2022

import { Component } from '@angular/core';
import { db, Classes, Student } from '../../../Database/db';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  onPopulate() {
    db.populate();
  }
}
