function postProcess(output, input) {

  const baseUrl = 'https://www.statoil.com.br';
  const currentDateObj = new Date();
  const currentDate = currentDateObj.toString();
  const hoursAndMinutes = currentDateObj.getHours() + ':' + currentDateObj.getMinutes();

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


  const parseDate = (date) => {

    if(date)  {
      let day, month,year;
      [day, month, year] = date.split(' de ');
      let formattedDate = `${parseMonth(month)}/${day}/${year}`;
      let formattedDateTime = `${formattedDate} ${hoursAndMinutes} GMT-0200`;
      return new Date(formattedDateTime).toString();
    }

    return currentDate
  }

  var processedArticles = output.data.articles.map(

      article => {

        if(!article.title || !article.endpoint) {
          return {valid: false}
        }

        let pubdate = parseDate(article.pubdate);
        let link = `${baseUrl}${article.endpoint}`;
        let description = article.description || "";
        let image = `${baseUrl}${article.image}` || "";

        article.pubdate = pubdate;
        article.date = currentDate;
        article.author = "Statoil Brasil";
        article.valid = true;
        article.summary = description;
        article.description = description;
        article.image = image;
        article.link = link;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
