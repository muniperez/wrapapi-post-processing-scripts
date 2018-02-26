function postProcess(output, input) {

  const parseTime = (fullTime) => {

    if(fullTime)  {

      let time, timezone, hours, minutes;
      [time, timezone] = fullTime.split(' ');
      [hours, minutes] = time.split(':');

      let UTCHours = parseInt(hours,10) + 3

      //(year, month[, day[, hour[, minute[, second[, millisecond]]]]])
      let currentDate = new Date();

      currentDate.setUTCHours(UTCHours)
      currentDate.setUTCMinutes(minutes)

      //let dateStampUTC = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay(), hoursUTC, minutes);

      // let formattedDate = `${}/${}/${}`;
      // let formattedDateTime = `${formattedDate} ${}:${minutes}`;

      return currentDate.toUTCString();
    }

    return new Date().toString();
  }

  var processedArticles = output.data.articles.map(

      article => {

        if(!article.link || !article.title) {
          return {valid: false}
        }

        let pubdate = parseTime(article.time);
        let link = `https://br.reuters.com${article.link}`

        article.pubdate = pubdate;
        article.date = new Date().toString();
        article.author = "Reuters";
        article.valid = true;
        article.summary = "";
        article.description = "";
        article.image = "";
        article.link = link;

        //delete article.time;

        return article;
      });

  output.data.articles = processedArticles;

  return output;
}
