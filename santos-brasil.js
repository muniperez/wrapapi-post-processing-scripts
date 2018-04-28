function postProcess(output, input) {

  const pubdate = new Date().toString();
  const baseUrl = 'https://www.santosbrasil.com.br';
  const articles = [];

  const processArticles = (articleBlock) =>  {
    articleBlock.articles.map(

        article => {

          article.pubdate = pubdate;
          article.date = pubdate;
          article.valid = true;
          article.link = baseUrl + article.link;
          article.image = "";
          article.summary = "";

          articles.push(article);

          return true;
        });
  }

  output.data.articleBlocks.map(processArticles);
  delete output.data.articleBlocks;

  output.data.articles = articles;

  return output;
}
