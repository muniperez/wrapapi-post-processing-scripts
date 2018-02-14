function postProcess(output, input) {

  var processedArticles = output.data.articles.map(

      article => {

        if(!article.title || !article.link) {
          return {valid: false}
        }

        let link = `https://portogente.com.br${article.link}`
        let description = article.description ? article.description.text : "";
        article.image = "";
        article.date = new Date().toString();
        article.author = "Portogente";
        article.valid = true;
        article.summary = description;
        article.description = description;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
