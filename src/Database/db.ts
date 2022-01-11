//Hassan ALYafai - Rihal Application challenge - 11/1/2022

import Dexie, { Table, Subscription } from 'dexie';

export interface Countries {
  id: number;
  name: string;
}

export interface Classes {
  id?: number;
  class_name: string;
}
export interface Student {
  id?: number;
  class_id: number;
  country_id: number;
  name: string;
  date_of_birth: Date;
}

export class AppDB extends Dexie {
  students!: Table<Student, number>;
  classes!: Table<Classes, number>;
  countries!: Table<Countries, number>;

  countryList: Countries[] = [
    { id: 0, name: 'Oman' },
    { id: 1, name: 'KSA' },
    { id: 2, name: 'Kuwait' },
    { id: 3, name: 'UAE' },
    { id: 4, name: 'Qatar' },
    { id: 5, name: 'Bahrain' },
  ];

  constructor() {
    super('ngdexieliveQuery');
    this.version(6).stores({
      classes: '++id',
      students: '++id, class_id, country_id',
      countries: '++id, name',
    });
    this.on('populate', () => this.initiateCountries());
  }

  async initiateCountries() {
    //set countries db

    console.log('add to db');
    await db.countries.bulkAdd(db.countryList);
  }

  async populate() {
    //reset
    db.classes.clear();
    db.students.clear();

    //make random population
    const randStudentsNum = randomNum(10, 4); //max is 10, min is 4
    const randClassesNum = randomNum(3, 1); //max is 3, min is 1

    const names = [
      'Hassan Mohammed',
      'Ali Salim',
      'Noor Ali',
      'Khalid Hassan',
      'Amal Said',
      'Said Ahmed',
      'Ahmed Hassan',
      'Asma Ali',
      'Omar Ahmed',
      'Razan Hassan',
    ]; //possible student names

    const dateOfBirths = [
      new Date('1991-03-24'),
      new Date('1991-03-24'),
      new Date('1991-03-24'),
      new Date('1992-04-20'),
      new Date('1981-06-28'),
      new Date('1990-01-04'),
      new Date('1991-02-21'),
      new Date('1999-07-14'),
      new Date('1996-05-03'),
      new Date('1991-11-14'),
    ]; //possible student date of birth

    const cNames = ['C# Class', 'Java Class', 'JAMStack Class', 'HTML Class']; //possible random class names

    const sNames = shuffle(names); // student shuffled names
    const scNames = shuffle(cNames); // classes shuffled names
    const sDoBs = shuffle(dateOfBirths); // student shuffled date of births

    const randStudent: Student[] = [];
    const randClasses: Classes[] = [];

    for (let r = 0; r <= randClassesNum; r++) {
      randClasses[r] = {
        id: r,
        class_name: scNames[r],
      };
    }

    //distribute student over the classes
    var classId = 0;
    var countryId = 0;
    for (let s = 0; s < randStudentsNum; s++) {
      classId = randomNum(randClassesNum, 0);
      countryId = randomNum(db.countryList.length - 1, 0);

      randStudent[s] = {
        class_id: randClasses[classId].id,
        name: sNames[s],
        country_id: db.countryList[countryId].id,
        date_of_birth: sDoBs[s],
      };
    }

    //populate student and classes tables
    await db.classes.bulkAdd(randClasses);
    await db.students.bulkAdd(randStudent).then(() => {});
  }
}

function randomNum(max: number, min: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const db = new AppDB();
