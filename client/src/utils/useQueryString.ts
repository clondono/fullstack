import { useState, useCallback } from 'react';
import qs from 'query-string';

function useQueryString(key: string, initialValue?: any) {
  const [value, setValue] = useState(getQueryStringValue(key) || initialValue);
  const onSetValue = useCallback(
    (newValue) => {
      setValue(newValue);
      setQueryStringValue(key, newValue);
    },
    [key]
  );

  return [value, onSetValue];
}
const setQueryStringValue = (key: string, value: any, queryString = window.location.search) => {
  const values = qs.parse(queryString);
  const newQsValue = qs.stringify({ ...values, [key]: value });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

const getQueryStringValue = (key: string, queryString: string = window.location.search) => {
  const values = qs.parse(queryString);
  return values[key];
};

const setQueryStringWithoutPageReload = (qsValue: string) => {
  const newurl =
    window.location.protocol + '//' + window.location.host + window.location.pathname + qsValue;

  window.history.pushState({ path: newurl }, '', newurl);
};

export default useQueryString;

// inspiration: https://medium.com/swlh/using-react-hooks-to-sync-your-component-state-with-the-url-query-string-81ccdfcb174f
// https://gist.github.com/fernandoabolafio
