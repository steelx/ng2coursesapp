import { Ng2project01Page } from './app.po';

describe('ng2project01 App', function() {
  let page: Ng2project01Page;

  beforeEach(() => {
    page = new Ng2project01Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
