function postProcess(output, input) {

  let currentDate = new Date();
  let hoursAndMinutes = currentDate.getHours() + ':' + currentDate.getMinutes();

  const parseDate = (date) => {

    if(date)  {
      // 22/02/2018
      let day, month,year;
      [day, month, year] = date.split('/');
      let formattedDate = `${month}/${day}/${year}`;

      let formattedDateTime = `${formattedDate} ${hoursAndMinutes} GMT-0200`;

      return new Date(formattedDateTime).toString();
    }

    return new Date().toString();
  }

  var processedArticles = output.data.articles.map(
      article => {
        let rawPubdate, description;
        [rawPubdate, description] = article.pubdateAndDescription

        let pubdate = parseDate(rawPubdate);

        article.pubdate = pubdate;
        article.date = currentDate;
        article.author = "Shell Brasil";
        article.valid = true;
        article.summary = description;
        article.description = description;
        article.image = "";

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
