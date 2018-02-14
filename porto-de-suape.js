function postProcess(output, input) {

  const parseDate = (date) => {
    if(date)  {
      [day, month, year] = date.split("/")
      let currentDate = new Date();
      let hoursAndMinutes = currentDate.getHours() + ':' + currentDate.getMinutes();
      let formattedDate = `${month}/${day}/${year}`;
      let formattedDateTime = `${formattedDate} ${hoursAndMinutes} (BRT)`;
      return new Date(formattedDateTime).toString();
    }

    return new Date().toString();
  }

  var processedArticles = output.data.articles.map(

      article => {

        let pubdate = article.rawdate ? parseDate(article.rawdate.date) : new Date().toString();

        article.pubdate = pubdate;
        article.date = new Date().toString();
        article.author = "Porto de Suape";
        article.valid = true;
        article.summary = article.description;
        article.image = "";
        delete article.rawdate;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
