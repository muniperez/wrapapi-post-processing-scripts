function postProcess(output, input) {

  const parseDate = (date) => {

    if(date)  {

      let stripped = date.replace(/[^0-9\-]/g,'-');
      [day, month, year] = stripped.split('-');
      let formattedDate = `${month}/${day}/${year}`;

      let currentDate = new Date();
      let hoursAndMinutes = currentDate.getHours() + ':' + currentDate.getMinutes();

      let formattedDateTime = `${formattedDate} ${hoursAndMinutes} (BRT)`;

      return new Date(formattedDateTime).toString();
    }

    return new Date().toString();
  }

  var processedArticles = output.data.articles.map(
      article => {

        let pubdate = parseDate(article.pubdate);

        article.pubdate = pubdate;
        article.date = new Date().toString();
        article.author = "Portos do Paraná";
        article.valid = true;
        article.summary = "";
        article.description = "";
        article.image = "";

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
