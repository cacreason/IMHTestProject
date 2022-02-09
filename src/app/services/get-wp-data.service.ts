/**
 * Chris Creason - IMH Test Project
 * 2/8/22
 * Service to get data from Wordpress API
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { WpPost } from '../interfaces/wp-post';

@Injectable({
  providedIn: 'root'
})
export class GetWpDataService {
  // Wordpress API Endpoint
  private wpPostsUrl = "https://wordpress.org/news/wp-json/wp/v2/posts";

  // Configure Headers to define content as JSON
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  /**
   * Method to perform a GET request to retrieve wordpress post data from Wordpress API endpoint.  
   * Iterates through the first 20 elements in the returned JSON object and maps data to WpPost data class. 
   * Returns array of WpPost objects.
   * @returns WpPost[]
   */
  getWpData(): Observable<WpPost[]>{
    let wpPosts: WpPost[] = [];
    return this.http.get<WpPost[]>(this.wpPostsUrl)
    .pipe(
      map((val: any) => {
        const data = val;
        let i = 0;
        for(let item of data){
          if(i<20){
            wpPosts.push({
              id: item.id,
              slug: item.slug,
              status: item.status,
              title: item.title.rendered,
              dateCreated: item.date,
              renderedContent: item.content.rendered,
              link: item.link
            })
          }
          else{
            break;
          }
          i++;
        }
        console.log(wpPosts);
        return wpPosts;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Method to handle an error when attempting to perform a GET request to retrieve Wordpress Posts from API.
   * @param error 
   * @returns Observable
   */
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
