function postProcess(output, input) {

  let article = output.data.article;

  if(!article.image)  {
    delete article.image;
  }

  output.data.article = article;

  return output;
}
