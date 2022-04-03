import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lat;
  lng;

  locationList = [] // Array to store list elements
  constructor(private geo: Geolocation   ) {
    
  }

  removeLocation(index){
    this.locationList.splice(index,1)
    const removeItem = async()=>{
      await Storage.remove({key: index})
    }
    removeItem()
    
  }
  
  setLocation = async ()=>{
    const location = JSON.stringify([{
      timestamp: Date(),
      lati: this.lat,
      longi:this.lng
    }])

    await Storage.set({key:Date(), value: location})
    console.log(Date())
    console.log(await Storage.get({key:Date()}))
  }
  myLocation(){
    this.geo.getCurrentPosition().then((res)=>{
      this.lat = res.coords.latitude;
      this.lng = res.coords.longitude;
      this.locationList.push(JSON.stringify([this.lat, this.lng]))
      console.log(this.locationList)
      this.setLocation();
    }).catch((error)=>{
      console.log('Error getting the Location', error)
    })
  }

}
