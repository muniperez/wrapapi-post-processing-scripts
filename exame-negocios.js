function postProcess(output, input) {

  const currentDate = new Date().toString();

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

  const parseDate = (dateTime) => {

    if(dateTime)  {
      // 26 fev 2018, 18h21
      let date, time, hours, minutes, day, month, year;

      [date, time] = dateTime.split(', ');
      [day, month, year] = date.split(' ');
      [hours, minutes] = time.split('h');

      let formattedDate = `${parseMonth(month)}/${day}/${year}`;
      let formattedDateTime = `${formattedDate} ${hours}:${minutes} GMT-0200`;

      return new Date(formattedDateTime).toString();
    }

    return new Date().toString();
  }

  const processArticle = (article) => {

    if(!article.link || !article.title) {
      return {valid: false}
    }

    let pubdate;

    if(article.pubdate) {
      pubdate = parseDate(article.pubdate);
    }
    else {
      pubdate = currentDate;
    }

    let description = article.description || "";
    let image = article.image || "";

    article.pubdate = pubdate;
    article.date = currentDate;
    article.author = "Exame Negócios";
    article.valid = true;
    article.summary = description;
    article.description = description;
    article.image = image;

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
