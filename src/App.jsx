import "./App.css";

import { useCallback, useEffect, useState } from "react";

import calcIsFibonacci from "./utils/calcIsFibonacci";
import calcIsPrime from "./utils/calcIsPrime";
import useDebounce from "./hooks/useDebounce";

function App() {
  // Column A input
  const [value, setValue] = useState("");
  const onValueChange = useCallback((e) => {
    setValue(
      e.target.value
        .replace("/", "")
        .replace(/[a-zA-Z]/g, "")
        .replace(/^[!@#$%^&*()_+=[\]{};':"/|,<>//?]*$/, "")
    );
  }, []);

  // Column B dropdown
  const [mode, setMode] = useState("isPrime");
  const onModeChange = useCallback((e) => {
    setMode(e.target.value);
  }, []);

  // Column C result
  const [result, setResult] = useState(false);

  // Get debounced value
  const debouncedValue = useDebounce(value, 800);

  // Format user input value
  useEffect(() => {
    if (debouncedValue) {
      const number = Number(debouncedValue);

      // Change negative number to 1
      if (number < 0 || debouncedValue === "-") {
        setValue("1");
        return;
      }

      // Round decimal value to the nearest integer
      setValue(Math.round(number));

      return;
    }
  }, [debouncedValue]);

  // Calculate result
  useEffect(() => {
    if (debouncedValue) {
      const number = Number(debouncedValue);

      // Calculate is prime value
      if (mode === "isPrime") {
        setResult(calcIsPrime(number));
        return;
      }

      // Calculate is fibonacci value
      if (mode === "isFibonacci") {
        setResult(calcIsFibonacci(number));
        return;
      }

      return;
    }
  }, [debouncedValue, mode]);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-a">
          <div className="content">
            <input
              type="text"
              placeholder="Enter a number"
              value={value}
              onChange={onValueChange}
            />
          </div>
        </div>
        <div className="col col-b">
          <div className="content">
            <select value={mode} onChange={onModeChange}>
              <option value="isPrime">isPrime</option>
              <option value="isFibonacci">isFibonacci</option>
            </select>
          </div>
        </div>
        <div className="col col-c">
          <div className="content">{result ? "true" : "false"}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
