function postProcess(output, input) {

  const currentDate = new Date().toString();
  const rootUrl = 'https://www.dci.com.br';

  const parseDate = (dateTime) => {

    if(dateTime)  {
      let date, time, day, month,year;
      [date,time] = dateTime.split(' ');
      [day, month, year] = date.split('.');
      let formattedDate = `${month}/${day}/${year}`;
      let formattedDateTime = `${formattedDate} ${time} GMT-0200`;

      return new Date(formattedDateTime).toString();
    }

    return new Date().toString();
  }

  var processedArticles = output.data.articles.map(
      article => {

        let pubdate = parseDate(article.pubdate);
        let image = article.image ? `${rootUrl}${article.image}` : '';
        let link = `${rootUrl}${article.link}`;
        let description = article.description || "";

        article.pubdate = new Date(pubdate).toString(); //pubdate;
        article.date = currentDate;
        article.author = "DCI Economia";
        article.valid = true;
        article.description = description;
        article.summary = description;
        article.image = image;
        article.link = link;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
