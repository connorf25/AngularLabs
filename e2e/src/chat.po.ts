import { browser, by, element } from 'protractor';

export class ChatPage {
  navigateTo() {
    return browser.get('/chat') as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }
}
