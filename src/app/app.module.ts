import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { ReportPage } from '../pages/report/report';
import { DatePicker } from 'ionic2-date-picker/ionic2-date-picker';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    ReportPage,
    DatePicker
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    ReportPage,
    DatePicker
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
