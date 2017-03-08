import { Component } from '@angular/core';
import { NavController, Platform, NavParams} from 'ionic-angular'
import { SQLite } from 'ionic-native';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})

export class DetailPage {

  public database : SQLite;

  checkState1 = true;
  checkState2 = false;

  key:any;
  name:any;
  info:any;

  constructor(public navCtrl : NavController, private params : NavParams, private platform : Platform){
    this.platform.ready().then(() => {
      console.log("database opening...")
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
      }, (error) => {
        console.log("DATABASE ERROR in detail page ", error);
      });
    });

    //get last project info...
    this.key = params.get('key');
    this.name = params.get('name');
    this.info = params.get('info');
    console.log("passed parameter is --- " + this.info);
  }

  onDone(){
    this.navCtrl.pop();
  }

  onCheck(){
    this.checkState1 = !this.checkState1;
    this.checkState2 = !this.checkState2;
  }

  onNew(){
    console.log("Inserted rows----(" + this.key + ", " + this.name + ",  " + this.info + ")");

    this.database.executeSql("INSERT INTO project (key, name, state, info, startdate, enddate) VALUES (" + this.key + "," + "'" + this.name + "','" + this.checkState1 + "','" + this.info + "', '2016/02/14', 'undefine')", []).then((data) => {
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) => {
      console.log("SQL EXECUTION ERROR in DetailPage " + JSON.stringify(error.err));
    });

    this.navCtrl.pop();
    this.navCtrl.setRoot(HomePage);
  }

}
