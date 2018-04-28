function postProcess(output, input) {

  const currentDate = new Date().toString();

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

  const parseDate = (dateTime) => {

    if(dateTime)  {

      let date, time, hours, minutes, day, month, year;

      [date, time] = dateTime.split(' | ');
      [day, month, year] = date.split(' de ');
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
    article.author = "Estadão Economia";
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
