import { AngulrCliPage } from './app.po';

describe('angulr-cli App', () => {
  let page: AngulrCliPage;

  beforeEach(() => {
    page = new AngulrCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
