export const useInput = (initialValue, validate) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (event) => {
      const {
        target: { value }
      } = event;
    };
    let willUpdate = true;
    if (typeof validate === "function") {
      willUpdate = validate(value);
    }
    if (willUpdate) {
      setValue(value);
    }
    return { value, onChange };
  };