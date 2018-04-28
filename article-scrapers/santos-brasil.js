function postProcess(output, input) {

  const putParagraphsInArray = (body) =>  {
    return body.split('  ');
  }

  let article = output.data.article;

  article.paragraphs = putParagraphsInArray(article.body);
  delete article.body;

  output.data.article = article;

  return output;
}
