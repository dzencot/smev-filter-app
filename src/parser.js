const strToXml = (data) => {
  const domParser = new DOMParser();
  const parsedData = domParser.parseFromString(data, 'text/xml');
  return parsedData;
};

const xmlToStr = (data) => {
  const parser = new XMLSerializer();
  const parsedData = parser.serializeToString(data);
  return parsedData;
}

export default { strToXml, xmlToStr };
