import { LoginPage } from './login.po';
import { browser, logging } from 'protractor';
import { ChatPage } from './chat.po';

describe('Login Page', () => {
  let page: LoginPage;
  let chatPage: ChatPage

  const wrongCredentials = {
    username: 'super',
    pw: '1234'
  }

  beforeEach(() => {
    page = new LoginPage();
    chatPage = new ChatPage();
  });

  it('when user login with wrong credentials, stay on login page', () => {
    page.navigateTo();
    page.fillCredentials(wrongCredentials);
    browser.wait(waitForUrlChange("http://localhost:4200/login"), 4200).then(function(){
      browser.getCurrentUrl().then(function (currentUrl) {
          expect(currentUrl).toEqual("http://localhost:4200/login");
      });
    });
  });

  // it('when user login with right credentials, redirect to default (chat) page', () => {
  //   page.navigateTo();
  //   browser.sleep(2000);
  //   browser.ignoreSynchronization = true;
  //   page.fillCredentials();
  //   expect(chatPage.getTitleText()).toEqual('Chat')
  // });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

function waitForUrlChange(url) {
  return function () {
      return browser.getCurrentUrl().then(function (currentUrl) {
          console.log(currentUrl);
          return url === currentUrl;
      });
  }
}
