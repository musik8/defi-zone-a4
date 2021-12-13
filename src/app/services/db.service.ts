import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Defi, Token } from './defi';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})

export class LocalDbService {

  private storage: SQLiteObject;
  
  favList = new BehaviorSubject([]);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {



    //Create the database
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'defi_zone_db.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
      });
    });

  }

  //Create the tables based on dump file 
  setupData() {
    this.httpClient.get(
      'assets/dump.sql', 
      {responseType: 'text'}
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getFavoriteList();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }


  dbState() {
    return this.isDbReady.asObservable();
  }
 
  //Retrieve List To Home Page
  fetchFavList(): Observable<Defi[]> {
    return this.favList.asObservable();
  }

  // Get list of all favorites from database and store it in the service
  getFavoriteList(){
    return this.storage.executeSql('SELECT * FROM FavDefi', []).then(res => {
      let items: Defi[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            lama_id: res.rows.item(i).lama_id
           });
        }
      }
      this.favList.next(items);
    });
  }

  // Add favorite item to database then refresh the service
  addFavItem(lama_id) {
    return this.storage.executeSql('INSERT INTO FavDefi (lama_id) VALUES (?)', lama_id)
    .then(res => {
      this.getFavoriteList();
    });
  }

  // Add token and add foreign key
  addTokenItem(g_id, t_amount, favId): Promise<Tokens[]> {
    let data = [g_id, t_amount, favId];
    return this.storage.executeSql('INSERT INTO SavedTokens (geckoID, amount, FavID) VALUES (?,?,?)',data)
    .then(res => {
      this.getListOfTokens();
    });
  }
 
  //Delet item based on id
  deleteFavListItem(id) {
    return this.storage.executeSql('DELETE FROM FavDefi WHERE ID = ?', [id])
    .then(_ => {
      this.getFavoriteList();
    });
  }

  // Get single item 
  //Retrieving based on lama id, not database ID
  getSingleFav(id): Promise<Defi> {
    return this.storage.executeSql('SELECT * FROM FavDefi WHERE lama_id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        lama_id: res.rows.item(0).lama_id
      }
    });
  }

  //This retrevies list of tokens based on FavDefi Foreign ids / keys 
  getListOfTokens(id): Promise<Token[]> {
    return this.storage.executeSql('SELECT * FROM SavedTokens WHERE FavID = ?', [id]).then(res => { 
      let items: Token[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            geckoID: res.rows.item(i).geckoID,
            amount: res.rows.item(i).amount,
            FavID: res.rows.item(i).FavID
          });
        }
      }
      return items;
    });
   
  }

  
  

  // Delete Favorite Item based on id then refresh the service 
 
}