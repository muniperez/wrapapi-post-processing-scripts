function postProcess(output, input) {

  const baseUrl = 'http://www.anp.gov.br'
  const removeBlankLines = (paragraphs) =>  {
    return paragraphs.filter( (p) => p.length > 0 );
  }

  const fixParagraphs = (paragraphs) =>  {
    paragraphs.splice(0, 2);
    return removeBlankLines(paragraphs);
  }

  let article = output.data.article;

  article.paragraphs = fixParagraphs(article.paragraphs);

  if(!article.image)  {
    delete article.image;
  }
  else {
    article.image = baseUrl + article.image
  }

  output.data.article = article;

  return output;
}
