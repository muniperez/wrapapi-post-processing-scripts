function postProcess(output, input) {

  const article = output.data.article;

  // First paragraph
  let firstParagraph = article.paragraphs[0]

  if(firstParagraph.length < 30)  {
    article.paragraphs.splice(0,1)
  }



  if(!article.image)  {
    delete article.image;
  }

  output.data.article = article

  return output;
}
