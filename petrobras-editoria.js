function postProcess(output, input) {

  const parseDate = (dateTime) => {
    if(dateTime)  {

      let date, time, day, month, year;

      [date, time] = dateTime.split(' ');
      [day, month, year] = date.split('/');

      let formattedDate = `${month}/${day}/${year}`;
      let formattedDateTime = `${formattedDate} ${time} (BRT)`;
      return new Date(formattedDateTime).toString();
    }

    return new Date().toString();
  }

  const processArticle = (article) => {

    if(!article.link || !article.title) {
      return {valid: false}
    }

    let trash, dateTime;
    [trash, dateTime] = article.pubdate.split(' : ');

    let pubdate = parseDate(dateTime)
    let description = article.description || "";
    let link = `http://www.agenciapetrobrasdenoticias.com.br${article.link}`
    article.pubdate = pubdate;
    article.date = new Date().toString();
    article.author = "Petrobras";
    article.valid = true;
    article.summary = description;
    article.description = description;
    article.image = "";
    article.link = link;

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
