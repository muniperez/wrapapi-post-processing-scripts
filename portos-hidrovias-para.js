function postProcess(output, input) {

  const baseUrl = 'http://www.cph.pa.gov.br/'
  const currentDate = new Date().toString();

  const removeMenuItems = (articles) =>  {
    return articles.filter( article => article.title.length > 20 );
  }

  const articles = removeMenuItems(output.data.articles);

  var processedArticles = articles.map(
      article => {
        article.pubdate = currentDate;
        article.date = currentDate;
        article.valid = true;
        article.summary = "";
        article.image = "";
        article.link = baseUrl + article.link;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
