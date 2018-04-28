function postProcess(output, input) {

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
        let image = article.image ? `https:${article.image}` || ''

        article.pubdate = pubdate;
        article.date = new Date().toString();
        article.author = "Dinheiro Rural";
        article.valid = true;
        article.summary = article.description;
        article.image = image;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
