function postProcess(output, input) {

  const parseDate = (dateTime) => {
    if(dateTime)  {

      let date, time, day, month, year;

      [date, time] = dateTime.split(' ');
      [day, month, year] = date.split('/');

      let formattedDate = `${month}/${day}/${year}`;
      let formattedDateTime = `${formattedDate} ${time} (BRT)`;
      return new Date(formattedDateTime).toString();
    }

    return new Date().toString();
  }

  var processedArticles = output.data.articles.map(

      article => {

        if(!article.link || !article.title) {
          return {valid: false}
        }

        let trash, dateTime;
        [trash, dateTime] = article.pubdate.split(' : ');

        let pubdate = parseDate(dateTime)

        let link = `http://www.agenciapetrobrasdenoticias.com.br${article.link}`
        article.pubdate = pubdate;
        article.date = new Date().toString();
        article.author = "Petrobras";
        article.valid = true;
        article.summary = article.description;
        article.image = "";

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
