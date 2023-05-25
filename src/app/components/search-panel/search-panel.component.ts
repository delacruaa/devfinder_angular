import { Component } from '@angular/core';
import { GithubUser } from 'src/app/models/IGithubUser';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss'],
})
export class SearchPanelComponent {
  public userName: string = '';
  public notEmpty: string = '';
  constructor(private githubService: GithubService) {}
  fetchData() {
    if (this.userName) {
      this.notEmpty = '';
      this.githubService.fetchDataFromServer(this.userName);
    } else {
      this.notEmpty = 'Not Be Empty';
    }
    this.userName = '';
  }
  clearError(): void {
    this.notEmpty = '';
  }
}
