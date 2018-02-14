function postProcess(output, input) {

  const parseDate = (date) => {

    if(date)  {
      let dateTime = date.split(" ");
      let rawDate = dateTime[0];
      let rawTime = dateTime[2].split('h');
      let time = rawTime.join(':');
      let d = rawDate.split("/");
      let correctedDate = `${d[1]}/${d[0]}/${d[2]}`;
      let correctedDateTime = `${correctedDate} ${time} (BRT)`;
      return new Date(correctedDateTime).toString();
    }

    return new Date().toString();
  }

  var processedArticles = output.data.articles.map(
      article => {

        let pubdate = parseDate(article.pubdate);

        article.pubdate = pubdate;
        article.date = new Date().toString();
        article.author = "Valor Econômico";
        article.valid = true;
        article.summary = article.description;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
