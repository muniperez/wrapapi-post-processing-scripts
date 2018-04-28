function postProcess(output, input) {

  const pubdate = new Date().toString();
  const articles = output.data.articles.slice(1,6);

  var processedArticles = articles.map(

      article => {

        if(!article.link || !article.title) {
          return {valid: false}
        }

        article.pubdate = pubdate;
        article.date = pubdate;
        article.valid = true;
        article.summary = article.summary || "";
        article.image = article.image || "";

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
