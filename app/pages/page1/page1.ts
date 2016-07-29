import { Component } from '@angular/core';
import { NavController, Alert } from 'ionic-angular';
import { ComputerVisionService } from '../../providers/computer-vision-service/computer-vision-service';
import {Camera} from 'ionic-native';


@Component({
  templateUrl: 'build/pages/page1/page1.html',
  providers: [ComputerVisionService]
})
export class Page1 {

    response: any;
    base64Image: string;
    saveToPhotoAlbum: boolean;

  constructor(private navController: NavController, private computerVisionService: ComputerVisionService) {
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
            console.log('image captured successfully');

        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
            this.presentAlert('Error', error);
        });
    }
    callComputerVisionService() {
        //verify that the the base64 data is there

        console.log('calling computerVisionService');

        this.computerVisionService.getFacesForImageBase64Data(this.base64Image).subscribe(
            data => {
                console.log(data); //comment
                this.response = JSON.stringify(data.json());
                let resp = data.json(); 
                this.presentAlert('Success', 'Successful repsonse from service');
            },
                err => {
                console.log(err);
                this.response = err;
                this.presentAlert('Error', err);
            },
            () => console.log('Computer Vision Service Call Complete')
        );
    }
}
