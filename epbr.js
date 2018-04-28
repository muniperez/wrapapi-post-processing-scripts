function postProcess(output, input) {

  var processedArticles = output.data.articles.map(

      article => {

        if(!article.link || !article.title) {
          return {valid: false}
        }

        let pubdate = new Date().toString();

        article.pubdate = pubdate;
        article.date = pubdate;
        article.valid = true;
        article.summary = "";
        article.image = article.image.split('?')[0];

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
