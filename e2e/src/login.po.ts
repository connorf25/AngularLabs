import { browser, by, element } from 'protractor';

export class LoginPage {
  private credentials = {
    username: 'super',
    pw: '123'
  }

  navigateTo() {
    return browser.get('/login') as Promise<any>;
  }

  fillCredentials(credentials: any = this.credentials) {
    element(by.name('username')).sendKeys(this.credentials.username);
    element(by.name('password')).sendKeys(this.credentials.pw);
    element(by.name('submit')).click();
  }

  browserTitle = browser.getTitle().then(function(webpagetitle){
    if (webpagetitle === 'Login'){
      return 'Login';
    }else{
      return 'Wrong'
    } 
  });

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getErrorMessage() {
    return element(by.css('.alert-danger')).getText();
  }
}
