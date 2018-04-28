function postProcess(output, input) {

  const baseUrl = 'http://transportes.gov.br';
  const currentDate = new Date().toString();

  const parseDate = (dateTime) => {

    if(dateTime)  {
      let date, time, day, month,year, hours, minutes;

      [date, time] = dateTime.split('|');
      [day, month, year] = date.split('/');
      [hours, minutes] = time.split('h');

      let formattedDate = `${month}/${day}/${year}`;
      let formattedDateTime = `${formattedDate} ${hours}:${minutes} GMT-0200`;

      return new Date(formattedDateTime).toString();
    }

    return currentDate
  }

  var processedArticles = output.data.articles.map(
      article => {

        let author,status,date,time;
        [author,status,date,time] = article.info.data;

        let pubdate = parseDate(`${date}|${time}`);
        let link = `${baseUrl}${article.link}`

        article.pubdate = pubdate;
        article.date = currentDate;
        article.author = "Ministério dos Transportes";
        article.valid = true;
        article.summary = article.description;
        article.image = "";
        article.link = link;

        delete article.info

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
