import parser from './parser.js';

const filter = (document, options = {}) => {
  const samples = document.querySelectorAll('sample');
  const filteredSamples = [...samples].filter((sample) => {
    const responseData = sample.querySelector('responseData');
    if (!responseData || !responseData.innerHTML) {
      return false;
    }
    const sampleData = responseData.innerHTML
      .replace(/\?+=&quot.*?&quot;/g, '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"');
    const taskData = parser.strToXml(sampleData);

    if (options.isFinal) {
      const status = taskData.querySelector('StatusIsFinal');
      if (status.textContent !== 'true') {
        return false;
      }
    }

    if (options.guid) {
      const taskId = taskData.querySelector('TaskId');
      if (taskId.textContent !== options.guid) {
        return false;
      }
    }

    if (options.time) {
      const optionTime = new Date(options.time);
      const taskTimeData = taskData.querySelector('StatusDate');
      const taskTime = new Date(taskTimeData.textContent);
      if (!(taskTime.getTime() <= optionTime.getTime())) {
        return false;
      }
    }

    return true;
  });

  const filteredSamplesHtml = filteredSamples.map((item) => item.outerHTML).join('\n');
  const resultsElement = document.querySelector('testResults');
  resultsElement.innerHTML = filteredSamplesHtml;

  return document;
};

export default filter;
