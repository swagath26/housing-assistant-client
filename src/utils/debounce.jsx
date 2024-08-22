const debounce = (fn, interval) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), interval);
    };
};

export default debounce;