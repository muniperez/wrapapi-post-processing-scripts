function postProcess(output, input) {

  const parseDate = (date) => {

    if(date)  {

      return new Date(date).toString();
    }

    return new Date().toString();
  }

  var processedArticles = output.data.articles.map(
      article => {

        if(article.title && article.link) {

          //let pubdate = parseDate(article.pubdate);

          article.pubdate = new Date().toString();
          article.date = new Date().toString();
          article.author = "Informativo dos Portos";
          article.valid = true;
          article.summary = article.description;

          return article;
        }

        return { valid: false }

      });

  output.data.articles = processedArticles;

  return output;
}
