function postProcess(output, input) {

  const article = output.data.article;

  if(!article.image)  {
    delete article.image;
  }

  output.data.article = article

  return output;
}
