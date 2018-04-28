function postProcess(output, input) {

  const article = output.data.article;
  const image = output.data.image;
  const baseUrl = 'http://www.presalpetroleo.gov.br';

  if(image)  {
    article.image = baseUrl + image
  }

  delete output.data.image

  output.data.article = article

  return output;
}
