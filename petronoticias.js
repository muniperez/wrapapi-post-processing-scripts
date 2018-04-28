function postProcess(output, input) {

  let currentDate = new Date();

  const parseDate = (dateTimeStr) => {

    if(dateTimeStr)  {
      let date, time, day, month, year, hours, minutes, rest, monthYear, ampm, fullTime;

      // "pubdate": "28. mar, 2018 às 6:49 pm                            0 Comentários",
      let dateTime = dateTimeStr.split('     ')[0];
      [date, fullTime] = dateTime.split(' às ');
      [day, monthYear] = date.split('.');
      monthYear = monthYear.replace(' ', '');
      [ month, year ] = monthYear.split(',');
      // [time, ampm] = time.split(' ');
      // [hours, minutes] = fullTime.split(':');

      let hoursAndMinutes = `${fullTime} GMT-0200`;
      let correctedDate = `${parseMonth(month)}/${day}/${year}`;
      let dateTime = `${correctedDate} ${hoursAndMinutes}`;
      return new Date(dateTime).toString();
    }

    return currentDate.toString();
  }

  var processedArticles = output.data.articles.map(
      article => {

        let pubdate = parseDate(article.pubdate);

        article.pubdate = pubdate;
        article.date = currentDate.toString();
        article.valid = true;
        article.summary = article.summary;

        return article;
      });

  output.data.articles = processedArticles;

  return output;

  const parseMonth = (monthPT) => {

    switch(monthPT.toLowerCase()) {
      case 'jan':
        return 1;
      case 'fev':
          return 2;
      case 'mar':
          return 3;
      case 'abr':
          return 4;
      case 'mai':
          return 5;
      case 'jun':
        return 6;
      case 'jul':
          return 7;
      case 'ago':
          return 8;
      case 'set':
          return 9;
      case 'out':
          return 10;
      case 'nov':
        return 11;
      case 'dez':
        return 12;
      default:
        return 1 + new Date().getMonth();
    }
  }
}
