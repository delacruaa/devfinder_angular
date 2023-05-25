import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isDark = true;
  public textColor = 'LIGHT';

  ngOnInit() {
    this.changeTheme();
  }

  changeTheme() {
    this.isDark = !this.isDark;
    this.textColor = !this.isDark ? 'LIGHT' : 'DARK';
    document.body.setAttribute('data-theme', this.isDark ? 'dark' : 'light');
  }
}
