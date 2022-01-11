//Hassan ALYafai - Rihal Application challenge - 11/1/2022

import { Component, Input } from '@angular/core';
import { db, Classes, Countries } from '../../../Database/db';
import { liveQuery } from 'dexie';

@Component({
  selector: 'student-list',
  templateUrl: 'studentList.component.html',
  styleUrls: ['studentList.component.css'],
})
export class StudentListComponent {
  @Input() classes: Classes;
  @Input() countryList: Countries[];

  // Observe an arbritary query:
  students$ = liveQuery(() =>
    db.students
      .where({
        class_id: this.classes.id,
      })
      .toArray()
  );

  async onAddStudent() {
    await db.students
      .add({
        name: this.studentName,
        class_id: this.classes.id,
        country_id: this.countryId,
        date_of_birth: this.dateOfBirth,
      })
      .then(() => {
        //update student count display per country and class
      });
  }

  async onDeleteStudent(studentId: number) {
    await db.students.delete(studentId).then(() => {
      //update student count display per country and class
    });
  }

  //initial field values
  studentName = '';
  countryId = 0;
  dateOfBirth = new Date(1980 - 1 - 1);
}
