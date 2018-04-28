function postProcess(output, input) {

  const adsByGoogleIndex = (paragraphs) =>  {
    return paragraphs.findIndex((p) => p.search('adsbygoogle') >= 0);
  }

  const removeBlankLines = (paragraphs) =>  {
    return paragraphs.filter( (p) => p.length > 0 );
  }

  const fixParagraphs = (paragraphs) =>  {
    let adsIndex = adsByGoogleIndex(paragraphs);
    if(adsIndex >= 0) {
      paragraphs.splice(adsIndex, 1);
    }
    return removeBlankLines(paragraphs);
  }

  let article = output.data.article;

  article.paragraphs = fixParagraphs(article.paragraphs);

  if(!article.image)  {
    delete article.image;
  }

  article.preview = true;
  output.data.article = article;

  return output;
}
