function postProcess(output, input) {

  const text = output.data.text;

  // Get paragraphs
  const paragraphs = text.split('\r\n\r\n');
  paragraphs.splice(0,1);

  output.data.article = { paragraphs }

  return output;
}
