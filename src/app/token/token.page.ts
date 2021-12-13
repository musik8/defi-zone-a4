import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { GeckoService } from '../services/API/gecko.service';
import { ToastController } from '@ionic/angular';
//import { LocalDbService } from './../services/db.service'
@Component({
  selector: 'app-token',
  templateUrl: './token.page.html',
  styleUrls: ['./token.page.scss'],
})
export class TokenPage implements OnInit {

  findToken: FormGroup;
  calcForm: FormGroup;
  noTokenResult: any;
  tokenResult: any; 
  tokenValues: any; 

  userAmount: number;
  userValue: number;
  tokenCalced: any; 

  //SavedItem: any;


  constructor(
    public formBuilder: FormBuilder,
    private geckoService: GeckoService,
    private toast: ToastController
   
   
  ) { 
    

  }

  ngOnInit() {
    this.findToken = this.formBuilder.group({
      token_name: ['']
    })
    this.calcForm = this.formBuilder.group({
      token_amount: ['']
    })
  }

  getPrice(id) {
    this.geckoService.getTokenPrice(id).subscribe(
      (data) => {
         this.tokenValues = data[id].usd
         console.log(data[id].usd)
       },
       (error) => {
       console.log('error', error)
       }
    );
  }
  


  findFormSubmit() {
    console.log("Find Active");
    if(this.findToken.value.token_name) {
    console.log(this.findToken.value.token_name);
    this.geckoService.searchToken(this.findToken.value.token_name).subscribe(
      (data) => {
      
        this.tokenResult = data
        console.log(data)
        this.noTokenResult = false;
        this.getPrice(this.tokenResult.id);
        this.presentToast("Found: " + this.findToken.value.token_name);
      },
      (error) => {
      console.log('error', error)
      this.noTokenResult = true;
      this.tokenResult = false;   
      this.presentToast("Not Found: " + this.findToken.value.token_name);
    }
   );
    }
  }
  calcFormSubmit() {
    
    this.userAmount = this.calcForm.value.token_amount;
    this.userValue = this.calcForm.value.token_amount * this.tokenValues;
    this.tokenCalced = true; 

    console.log("Calculate Money");

  }

  saveToken() {
    console.log("Saved");
    this.presentToast("Token Added To Protocol!");
    
  }

  async presentToast(msg: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }


}
