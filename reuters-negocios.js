function postProcess(output, input) {

  const parseMonth = (monthPT) => {

    switch(monthPT.toLowerCase()) {
      case 'janeiro':
        return 1;
      case 'fevereiro':
          return 2;
      case 'março':
          return 3;
      case 'abril':
          return 4;
      case 'maio':
          return 5;
      case 'junho':
        return 6;
      case 'julho':
          return 7;
      case 'agosto':
          return 8;
      case 'setembro':
          return 9;
      case 'outubro':
          return 10;
      case 'novembro':
        return 11;
      case 'dezembro':
        return 12;
      default:
        return 1 + new Date().getMonth();
    }
  }

  const parseDate = (fullDateTime) => {

    if(fullDateTime)  {
      // segunda-feira, 26 de fevereiro de 2018 19:52 BRT

      let dateTime, weekDay, date, time, hours, minutes, day, month, year, yearTime;
      [weekDay, dateTime] = fullDateTime.split(', ')

      [day, month, yearTime] = dateTime.split(' de ');
      [year, time] = yearTime.split(' ');

      let formattedDateTime = `${parseMonth(month)}/${day}/${year} ${time} GMT-0200`;

      return new Date(formattedDateTime).toString();
    }

    return new Date().toString();
  }

  var processedArticles = output.data.articles.map(

      article => {

        if(!article.link || !article.title) {
          return {valid: false}
        }

        let pubdate = parseDate(article.time);
        let link = `https://br.reuters.com${article.link}`

        article.pubdate = pubdate;
        article.date = new Date().toString();
        article.author = "Reuters";
        article.valid = true;
        article.summary = "";
        article.description = "";
        article.image = "";
        article.link = link;

        delete article.time;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
