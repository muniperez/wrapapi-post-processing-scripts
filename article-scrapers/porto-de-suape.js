function postProcess(output, input) {

  const baseUrl = 'http://www.suape.pe.gov.br';
  const parseImage = (image)  =>  {
    if(!image)  {
      return null;
    }

    return `${baseUrl}${image}`;
  }

  const weirdEmailTextIndex = (paragraphs) =>  {
    return paragraphs.findIndex((p) => p.search('protegido de spambots') >= 0)
  }

  const fixParagraphs = (paragraphs) =>  {
    // Test length
    if(paragraphs[0].length <= 30)  {
      paragraphs.splice(0,1);
    }

    let weirdIndex = weirdEmailTextIndex(paragraphs)
    if(weirdIndex >= 0) {
      paragraphs.splice(weirdIndex,1);
    }

    return paragraphs
  }

  let article = output.data.article;
  let image = parseImage(article.image);
  article.paragraphs = fixParagraphs(article.paragraphs);

  if(!image)  {
    delete article.image;
  }
  else {
    article.image = image;
  }

  output.data.article = article

  return output;
}
