function postProcess(output, input) {
  // "output" has the raw pre-processing output
  // "input" has the specified inputs, including defaults
  const parseDate = (elapsed) => {
    let timeArr = elapsed.split(" ");
    let num = timeArr[1];
    let type = timeArr[2];
    let factor = 0;

    switch(type)  {
      case "minuto":
        factor = 60000;
      break;

      case "minutos":
        factor = 60000;
      break;

      case 'hora':
        factor = 3600000;
      break;

      case "horas":
        factor = 3600000;
      break;

      case "dia":
        factor = 86400000;
      break;

      case "dias":
        factor = 86400000;
      break;

      case "semana":
        factor = 7 * 86400000;
      break;

      default:
        factor = 0;
    }

    if(factor > 0 && parseInt(num, 10))  {

      let elapsedMiliseconds = num * factor;
      let publishedDateStamp = Date.now() - elapsedMiliseconds;

      return new Date(publishedDateStamp).toUTCString();
    }
    else {
      return new Date().toUTCString();
    }
  }

  var processedArticles = output.data.articles.map(
      article => {
        var link = article.link;

        if(link && link.length > 0 && article.title) {

          let description = article.description ? article.description : "";
          let image = article.image || '';

          let date = parseDate(article.time);

          article.pubdate = date;
          article.date = new Date().toUTCString();
          article.author = 'G1 Economia';
          article.image = image;
          article.valid = true;
          article.description = description;
          article.summary = description;

          return article
        }
        else {
          return {valid: false}
        }
      }
    )

    output.data.articles = processedArticles

  return output;
}
