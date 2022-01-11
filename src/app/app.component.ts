//Hassan ALYafai - Rihal Application challenge - 11/1/2022

import { Component, OnInit } from '@angular/core';
import { liveQuery } from 'dexie';
import { db, Student } from '../Database/db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  classList_isLoading = true;
  countryList_isLoading = true;

  ngOnInit() {
    this.classList_isLoading = true;
    this.countryList_isLoading = true;
  }

  student_country_counter: Student[][] = [];
  student_class_counter: Student[][] = [];

  countryList$ = liveQuery(() => db.countries.toArray());
  classList$ = liveQuery(() => db.classes.toArray());

  avg: number = 0;

  avgStudentAge$ = liveQuery(() =>
    db.students.toArray().then((students) => {
      let ages = 0;
      let totalCount = 0;
      students.forEach((s) => {
        let timeDiff = Math.abs(Date.now() - s.date_of_birth.getTime());
        ages += Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
        totalCount++;
      });

      return ages / totalCount;
    })
  ).subscribe((avg) => (this.avg = avg));

  countryCounting$ = liveQuery(() =>
    db.countries.toArray().then((list) => {
      for (let i = 0; i <= list.length - 1; i++) {
        liveQuery(() =>
          db.students
            .where({
              country_id: list[i].id,
            })
            .toArray()
        ).subscribe(
          (list) => (this.student_country_counter[i] = list ? list : [])
        );
      }
      this.countryList_isLoading = false;
    })
  );

  classCounting$ = liveQuery(() =>
    db.classes.toArray().then((list) => {
      for (let i = 0; i <= list.length - 1; i++) {
        liveQuery(() =>
          db.students
            .where({
              class_id: list[i].id,
            })
            .toArray()
        ).subscribe((list) => (this.student_class_counter[i] = list));
      }
      this.classList_isLoading = false;
    })
  );

  title = 'rihal_full-stack-dev_application';
}
