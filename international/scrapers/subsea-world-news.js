
"image": "https://subseaworldnews.com/wp-content/uploads/2018/04/fincantieri-delivers-new-oceanographic-vessel-to-imr-320x200.jpg 320w, https://subseaworldnews.com/wp-content/uploads/2018/04/fincantieri-delivers-new-oceanographic-vessel-to-imr-480x300.jpg 480w, https://subseaworldnews.com/wp-content/uploads/2018/04/fincantieri-delivers-new-oceanographic-vessel-to-imr-375x235.jpg 375w, https://subseaworldnews.com/wp-content/uploads/2018/04/fincantieri-delivers-new-oceanographic-vessel-to-imr-210x130.jpg 210w, https://subseaworldnews.com/wp-content/uploads/2018/04/fincantieri-delivers-new-oceanographic-vessel-to-imr.jpg 628w"

function postProcess(output, input) {

  const parseImage = (image)  =>  {
    if(!image)  {
      return null;
    }
    return image.split(',')[-1].split(' ')[0]
  }

  const article = output.data.article;

  if(!image)  {
    delete article.image;
  }
  else {
    article.image = parseImage(article.image);
  }

  output.data.article = article

  return output;
}
