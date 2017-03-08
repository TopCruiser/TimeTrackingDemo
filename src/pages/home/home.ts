import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ModalController} from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { DetailPage } from '../detail/detail';
import { ReportPage } from '../report/report';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public modalCtrl : ModalController;
  public database:SQLite;
  public projects:Array<Object>;

  public items = [];

  public clicked = true;

  constructor(public navCtrl: NavController, public params:NavParams, private platform:Platform) {

    this.navCtrl = navCtrl;

    // this.items = [
    //   {title: 'MSC', description: ''},
    //   {title: 'MST', description: ''},
    //   {title: 'MSU', description: ''},
    //   {title: 'MSE', description: ''},
    //   {title: 'MSV', description: ''},
    //   {title: 'MSF', description: ''},
    //   {title: 'LittleOnes', description: ''},
    //   {title: 'Hope', description: ''},
    //   {title: 'Debbie Rossi', description: ''},
    //   {title: 'PGI', description: ''},
    //   {title: 'GoWed', description: ''},
    //   {title: 'CECW', description: ''}
    //   ];

    //database
    this.projects = [];
    this.platform.ready().then(() => {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        this.refresh();
        console.log("opened database..");
      }, (error) => {
        console.log("ERROR: ", error);
      });
    });
  }

  clickDeleteButton(button, index){
    this.database.executeSql("DELETE FROM project WHERE name = '" + this.projects[index]['name'] + "'", []).then(() => {
      console.log("Deleted 1 project");
      this.refresh();
    });
  }

  clickButton(button, index){
    button.color = "danger";
    this.clicked = false;
  }

  onClickManage(){
    if(this.projects.length == 0)
    {
      this.navCtrl.push(DetailPage);
    }
    else {
      var items = {
        key: this.projects[this.projects.length - 1]['key'],
        name: this.projects[this.projects.length - 1]['name'],
        info: this.projects[this.projects.length - 1]['info']
      };
      this.navCtrl.push(DetailPage, items);
    }
  }

  onClickReport(){
    this.navCtrl.push(ReportPage);
  }

  //database refresh method
  public refresh() {
    this.database.executeSql("SELECT * FROM project", []).then((data) => {
      this.projects = [];
      if(data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          this.projects.push({
            key: data.rows.item(i).key,
            name: data.rows.item(i).name,
            info: data.rows.item(i).info,
            startdate: data.rows.item(i).startdate,
            enddate: data.rows.item(i).enddate
          });
        }
      }
      console.log("all data fetched " + data.rows.length);
    }, (error) => {
      console.log("ERROR in fetching data" + JSON.stringify(error));
    });
  }
}
