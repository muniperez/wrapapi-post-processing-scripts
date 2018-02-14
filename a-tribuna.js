function postProcess(output, input) {

  const parseDate = (date) => {

    if(date)  {

      let d = date.split("/");
      let currentDate = new Date();
      let hoursAndMinutes = currentDate.getHours() + ':' + currentDate.getMinutes();
      let correctedDate = `${d[1]}/${d[0]}/${d[2]}`;
      let dateTime = `${correctedDate} ${hoursAndMinutes}`;
      return new Date(dateTime).toString();
    }

    return new Date().toString();
  }

  var processedArticles = output.data.articles.map(
      article => {

        let pubdate = parseDate(article.pubdate);

        article.pubdate = pubdate;
        article.date = new Date().toString();
        article.author = "A Tribuna de Santos - Porto & Mar";
        article.valid = true;
        article.summary = article.description;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
