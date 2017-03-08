import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatePicker } from 'ionic2-date-picker/ionic2-date-picker';

/*
  Generated class for the Report page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
  providers: [ DatePicker ]
})

export class ReportPage {

  constructor(public navCtrl: NavController, public datePicker: DatePicker) {

    this.datePicker.onDateSelected.subscribe(
      (date) => {
        console.log(date);
      });
  }

  showCalendar(){
    this.datePicker.showCalendar();
  }
}
