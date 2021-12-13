
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
//import { LocalDbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
import { LamaService } from '../services/API/lama.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  mainForm: FormGroup;
  Data: any[] = [];
  topDefi: any;
 
  allDefi: any;
  data: any; 
  searchResults: any;
  topActive: any;
  SearchError: any; 

  //FavList: any[] = [];

  constructor(
    //private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router,
    private lamaService: LamaService 
  ) {
    
  }

  ionViewWillEnter() {
  
     this.lamaService.prepareDataRequest().subscribe(
        (data) => {
          this.data = data
        },
        (error) => console.log('error', error),
     );

  }

  ngOnInit() {

    //Get saved defi protocls from database

    // this.db.dbState().subscribe((res) => {
    //   if(res){
    //     this.db.fetchFavList().subscribe(item => {
    //       this.FavList = item
    //     })
    //   }
    // });
  
    this.mainForm = this.formBuilder.group({
      nameSearch: ['']
    })
  }

  searchData() {
    this.searchResults = []; 
    this.searchResults = this.data.filter(item => item.name == this.mainForm.value.nameSearch);
    if(this.searchResults.length == 0) {
      this.presentToast("No Item Found")
    } else {
      this.presentToast("Item Found!")
      this.searchResults[0].mcap = (this.searchResults[0].mcap).toLocaleString(
        undefined, { minimumFractionDigits: 2 }
      );
      console.log(this.searchResults)
    } 
    
  }
  sortProtocols() {
    
    console.log(this.data.length);
   
    let temp= this.data.sort((a, b) => b.mcap - a.mcap).slice(0,10);
    this.topDefi  = temp.map(object => {
        
        let formatCAP = (object.mcap).toLocaleString(
          undefined, { minimumFractionDigits: 2 }
        );
        return {...object, mcap: formatCAP};
     
    });
    console.log(this.topDefi)
    this.topActive = true;
  }

  async presentToast(msg: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

}
