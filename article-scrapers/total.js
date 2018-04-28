function postProcess(output, input) {
  const baseUrl = 'http://br.total.com'
  const parseImage = (image)  =>  {
    if(!image)  {
      return null;
    }

    return `${baseUrl}${image}`;
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
