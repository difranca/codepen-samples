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

const incrementButton = document.querySelector("#increment_button");
incrementButton.addEventListener("click", () => {
  increment("counter", 1);
  throttledIncrement("throttled_counter", 1);
  debouncedIncrement("debounced_counter", 1);
});

/**
Returns a debounced version of the provided callback.
The returned function will call the callback only if it hasn't been called again within the specified timeout.
If a subsequent call is made within the timeout, the timer is reset and the callback is called again only after the timeout.
@param {Function} callback - The callback function to debounce.
@param {Number} [timeout=500] - The timeout in milliseconds.
@returns {Function} - The debounced version of the provided callback.
*/
function debounce(callback, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
}

/**
Returns a throttled version of the provided callback.
The returned function will call the callback only once within the specified timeout.
Subsequent calls made within the timeout will be ignored.
@param {Function} callback - The callback function to throttle.
@param {Number} [timeout=500] - The timeout in milliseconds.
@returns {Function} - The throttled version of the provided callback.
*/
function throttle(callback, timeout = 500) {
  let waiting = false;
  return (...args) => {
    if (!waiting) {
      callback(...args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, timeout);
    }
  };
}

/**
Highlights a change to the specified counter label.
The function sets the color of the counter label to red and after 300 milliseconds sets it back to green.
@param {String} name - The name of the counter label to highlight.
*/
function highlightChange(name) {
  if (counterLabels[name]) {
    counterLabels[name].style.color = "red";
    setTimeout(() => {
      counterLabels[name].style.color = "green";
    }, 300);
  }
}

/**
Increments the value of a counter and updates its corresponding label.
The function first checks if the counter exists, increments its value, and then checks if its corresponding label exists.
If the label exists, it updates its text content with the new value of the counter and highlights the change.
@param {String} name - The name of the counter to increment.
@param {Number} number - The value to increment the counter by.
*/
function increment(name, number) {
  console.log(counts);
  console.log(name);
  if (name in counts) {
    counts[name] += number;
    if (name in counterLabels) {
      counterLabels[name].textContent = counts[name];
      highlightChange(name);
    }
  }
}

/**
 * Debounced version of the `increment` function
 * @param {string} name - The name of the counter being incremented
 * @param {number} number - The number to increment the counter by
 * @returns {function} - A debounced version of the `increment` function that will not be called more frequently than the specified `timeout`
 */
const debouncedIncrement = debounce(
  (name, number) => increment(name, number),
  500
);

/**
 * Throttled version of the `increment` function
 * @param {string} name - The name of the counter being incremented
 * @param {number} number - The number to increment the counter by
 * @returns {function} - A throttled version of the `increment` function that will be called at most once in the specified `timeout` interval
 */
const throttledIncrement = throttle(
  (name, number) => increment(name, number),
  500
);
