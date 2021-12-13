import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GeckoService  {

  pingTest = "https://api.coingecko.com/api/v3/ping"; 

  constructor(private http: HttpClient) { 
    
  }

  searchToken(name: string) {
    return this.http.get(`https://api.coingecko.com/api/v3/coins/${name}`);
  }
  getTokenPrice(id: string) {
    return this.http.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=USD`)
  }
  getPing() {
    return this.http.get(this.pingTest);
   }
}
