import { MenuType, RouteInfo } from './navbar.metadata';

export const ROUTES: RouteInfo[] = [
  { path: '', title: 'QiTest', menuType: MenuType.BRAND },
  { path: 'home', title: 'Home', menuType: MenuType.LEFT },
  { path: 'quiz', title: 'Quiz', menuType: MenuType.RIGHT },
  { path: 'register', title: 'Test', menuType: MenuType.RIGHT },
  { path: 'login', title: 'Login', menuType: MenuType.RIGHT }
];