import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {

  constructor(private navController: NavController) {
  }

  takePicture() {  
        Camera.getPicture({
            quality : 75,
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
