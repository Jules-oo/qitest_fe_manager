import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarService } from '../_services/navbar.service';
import { MenuType } from './navbar.metadata';
import { ROUTES } from './navbar-routes.config';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-navbar',
  providers: [NavbarService, HttpClient],
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  public menuItems!: any[];
  public brandMenu: any;
  isCollapsed = true;
  isShown = true;

  constructor(public nav: NavbarService) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((item: { menuType: MenuType; }) => item.menuType !== MenuType.BRAND);
    this.brandMenu = ROUTES.filter((item: { menuType: MenuType; }) => item.menuType === MenuType.BRAND)[0];
  }

  public get menuIcon(): string {
    return this.isCollapsed ? '☰' : '✖';
  }

  public getMenuItemClasses(menuItem: any) {
    return {
      'pull-xs-right': this.isCollapsed && menuItem.menuType === MenuType.RIGHT
    };
  }
}
