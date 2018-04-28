function postProcess(output, input) {

  const pubdate = new Date().toString();
  const baseUrl = 'http://www.agu.gov.br';

  var processedArticles = output.data.articles.map(

      article => {

        article.pubdate = pubdate;
        article.date = pubdate;
        article.valid = true;
        article.link = baseUrl + article.link;
        article.image = "";
        article.summary = "";

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
