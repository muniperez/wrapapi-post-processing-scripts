function postProcess(output, input) {

  const currentDate = new Date();

  const parseDate = (date) => {

    if(date)  {
      let day, month,year;

      [day, month, year] = date.split('/');

      let formattedDate = `${month}/${day}/${year}`;
      let formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
      let formattedDateTime = `${formattedDate} ${formattedTime} GMT-0200`;

      return new Date(formattedDateTime).toString();
    }

    return currentDate.toString();
  }

  var processedArticles = output.data.articles.map(

      article => {

        let pubdate = parseDate(article.pubdate);

        article.pubdate = pubdate;
        article.date = currentDate.toString();
        article.valid = true;
        article.summary = article.summary[1] || "";
        article.image = "";

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
