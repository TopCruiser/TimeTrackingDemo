import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite} from 'ionic-native';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      let db = new SQLite();
      db.openDatabase({
        name: "data.db",
        location: "default"
      }).then(() => {
        console.log(`before executing sql`);
        db.executeSql("CREATE TABLE IF NOT EXISTS project (id INTEGER PRIMARY KEY AUTOINCREMENT, key INTEGER, name TEXT, state TEXT, info INTEGER, startdate TEXT, enddate TEXT)", {}).then((data) => {
          console.log("TABLE CREATED: ", data);
        }, (error) => {
          console.error("Unable to execute sql", error);
        })
      }, (error) => {
        console.error("Unable to open database", error);
      });

    });
  }
}
