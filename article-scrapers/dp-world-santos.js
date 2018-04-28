function postProcess(output, input) {

  const removeBlankLines = (paragraphs) =>  {
    return paragraphs.filter( (p) => p.length > 0 );
  }

  const fixParagraphs = (paragraphs) =>  {
    paragraphs.splice(0, 1);
    return removeBlankLines(paragraphs);
  }

  let article = output.data.article;

  article.paragraphs = fixParagraphs(article.paragraphs);

  if(!article.image)  {
    delete article.image;
  }

  output.data.article = article;

  return output;
}
