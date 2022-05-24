let counterLabels = {
  counter: document.querySelector("#counter"),
  throttled_counter: document.querySelector("#throttled_counter"),
  debounced_counter: document.querySelector("#debounced_counter")
};

let counts = {
  counter: 0,
  throttled_counter: 0,
  debounced_counter: 0
};

function debounce(callback, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, timeout);
  };
}

function throttle(callback, timeout = 500) {
  var waiting = false;
  return (...args) => {
    if (!waiting) {
      callback.apply(this, args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, timeout);
    }
  };
}

function highlightChange(name) {
  counterLabels[name].style.color = "red";
  setTimeout(() => {
    counterLabels[name].style.color = "green";
  }, 300);
}

function increment(name, number) {
  counts[name] += number;
  counterLabels[name].innerText = counts[name];
  highlightChange(name);
}

const debouncedIncrement = debounce(
  (name, number) => increment(name, number),
  500
);

const throttledIncrement = throttle(
  (name, number) => increment(name, number),
  500
);