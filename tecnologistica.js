function postProcess(output, input) {

  const currentDate = new Date().toString();
  const baseUrl = 'http://www.tecnologistica.com.br';

  var processedArticles = output.data.articles.map(

      article => {

        article.pubdate = currentDate;
        article.date = currentDate;
        article.valid = true;
        article.image = "";
        article.link = baseUrl + article.link

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
