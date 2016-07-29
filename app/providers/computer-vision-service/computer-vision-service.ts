import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http'; //Change to import Headers
import 'rxjs/add/operator/map';

/*
  Generated class for the ComputerVisionService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ComputerVisionService {
  data: any;
  url: string;
  apiKey: string;
  contentType: string;

  constructor(private http: Http) {
    this.data = null;
    //TODO: INJECT AND LOAD THESE FROM CONFIG 
    this.url = 'https://api.projectoxford.ai/vision/v1.0/analyze?visualFeatures=Categories,Tags,Description,Faces';
    this.contentType = 'application/octet-stream';
    this.apiKey = 'YOUR API KEY HERE';
  }

  createHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', this.contentType);
    headers.append('Ocp-Apim-Subscription-Key', this.apiKey);
    return headers;
  }

  getFacesForImageBase64Data(base64data:string){
 
    // let headers = new Headers();
    // headers.append('Content-Type', this.contentType);
    // headers.append('Ocp-Apim-Subscription-Key', this.apiKey);
    let headers = this.createHeaders();
    let blob = this.dataURItoBlob(base64data);
    let response = this.http.post(this.url, blob, {headers: headers});
    return response;     
  }

  getFacesForImageUrl(imageUrl){
 
    let headers = new Headers();
    //TODO: MOVE THESE TO SOME SORT OF CONSTANTS THAT IS LOADED GLOBALLY?
    headers.append('Content-Type', this.contentType);
    headers.append('Ocp-Apim-Subscription-Key', this.apiKey);

    let url = { url: imageUrl };
 
    let response = this.http.post(this.url, JSON.stringify(url), {headers: headers});
    return response;    
  }

  dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else {
            byteString = decodeURI(dataURI.split(',')[1]);
        }

        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to a typed array
        let ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ia], {
            type: mimeString
        });
  }


  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

