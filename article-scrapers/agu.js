function postProcess(output, input) {

  const article = output.data.article;
  const image = output.data.image;
  const baseUrl = 'http://www.agu.gov.br';

  if(image)  {
    article.image = baseUrl + image
  }

  delete output.data.image

  article.paragraphs.splice(0,1)

  output.data.article = article

  return output;
}
