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

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {
  firestore: Firestore = inject(Firestore);

  customers: BehaviorSubject<Customer[] | null> = new BehaviorSubject<Customer[] | null>(null);

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

}
