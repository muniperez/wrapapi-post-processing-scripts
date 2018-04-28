function postProcess(output, input) {

  const fixParagraphs = (paragraphs) =>  {
    paragraphs.splice(0, 1);
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
