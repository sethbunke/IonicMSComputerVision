import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import {Camera} from 'ionic-native';


@Component({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {

  base64Image: string;
  saveToPhotoAlbum: boolean;

  constructor(private navController: NavController) {
      this.saveToPhotoAlbum = false;
  }

  presentAlert(title:string, subtitle:string) {
    let alert = Alert.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Dismiss']
    });
    this.navController.present(alert);
  }

  takePicture() {  
        Camera.getPicture({
            quality : 100,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: this.saveToPhotoAlbum,
            correctOrientation: true  
        }).then(imageData => {
            this.base64Image = "data:image/jpeg;base64," + imageData;
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
            this.presentAlert('Error', error);
        });
    }
}
