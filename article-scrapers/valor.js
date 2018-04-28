function postProcess(output, input) {
  // "output" has the raw pre-processing output
  // "input" has the specified inputs, including defaults

  if(output.outputScenario === 'RestrictedArticle') {
      const paragraph = output.data.article;
      const article = {paragraphs: [paragraph], preview: true};
      output.data.article = article
  }

  return output;
}
