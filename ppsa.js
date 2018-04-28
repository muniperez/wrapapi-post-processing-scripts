function postProcess(output, input) {

  const currentDate = new Date().toString();
  const baseUrl = 'http://www.presalpetroleo.gov.br';

  var processedArticles = output.data.articles.map(

      article => {

        article.pubdate = currentDate;
        article.date = currentDate;
        article.valid = true;
        article.link = baseUrl + article.link
        article.image = baseUrl + article.image

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
