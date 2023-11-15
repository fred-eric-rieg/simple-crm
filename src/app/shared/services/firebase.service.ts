import { Injectable, OnDestroy, inject } from '@angular/core';
import { Unsubscribe } from '@angular/fire/auth';
import { Firestore, onSnapshot, getFirestore, collection, query, Timestamp, addDoc, updateDoc, doc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

let unsub!: Unsubscribe;

interface Customer {
  id: number;
  fid: string;
  vorname: string;
  nachname: string;
  unternehmen: string;
  email: string;
  telefon: string;
  strasse: string;
  plz: number;
  ort: string;
  anmerkungen: string;
  erstellt: Timestamp;
  geaendert: Timestamp;
}

interface Task {
  id: number;
  fid: string;
  unternehmen: string;
  anmerkungen: string;
  erstellt: Timestamp;
  geaendert: Timestamp;
  deadline: Timestamp;
  wert: number;
  posten: Posten[];
}

interface Posten {
  anzahl: number;
  produkt: string;
}

interface Produkt {
  id: number;
  fid: string;
  name: string;
  beschreibung: string;
  preis: number;
  erstellt: Timestamp;
  geaendert: Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {
  firestore: Firestore = inject(Firestore);

  customers: BehaviorSubject<Customer[] | null> = new BehaviorSubject<Customer[] | null>(null);
  tasks: BehaviorSubject<Task[] | null> = new BehaviorSubject<Task[] | null>(null);
  products: BehaviorSubject<Produkt[] | null> = new BehaviorSubject<Produkt[] | null>(null);

  constructor() { }

  ngOnDestroy(): void {
    unsub();
  }

  /**
   * Get all customers from the database as snapshot with listener,
   * that listens for changes in the database.
   */
  async getAllCustomers() {
    const db = getFirestore();
    const q = query(collection(db, 'kunden'));

    let customers: Customer[] = [];

    unsub = onSnapshot(q, (querySnapshot) => {

      customers.length = 0; // Clear array to prevent duplicates.

      querySnapshot.forEach((doc) => {
        customers.push(doc.data() as Customer);
      });
      this.customers.next(customers);
    });
  }


  async createCustomer(customer: any) {
    const db = getFirestore();
    const collectionRef = collection(db, 'kunden');
    let docRef = await addDoc(collectionRef, {
      id: customer.id,
      vorname: customer.vorname,
      nachname: customer.nachname,
      unternehmen: customer.unternehmen,
      email: customer.email,
      telefon: customer.telefon,
      strasse: customer.strasse,
      plz: customer.plz,
      ort: customer.ort,
      anmerkungen: customer.anmerkungen,
      erstellt: Timestamp.fromDate(new Date()),
      geaendert: Timestamp.fromDate(new Date())
    });

    const docId = docRef.id;

    await updateDoc(doc(db, 'kunden', docId), {
      fid: docId
    });

    return true;
  }


  async updateCustomer(customer: any) {
    const db = getFirestore();
    const docRef = doc(db, 'kunden', customer.fid);

    await updateDoc(docRef, {
      vorname: customer.vorname,
      nachname: customer.nachname,
      unternehmen: customer.unternehmen,
      email: customer.email,
      telefon: customer.telefon,
      strasse: customer.strasse,
      plz: customer.plz,
      ort: customer.ort,
      anmerkungen: customer.anmerkungen,
      geaendert: Timestamp.fromDate(new Date())
    });

    return true;
  }


  /**
   * Get all Tasks from the database as snapshot with listener,
   * that listens for changes in the database.
   */
  async getAllTasks() {
    const db = getFirestore();
    const q = query(collection(db, 'auftraege'));

    let task: Task[] = [];

    unsub = onSnapshot(q, (querySnapshot) => {

      task.length = 0; // Clear array to prevent duplicates.

      querySnapshot.forEach((doc) => {
        task.push(doc.data() as Task);
      });
      this.tasks.next(task);
    });
  }

  async createTask(task: any) {
    const db = getFirestore();
    const collectionRef = collection(db, 'auftraege');
    let docRef = await addDoc(collectionRef, {
      id: task.id,
      unternehmen: task.unternehmen,
      anmerkungen: task.anmerkungen,
      posten: task.posten,
      deadline: task.deadline,
      erstellt: Timestamp.fromDate(new Date()),
      geaendert: Timestamp.fromDate(new Date())
    });

    const docId = docRef.id;

    await updateDoc(doc(db, 'auftraege', docId), {
      fid: docId
    });

    return true;
  }


  async updateTask(task: any) {
    const db = getFirestore();
    const docRef = doc(db, 'auftraege', task.fid);

    await updateDoc(docRef, {
      unternehmen: task.unternehmen,
      anmerkungen: task.anmerkungen,
      deadline: task.deadline,
      wert: task.wert,
      posten: task.posten,
      geaendert: Timestamp.fromDate(new Date())
    });

    return true;
  }


  async getAllProducts() {
    const db = getFirestore();
    const q = query(collection(db, 'produkte'));

    let product: Produkt[] = [];

    unsub = onSnapshot(q, (querySnapshot) => {

      product.length = 0; // Clear array to prevent duplicates.

      querySnapshot.forEach((doc) => {
        product.push(doc.data() as Produkt);
      });
      this.products.next(product);
    });
  }


  async createProduct(product: any) {
    const db = getFirestore();
    const collectionRef = collection(db, 'produkte');
    let docRef = await addDoc(collectionRef, {
      id: product.id,
      name: product.name,
      beschreibung: product.beschreibung,
      preis: product.preis,
      erstellt: Timestamp.fromDate(new Date()),
      geaendert: Timestamp.fromDate(new Date())
    });

    const docId = docRef.id;

    await updateDoc(doc(db, 'produkte', docId), {
      fid: docId
    });

    return true;
  }


  async updateProduct(product: any) {
    console.log(product);
    const db = getFirestore();
    const docRef = doc(db, 'produkte', product.fid);

    await updateDoc(docRef, {
      id: product.id,
      name: product.name,
      beschreibung: product.beschreibung,
      preis: product.preis,
      geaendert: Timestamp.fromDate(new Date())
    });

    return true;
  }

}
