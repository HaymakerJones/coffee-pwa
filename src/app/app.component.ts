import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private snackbar: MatSnackBar) { }

  ngOnInit() {
    if (!navigator['standalone']) {
      //this means we are on ios and in the browser
      this.snackbar.open("You can add this PWA to your homescreen", null, { duration: 3000 });
    }

    if (navigator['standalone'] == undefined) {
      //Its not ios
      if (window.matchMedia("(display-mode: browser)").matches) {
        //We are in the browser
        window.addEventListener("beforeinstallprompt", event => {
          event.preventDefault();
          const sb = this.snackbar.open("Do you want to install this app?", "Install", { duration: 5000 });
          sb.onAction().subscribe(
            () => {
              (event as any).prompt();
              (event as any).userChoice.then(result => {
                if (result.outcome == "dismissed") {
                  //TODO: Track no installation
                }
                else {
                  //TODO: it was installed
                }
              })
            }
          );
        })
      }
    }

  }
}
