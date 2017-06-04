import { WikiGamePage } from './app.po';

describe('wiki-game App', () => {
  let page: WikiGamePage;

  beforeEach(() => {
    page = new WikiGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
