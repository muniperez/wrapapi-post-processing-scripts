function postProcess(output, input) {
  let article = output.data.article;
  article.preview = true;
  output.data.article = article;
  return output;
}
