import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, onSnapshot, getFirestore, doc, collection, query } from '@angular/fire/firestore';
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
  land: string;
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


  getAllCustomers() {
    const db = getFirestore();
    const q = query(collection(db, 'kunden'));

    const customers: Customer[] = [];

    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        customers.push(doc.data() as Customer);
      });
    });

    this.customers.next(customers);
  }
}
