import { Component, OnInit } from '@angular/core';
import { Item } from '../../model/item.model';
import { Observable } from 'rxjs/internal/Observable';
import { Tab1Service } from '../../service/tab1.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { from } from 'rxjs';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  // public items: Item[];
  public arrayItems: Item[];
  public totalMap: any;
  public somaTotal: number;
  private uid: string;

  public filtroFood: Item[];
  public foodMap: any; // ! comida
  public foodTotal: number;

  public filtroBill: Item[];
  public billMap: any; // * conta
  public billTotal: number;

  public filtroClothing: Item[];
  public clothingMap: any; // ? roupa
  public clothingTotal: number;

  public filtroCard: Item[];
  public cardMap: any; // ! cartão
  public cardTotal: number;

  public filtroRent: Item[];
  public rentMap: any; // * aluguel
  public rentTotal: number;

  public filtroOther: Item[];
  public otherMap: any; // ? outros
  public otherTotal: number;

  public filtroCar: Item[];
  public carMap: any; // ! veiculo
  public carTotal: number;

  public filtroTransp: Item[];
  public transpMap: any; // * transporte
  public transpTotal: number;

  public filtroHealth: Item[];
  public healthMap: any; // ? saúde
  public healthTotal: number;
  constructor(
    private tab1Service: Tab1Service,
    private router: Router,
    private auth: AngularFireAuth
  ) {
    from(this.auth.user)
      .pipe(tap(({ uid }) => (this.uid = uid)))
      // tslint:disable-next-line: deprecation
      .subscribe();
  }

  doRefresh(event) {
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
    this.get();
  }
  ngOnInit(): void {
    this.get();
    this.auth.user
      .pipe(
        tap(({ uid }) => {
          this.uid = uid;
          this.get();
        })
      )
      // tslint:disable-next-line: deprecation
      .subscribe();
    // this.auth.user.subscribe();
    // this.tab1Service.getWithfilter('Conta').subscribe(console.log);
    // this.tab1Service.getWithfilter('Comida').subscribe(console.log); //!where firebase
  }

  get() {
    // tslint:disable-next-line: deprecation
    this.tab1Service.getItems(this.uid).subscribe((res: Item[]) => {
      this.arrayItems = res;
      this.runningFilters();
    });
  }

  filterTotal() {
    this.totalMap = this.arrayItems.map(({ amount }) => Number(amount));
    this.somaTotal = this.totalMap.reduce(
      (acumulador: any, numero: any) => acumulador + numero,
      0
    );
  }

  filterFood() {
    this.filtroFood = this.arrayItems.filter(({ type }) => type === 'Comida');

    this.foodMap = this.filtroFood.map(({ amount }) => Number(amount));
    this.foodTotal = this.foodMap.reduce(
      (total: any, numero: any) => total + numero,
      0
    );
  }

  filterBill() {
    this.filtroBill = this.arrayItems.filter((param: Item) => {
      return param.type === 'Conta';
    });
    this.billMap = this.filtroBill.map((p) => p.amount).map((i) => Number(i));
    this.billTotal = this.billMap.reduce(
      (total: any, numero: any) => total + numero,
      0
    );
  }

  filterClothing() {
    this.filtroClothing = this.arrayItems.filter((param: Item) => {
      return param.type === 'Roupa';
    });
    this.clothingMap = this.filtroClothing
      .map((p) => p.amount)
      .map((i) => Number(i));
    this.clothingTotal = this.clothingMap.reduce(
      (total: any, numero: any) => total + numero,
      0
    );
  }

  filterCard() {
    this.filtroCard = this.arrayItems.filter((param: Item) => {
      return param.type === 'Cartão';
    });
    this.cardMap = this.filtroCard.map((p) => p.amount).map((i) => Number(i));
    this.cardTotal = this.cardMap.reduce(
      (total: any, numero: any) => total + numero,
      0
    );
  }

  filterRent() {
    this.filtroRent = this.arrayItems.filter((param: Item) => {
      return param.type === 'Aluguel';
    });
    this.rentMap = this.filtroRent.map((p) => p.amount).map((i) => Number(i));
    this.rentTotal = this.rentMap.reduce(
      (total: any, numero: any) => total + numero,
      0
    );
  }

  filterOther() {
    this.filtroOther = this.arrayItems.filter((param: Item) => {
      return param.type === 'Outros';
    });
    this.otherMap = this.filtroOther.map((p) => p.amount).map((i) => Number(i));
    this.otherTotal = this.otherMap.reduce(
      (total: any, numero: any) => total + numero,
      0
    );
  }

  filterCar() {
    this.filtroCar = this.arrayItems.filter((param: Item) => {
      return param.type === 'Veículo';
    });
    this.carMap = this.filtroCar.map((p) => p.amount).map((i) => Number(i));
    this.carTotal = this.carMap.reduce(
      (total: any, numero: any) => total + numero,
      0
    );
  }
  filterTransp() {
    this.filtroTransp = this.arrayItems.filter((param: Item) => {
      return param.type === 'Transporte';
    });
    this.transpMap = this.filtroTransp
      .map((p) => p.amount)
      .map((i) => Number(i));
    this.transpTotal = this.transpMap.reduce(
      (total: any, numero: any) => total + numero,
      0
    );
  }
  filterHealth() {
    this.filtroHealth = this.arrayItems.filter((param: Item) => {
      return param.type === 'Saúde';
    });
    this.healthMap = this.filtroHealth
      .map((p) => p.amount)
      .map((i) => Number(i));
    this.healthTotal = this.healthMap.reduce(
      (total: any, numero: any) => total + numero,
      0
    );
  }

  runningFilters() {
    this.filterFood();
    this.filterBill();
    this.filterClothing();
    this.filterCard();
    this.filterRent();
    this.filterOther();
    this.filterCar();
    this.filterTransp();
    this.filterHealth();
    this.filterTotal();
  }

  logout() {
    this.auth
      .signOut()
      .then((r) => {
        console.log(r);
        this.router.navigateByUrl('login');
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
