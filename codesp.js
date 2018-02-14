function postProcess(output, input) {

  var processedArticles = output.data.articles.map(

      article => {

        if(!article.link || !article.title) {
          return {valid: false}
        }

        let pubdate = new Date().toString();
        let image = `http://www.portodesantos.com.br/${article.image}`
        let link = `http://www.portodesantos.com.br/${article.link}`

        article.pubdate = pubdate;
        article.date = pubdate;
        article.author = "Porto de Santos";
        article.valid = true;
        article.summary = "";
        article.description = "";
        article.image = image;
        article.link = link;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
