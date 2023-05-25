import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GithubUser } from '../models/IGithubUser';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  tap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private httpClient: HttpClient) {}
  public userData = new BehaviorSubject<GithubUser>({} as GithubUser);
  private loading = new BehaviorSubject<boolean>(false);

  private errorMessage = new BehaviorSubject<string>('');
  fetchDataFromServer(userName: string) {
    this.loading.next(true);
    return this.httpClient
      .get<GithubUser>(`https://api.github.com/users/${userName}`)
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this.loading.next(false);
        })
      )
      .subscribe(
        (data) => {
          this.userData.next({
            ...data,
            created_at: new Date(data.created_at)
              .toLocaleDateString()
              .toString(),
          });
        },
        (error) => {
          this.errorMessage.next(error);
        }
      );
  }
  getSearchData() {
    return this.userData.asObservable();
  }
  getLoadingStatus() {
    return this.loading.asObservable();
  }

  getErrorMessage() {
    return this.errorMessage.asObservable();
  }
  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status == 404) {
        errorMessage = `Not Found user... try again`;
      } else {
        errorMessage = `Somethig went wrong... try later`;
      }
    }
    return throwError(errorMessage);
  }
}
