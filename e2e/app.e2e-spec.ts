import { ProvabohPage } from './app.po';

describe('provaboh App', () => {
  let page: ProvabohPage;

  beforeEach(() => {
    page = new ProvabohPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
