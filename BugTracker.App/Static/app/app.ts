﻿import { Component, provide } from "angular2/core";
import { HTTP_PROVIDERS, RequestOptions  } from 'angular2/http';
import { bootstrap } from "angular2/platform/browser";
import { DefaultRequestOptions } from "./services/service.base";
import { AppStore, appStoreFactory } from "./store/appStore";
import { AppConfiguration } from './config/config.base';

import { CurrentUserState } from "./models/models";
import { APP_WEBSERVICES } from "./services/services"

import { UserLogin } from "./features/currentUser/view/userLoginComponent";
import { UserAvatar } from "./features/currentUser/view/userAvatarComponent";
import { IssuesContainer } from "./features/issues/view/issuesContainerComponent";

@Component({
    selector: "bug-tracker",
    directives: [UserLogin, UserAvatar, IssuesContainer],
    template: `
        <div>
            <user-login *ngIf="currentUser.user == null"></user-login>
            <user-avatar *ngIf="currentUser.user != null"></user-avatar>
            <issues-container *ngIf="currentUser.user != null"></issues-container>
        </div>
    `
})

export class App {
    public currentUser: CurrentUserState;
    constructor(private appStore: AppStore) {
        appStore.subscribe(this.appStoreUpdate.bind(this));
        this.appStoreUpdate();
    }
    private appStoreUpdate() {
        this.currentUser = this.appStore.getState().currentUser;
    }
}

var appConfiguration = new AppConfiguration((<any>window).appConfiguration);

bootstrap(App, [
    HTTP_PROVIDERS,
    APP_WEBSERVICES,
    provide(AppConfiguration, { useValue: appConfiguration }),
    provide(RequestOptions, { useClass: DefaultRequestOptions }),
    provide(AppStore, { useFactory: appStoreFactory })
]);