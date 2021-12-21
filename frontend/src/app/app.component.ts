import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    private http: HttpClient
    ){
      // The location of our web API where the data of interest is served
      let webApiUrl = "http://localhost:8080/helloworld";

      // Retrieve the data from the Web API
      this.http.get(webApiUrl, {responseType: 'text'})
      .toPromise() // Do not block the current thread waiting for the data
        .then(

          // Once is returned, updated the message
          // property to the value of the string returned
          data => this.message = data
        )
    }

  title = 'webapp';
  message = "Loading";
}
