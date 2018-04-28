function postProcess(output, input) {
  let firstParagraph, secondParagraph;
  const article = output.data.article;
  const image = output.data.image;

  [ firstParagraph, secondParagraph ] = article

  if(!firstParagraph) {
    article = secondParagraph
  }

  if(image)  {
    article.image = image
  }

  output.data.article = article

  return output;
}
