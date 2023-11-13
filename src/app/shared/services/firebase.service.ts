import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, onSnapshot, getFirestore, collection, query, Timestamp, addDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';


interface Customer {
  id: number;
  vorname: string;
  nachname: string;
  unternehmen: string;
  email: string;
  telefon: string;
  strasse: string;
  plz: number;
  ort: string;
  anmerkungen: string;
  erstellt: Date;
  geaendert: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {
  firestore: Firestore = inject(Firestore);

  customers: BehaviorSubject<Customer[] | null> = new BehaviorSubject<Customer[] | null>(null);

  constructor() { }

  ngOnDestroy(): void {
  }

  /**
   * Get all customers from the database as snapshot with listener,
   * that listens for changes in the database.
   */
  async getAllCustomers() {
    const db = getFirestore();
    const q = query(collection(db, 'kunden'));

    let customers: Customer[] = [];

    const unsub = onSnapshot(q, (querySnapshot) => {

      customers.length = 0; // Clear array to prevent duplicates.

      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        customers.push(doc.data() as Customer);
      });
    });

    this.customers.next(customers);
  }


  async createCustomer(customer: any) {
    const db = getFirestore();
    const collectionRef = collection(db, 'kunden');
    await addDoc(collectionRef, {
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
    return true;
  }

}
