import { useLayoutEffect, useState, useCallback } from "react";
import { publicRequest } from "../commons/api";
import { messageFail } from "../commons/index";

let cache={}
const optDefault = {
  sizeCache: 100,
  saveCache: true,
};
const useQueryMovie = (url, option = optDefault) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearCache = useCallback(() => {
    if(Object.keys(cache).length >= option.sizeCache) cache = {}
  },[option.sizeCache])
  useLayoutEffect(() => {
    const getMovie = async () => {
      if (!url) return;
      let here = true;
      if (cache[url]) {
       return setData(cache[url]);
      }

      setLoading(true);
      const res = await publicRequest.get(url);
      try {
        if (res) {
          if (here) {
            setData(res.data);
            setLoading(false);
            if (option.saveCache) {
              cache[url] = res.data;
            }
          }
        }
      } catch (err) {
        if (here) {
          setError(err);
          messageFail(err);
          setLoading(false);
        }
      }

      return () => (here = false);
    };
    getMovie();
    clearCache()
  }, [url,  clearCache, option.saveCache]);

  return { loading, error, data };
};

export default useQueryMovie;
