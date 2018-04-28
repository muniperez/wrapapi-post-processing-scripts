function postProcess(output, input) {
  const currentDate = new Date().toString()

  var processedArticles = output.data.articles.map(

      article => {

        article.pubdate = currentDate;
        article.date = currentDate;
        article.valid = true;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
