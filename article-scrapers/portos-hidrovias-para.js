function postProcess(output, input) {
  let article = output.data.article;
  let image = output.data.image;
  if(image) {
    article.image = image;
  }
  delete output.data.image
  output.data.article = article;
  return output;
}
