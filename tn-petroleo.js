function postProcess(output, input) {

  const baseUrl = 'http://tnpetroleo.com.br';
  const currentDate = new Date().toString();

  const parseDate = (dateTime) => {

    // 27/02/2018 | 20h52
    // http://tnpetroleo.com.br/noticia/r-54-bilhoes-e-o-repasse-referente-a-participacao-especial-do-quarto-trimestre-de-2017/
    if(dateTime)  {
      let date, time, day, month,year, hours, minutes;

      [date, time] = dateTime.split(' | ');
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

        let pubdate = parseDate(article.pubdate);
        let link = `${baseUrl}${article.link}`

        article.pubdate = pubdate;
        article.date = currentDate;
        article.author = "TN Petróleo";
        article.valid = true;
        article.summary = "";
        article.description = "";
        article.image = "";
        article.link = link;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
