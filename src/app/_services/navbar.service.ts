import { Injectable } from "@angular/core";

@Injectable()
export class NavbarService {
    public visible: Boolean;

    constructor() {
        this.visible = false;
    }

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }
}