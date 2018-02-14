function postProcess(output, input) {

    const parseMonth = (monthPT) => {

      switch(monthPT) {
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
        let day, monthText, year, trash1, trash2;

        [day, trash1, monthText, trash2, year] = date.split(" ");

        let month = parseMonth(monthText.toLowerCase());

        let currentDate = new Date();
        let hoursAndMinutes = currentDate.getHours() + ':' + currentDate.getMinutes();

        let formattedDate = `${month}/${day}/${year}`;
        let formattedDateTime = `${formattedDate} ${hoursAndMinutes}`;
        return new Date(formattedDateTime).toString();
      }

      return new Date().toString();
    }

  var processedArticles = output.data.articles.map(

      article => {

        if(!article.title || !article.link) {
          return {valid: false}
        }

        let pubdate = parseDate(article.pubdate);

        article.image = image[0];
        article.pubdate = pubdate;
        article.date = new Date().toString();
        article.author = "Embraport / DP World Santos";
        article.valid = true;
        article.summary = article.description;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
