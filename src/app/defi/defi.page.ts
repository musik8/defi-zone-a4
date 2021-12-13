
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
//import { LocalDbService } from './../services/db.service'
import { ActivatedRoute, Router } from "@angular/router";
import { LamaService } from '../services/API/lama.service';
import { GeckoService } from '../services/API/gecko.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-defi',
  templateUrl: './defi.page.html',
  styleUrls: ['./defi.page.scss'],
})
export class DefiPage implements OnInit {
  editForm: FormGroup;
  slug: any;
  protoDetail: any; 
  protoValue: number;
  nativeTokenValue: any; 

  fav: any; 
 //SavedItem: any;
 // savedTokens: any;
 // DisplayTokens: any;

  constructor(
    //private db: LocalDbService,
    private router: Router,
    public formBuilder: FormBuilder,
    private actRoute: ActivatedRoute,
    private lamaService: LamaService,
    private geckoService: GeckoService, 
    private toast: ToastController,
  ) {
    this.slug = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.slug)
   
  }

  ngOnInit() {
    
    this.lamaService.getProtocol(this.slug).subscribe(
      (data) => {
        this.protoDetail = data
        console.log(this.protoDetail)
     
        this.protoValue = (this.protoDetail.tvl[0].totalLiquidityUSD).toLocaleString(
          undefined, { minimumFractionDigits: 2 }
        );

        
        this.getPlateformToken();  

        //Find out if saved
        //this.getSavedInfo(this.protoDetail.id);  
      },
      (error) => console.log('error', error),
   );
  }

  //Find a value that has the same lama id and retreive
  //IF there is a value, check to see if there are any Tokens with the ID
  // getSavedInfo(lamaID) {
  //   
  //   this.db.dbState().subscribe((res) => {
  //       if(res){
  //         this.db.getSingleFav(lamaID).subscribe(item => {
  //           this.SavedItem = item
  //         })
  //     }
  //   }

  //   //This would set the state of the page, 
  //   //If saved, show tokens
  //   if(saveedItem) {
  //     this.fav = true;
  //     let savedTokensTemp: any[] = [];

  //     Retrieve tokens based on fav item id

  //     this.db.dbState().subscribe((res) => {
  //       if(res){
  //         this.db.getListOfTokens(saveedItem.id).subscribe(item => {
  //           this.savedTokens = item;
  //         })
  //       }
  //     }
  //   } else {
  //     this.fav = false
  //   }

    //Use API to get data
    // if(this.savedTokens) {

      
    // }


  //   }


  addToFav() {

    if(!this.fav) {
      this.fav = true;
      this.presentToast(this.protoDetail.name + " Added To Saved");
      //this.db.addFavItem(this.protoDetail.id)
    } else {
      this.fav = undefined; 
      this.presentToast(this.protoDetail.name + " Removed From Saved");
      //this.db.deleteFavListItem(this.SavedItem.id);
    }

  }

  getPlateformToken() {
    this.geckoService.getTokenPrice(this.protoDetail.gecko_id).subscribe(
      (data) => {
        this.nativeTokenValue = data[this.protoDetail.gecko_id].usd;
        console.log(this.nativeTokenValue);
      }
    );
  }

  async presentToast(msg: string) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}