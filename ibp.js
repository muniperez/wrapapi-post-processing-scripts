function postProcess(output, input) {

  const pubdate = new Date().toString();

  const processArticle = (article)  =>  {
    article.pubdate = pubdate;
    article.date = pubdate;
    article.valid = true;
    article.summary = article.summary || "";
    article.image = article.image || "";

    return article
  }

  var processedArticles = output.data.articles.map(processArticle);
  var highlights = output.data.highlights.map(processArticle);

  output.data.articles = [...processedArticles, ...highlights];

  return output;
}
