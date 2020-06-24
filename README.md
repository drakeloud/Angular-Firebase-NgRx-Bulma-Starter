# Angular Firebase NgRx Bulma Starter

## The Stack
I'm a big fan of Angular, NgRx, and Bulma, so I decided to create a quick starter for my own projects! Enjoy this starter! Please make any PRs if you have anything that you would like to be added.

## Getting started
Add an `environment.ts` file in your `environments` directory in your project with the following object, making sure to add your appropriate configs from Firebase.

```
export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: '[API-KEY-HERE]',
        authDomain: '[AUTH-DOMAIN-HERE]',
        databaseURL: '[DATABASE-URL-HERE]',
        projectId: '[PROJECT-ID-HERE]',
        storageBucket: '[STORAGE-BUCKET-HERE]',
        messagingSenderId: '[MESSAGING-SENDER-ID-HERE]',
        appId: '[APP-ID-HERE]',
        measurementId: '[MEASUREMENT-ID-HERE]'
    }
};
```

## Angular Docs

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Firebase

Getting started with firebase: https://firebase.google.com/docs/storage/web/start

Firebase - https://firebase.google.com/

Docs - https://firebase.google.com/docs

## NgRx

NgRx is a great tool for state management following the redux patterns found in react.

NgRx - https://ngrx.io/

Docs - https://ngrx.io/docs

Use the chrome redux dev tools extension for an easier experience: http://extension.remotedev.io/

## Bulma

Bulma is one of my favorite design frameworks that is CSS only. 

Bulma - https://bulma.io/

Docs - https://bulma.io/documentation/
