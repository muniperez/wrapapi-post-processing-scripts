function postProcess(output, input) {

  const parseMonth = (monthPT) => {
    switch(monthPT) {
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

  const parseDate = (date) => {

    if(date)  {
      let d = date.split(" ");
      let month = parseMonth(d[1].toLowerCase());
      let currentDate = new Date();
      let hoursAndMinutes = currentDate.getHours() + ':' + currentDate.getMinutes();
      let correctedDate = `${month}/${d[0]}/${d[2]}`;
      let dateTime = `${correctedDate} ${hoursAndMinutes}`;
      return new Date(dateTime).toString();
    }

    return new Date().toString();
  }

  var processedArticles = output.data.articles.map(
      article => {

        if(!article.title || !article.link) {
            return {valid: false}
        }

        let pubdate = parseDate(article.pubdate);
        let link = article.link;
        let image = article.image;

        article.link = `http://diariodonordeste.verdesmares.com.br${link}`;
        article.image = `http://diariodonordeste.verdesmares.com.br${image}`;
        article.pubdate = pubdate;
        article.date = new Date().toString();
        article.author = "Diário do Nordeste (Pecém)";
        article.valid = true;
        article.summary = article.description;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
