import parser from './parser.js';
import filter from './filter.js';

export default () => {
  const form = document.querySelector('.filter-form');
  const linksContainer = document.querySelector('.links');
  const inputFiles = document.querySelector('.input-files');

  const options = {
    isFinal: true,
  };

  const readerHandler = (event) => {
    const fileName = event.target.fileName;
    const fileContent = event.target.result;
    const parsedContent = parser.strToXml(fileContent);

    const parsedData = filter(parsedContent, options);
    const data = parser.xmlToStr(parsedData);

    const link = document.createElement('a');
    link.href = `data:application/xml;content-disposition=attachment;filename=${fileName},${data}`
    link.download = fileName;
    link.target = '_blank';
    link.innerHTML = fileName;
    // link.style.display = 'none';
    // link.id = `downloadlnk-${postfix}`;
    const div = document.createElement('div');
    div.classList.add('row')
    div.appendChild(link);
    linksContainer.appendChild(div);
    // link.click();
    // document.body.removeChild(link);

    // const download = document.createElement('a');
    // download.href = `data:text/xml;content-disposition=attachment;filename=file,` + val;
    // download.download = name;
    // download.style.display = 'none';
    // download.id = 'download';
    // document.body.appendChild(download);
    // document.getElementById('download').click();
    // document.body.removeChild(download);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const filterGuid = data.get('filterGuid');
    const filterIsFinal = data.get('filterIsFinal');
    const files = inputFiles.files;

    if (!filterIsFinal) {
      options.isFinal = false;
    } else {
      options.isFinal = true;
    }

    if (filterGuid) {
      options.guid = filterGuid;
    }

    files.forEach((file) => {
      const reader = new FileReader();
      reader.fileName = file.name;
      reader.addEventListener('load', readerHandler);
      reader.readAsText(file, 'UTF-8');
    });
  });
};
