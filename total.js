function postProcess(output, input) {

  const baseUrl = 'http://br.total.com';
  const currentDateObj = new Date();
  const currentDate = currentDateObj.toString();
  const hoursAndMinutes = currentDateObj.getHours() + ':' + currentDateObj.getMinutes();

  const parseDate = (date) => {

    if(date)  {
      let day, month, year, monthYear;
      [day, monthYear] = date.split('/');
      month = monthYear.slice(0,2);
      year = monthYear.slice(2,6);
      
      let formattedDate = `${month}/${day}/${year}`;
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

        article.pubdate = pubdate;
        article.date = currentDate;
        article.author = "Total do Brasil";
        article.valid = true;
        article.summary = description;
        article.description = description;
        article.image = "";
        article.link = link;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
