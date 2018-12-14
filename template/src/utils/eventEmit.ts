const eventKey = '@x_event_@';
const eventList: Record<string, any> = {};

export const on = (event: string, callback: (data: any) => void) => {
  if (eventList[event]) {
    return;
  }
  eventList[event] = (e: any) => {
    callback(e.detail);
  };
  window.addEventListener(`${eventKey}${event}`, eventList[event]);
};

export const off = (event: string) => {
  if (eventList[event]) {
    window.removeEventListener(`${eventKey}${event}`, eventList[event]);
    eventList[event] = null;
    delete eventList[event];
  }
};

export const emit = (event: string, data?: any) => {
  window.dispatchEvent(
    new CustomEvent(`${eventKey}${event}`, { detail: data }),
  );
};
