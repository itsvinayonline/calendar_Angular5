import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DemoModule } from './app/app.module';
import { DemoComponent } from './app/app.component';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoModule
  ],
  bootstrap: [DemoComponent]
})
export class BootstrapModule {}

if (environment.production) {
enableProdMode();
}

platformBrowserDynamic().bootstrapModule(BootstrapModule);
// const bootstrap = () => {
//   platformBrowserDynamic().bootstrapModule(DemoModule);
// };
