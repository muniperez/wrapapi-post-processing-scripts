function postProcess(output, input) {

  const currentDate = new Date().toString();
  const baseUrl = "";

  const processArticle = (article) => {

    if(!article.link || !article.title) {
      return {valid: false}
    }

    article.pubdate = currentDate;
    article.date = currentDate;
    article.valid = true;
    article.summary = "";
    article.image = "";
    article.link = baseUrl + article.link;
    
    return article;
  }

  let processedArticles = output.data.articles.map(processArticle);

  if(output.data.highlights && output.data.highlights.length > 0) {
    const highlights = output.data.highlights.map(processArticle);
    processedArticles = [...processedArticles, ...highlights]
  }

  output.data.articles = processedArticles;

  return output;
}
