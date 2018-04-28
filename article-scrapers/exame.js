function postProcess(output, input) {
  const article = output.data.article;
  if(!article.image)  {
    delete article.image;
  }
  article.preview = true;
  article.paragraphs.splice(0,1);
  output.data.article = article
  return output;
}
