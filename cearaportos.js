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
      draft => {

        const { title, link, all } = draft.row;
        const article = {}

        if(!title || !link) {
          return { valid: false }
        }

        if(all && all[0] === '#') {
          return { valid: false }
        }

        let pubdate = parseDate(all[2]);

        article.title = title;
        article.link = `http://www.cearaportos.ce.gov.br${link}`;
        article.pubdate = pubdate;
        article.date = new Date().toString();
        article.author = "Cearáportos";
        article.valid = true;
        article.summary = "";
        article.description = "";
        article.image = "";

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
