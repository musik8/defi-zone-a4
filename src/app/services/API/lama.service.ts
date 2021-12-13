import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Iprotocol } from './proto';




@Injectable({
  providedIn: 'root'
})
export class LamaService {

  constructor(private http: HttpClient) { }

  url = 'https://api.llama.fi/';
  urlGetAll = 'https://api.llama.fi/protocols';


  getAllDefi():
  Observable<any> {
    //return this.http.get(`${this.url}?s=${encodeURI(title)}&type=${type}&apikey=${this.apiKey}`).
    return this.http.get('https://api.llama.fi/protocols/').
    pipe(
      map(data => data['defiLama']));
  }
  prepareDataRequest(): Observable<object> {
    // Define the data URL
    const dataUrl = 'https://api.llama.fi/protocols/';
    // Prepare the request
    return this.http.get(dataUrl);
  }
  
  getProtocol(slug: string) {
    //return this.http.get('https://api.llama.fi/protocols/'+ slug);
    return this.http.get(`https://api.llama.fi/protocol/${slug}`);
  }

  getAllTest() {
   return this.http.get('https://api.llama.fi/protocols/');
  }

  // getDetails(id: string) {
  //   return this.http.get(`${this.url}?i=${id}&plot=full&apikey=${this.apiKey}`);
  // }
}
