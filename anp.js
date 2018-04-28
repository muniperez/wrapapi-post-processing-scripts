function postProcess(output, input) {

  const currentDate = new Date().toString();
  const rootUrl = 'http://www.anp.gov.br';

  const parseDate = (dateTime) => {

    if(dateTime)  {
      let date, time, day, month,year, hours, minutes;
      [date,time] = dateTime;

      [day, month, year] = date.split('/');
      [hours, minutes] = time.split('h');

      let formattedDate = `${month}/${day}/${year}`;
      let formattedTime = `${hours}:${minutes}`;
      let formattedDateTime = `${formattedDate} ${formattedTime} GMT-0200`;

      return new Date(formattedDateTime).toString();
    }

    return currentDate;
  }

  var processedArticles = output.data.articles.map(
      article => {

        let pubdate = parseDate(article.datetime);
        let link = `${rootUrl}${article.link}`;

        article.pubdate = pubdate;
        article.date = currentDate;
        article.valid = true;
        article.summary = "";
        article.image = "";
        article.link = link;

        delete article.datetime;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
