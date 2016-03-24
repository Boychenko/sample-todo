import chai from 'chai';//eslint-disable-line no-unused-vars
import cheerio from 'cheerio';
import AboutPage from './AboutPage';
import React from 'react';
import ReactDOMServer from 'react/lib/ReactDOMServer';

chai.should();

describe('About page', () => {
  it('Should have header \'About us\'', () => {
    //arrange
    const sut = React.createElement(AboutPage);

    //act
    const html = ReactDOMServer.renderToStaticMarkup(sut);
    const $ = cheerio.load(html);
    const header = $('h2').html();

    //assert
    header.should.equal('About us');
  });
});

