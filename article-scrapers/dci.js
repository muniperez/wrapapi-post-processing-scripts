function postProcess(output, input) {
  const baseUrl = 'https://www.dci.com.br'
  const parseImage = (image)  =>  {
    if(!image)  {
      return null;
    }

    const { imageUrl, parameters } = image.split('?')

    return `${baseUrl}${imageUrl}`;
  }

  const article = output.data.article;
  const image = parseImage(article.image);

  if(!image)  {
    delete article.image;
  }
  else {
    article.image = image;
  }

  output.data.article = article

  return output;
}
