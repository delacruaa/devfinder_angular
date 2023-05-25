import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GithubUser } from 'src/app/models/IGithubUser';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  public user: GithubUser = {} as GithubUser;
  public loading = false;
  public errorMessage = '';
  constructor(
    private githubService: GithubService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.githubService.getSearchData().subscribe((data) => {
      this.user = data;
    });
    this.githubService.getLoadingStatus().subscribe((loading) => {
      this.loading = loading;
    });
    this.githubService.getErrorMessage().subscribe((error) => {
      console.log(error);
      this.errorMessage = error;
    });
  }
}
