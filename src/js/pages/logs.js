import $ from '../utils/dom';
import * as logsStore from '../stores/logs';

const bold = (strings, ...values) =>
  strings
    .map((string, i) => {
      const msg = (values[i] || '').replace(/\*(.*?)\*/g, '<b>$1</b>');
      return string + msg;
    })
    .join('');

const renderLog = (log) => bold`
  <p class="mb-1"><code>[${new Date(log.time).toISOString()}] ${
  log.msg
}</code></p>
`;

const init = () => {
  const logs = logsStore.getAll();

  const container = $('.site__content');
  logs.forEach((log) => {
    container.insertLast(renderLog(log));
  });
};

export { init };
