function postProcess(output, input) {

  const filterEmptyParagraphs = (paragraph) =>  {
    return paragraph.length > 0;
  }

  const article = output.data.article;
  let paragraphs = article.paragraphs.filter(filterEmptyParagraphs);
  article.paragraphs = paragraphs

  output.data.article = article

  return output;
}
