function postProcess(output, input) {
  const article = output.data.article;
  article.preview = true;
  output.data.article = article;
  return output;
}
