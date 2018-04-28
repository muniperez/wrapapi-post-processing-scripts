function postProcess(output, input) {

  const pubdate = new Date().toString();

  var processedArticles = output.data.articles.map(

      article => {

        article.pubdate = pubdate;
        article.date = pubdate;
        article.valid = true;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
