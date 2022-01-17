//Hassan ALYafai - Rihal Application challenge - 11/1/2022

import { Component, Inject, Input } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { liveQuery } from 'dexie';
import { db, Classes, Countries, Student } from '../../../Database/db';

@Component({
  selector: 'add-class',
  templateUrl: 'class-create.component.html',
  styleUrls: ['class-create.component.css'],
})
export class ClassCreateComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  onCreateClassBtn() {
    db.classes
      .orderBy('id')
      .last()
      .then((last) => {
        this._bottomSheet.open(ClassSheetComponent, {
          data: {
            className: 'new class',
            classId: (last.id >= 0) ? last.id + 1 : 0,
            isCreateMode: true,
          },
        });
      });
  }
}

//------------------------------------------------------------

@Component({
  selector: 'class-item',
  templateUrl: 'class-item.component.html',
  styleUrls: ['class-create.component.css'],
})
export class ClassItemComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  @Input() classList: Classes[];
  @Input() countryList: Countries[];
  @Input() student_country_counter: Student[][];
  @Input() student_class_counter: Student[][];
  @Input() classList_isLoading: boolean;

  panelOpenState = false;
  isCreateMode = true;
  className = 'edit';

  async onDeleteClass(classId: number) {
    this.classList_isLoading = true;
    db.classes.delete(classId).then(() => {
      //delete all student associated
      let del = db.students
        .where({ class_id: classId })
        .toArray()
        .then((list) => {
          list.forEach((item) => {
            db.students.delete(item.id);
          });
          console.log(this.classList);

        });
      this.classList_isLoading = false;
    });
  }

  onEditClassBtn(classId: number) {
    db.classes.get(classId).then((c) => {
      this.isCreateMode = false;
      this._bottomSheet.open(ClassSheetComponent, {
        data: {
          className: c.class_name,
          classId: classId,
          isCreateMode: false,
        },
      });
    });
  }
}

//------------------------------------------------------------

@Component({
  selector: 'bottom-sheet-create-class-form',
  templateUrl: 'class-sheet.component.html',
  styleUrls: ['class-create.component.css'],
})
export class ClassSheetComponent {
  isCreateMode: boolean = true;
  classId: number = 0;
  currentName: string = 'New class';

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<ClassSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { className: string; classId: number; isCreateMode: boolean }
  ) {
    this.isCreateMode = data.isCreateMode;
    this.classId = data.classId;
    this.currentName = data.className;
  }

  onCreateClass() {
    if (this.isCreateMode) {
      db.classes.add({
        id: this.classId,
        class_name: this.currentName,
      });
    } else {
      db.classes.update(this.classId, {
        class_name: this.currentName,
      });
    }
    this._bottomSheetRef.dismiss();
  }
}
