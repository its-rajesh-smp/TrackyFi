import { useEffect, useRef } from "react";
import axios from "axios";
import { GET_TRANSECTIONS } from "../API/endpoint";
import { useDispatch, useSelector } from "react-redux";
import { setTransections } from "../Store/Reducer/transectionReducer";

function useFetchTransections(skip) {
  const searchValue = useSelector((state) => state.searchReducer.searchValue);
  const filterValue = useSelector((state) => state.searchReducer.filterValue);

  const dispatch = useDispatch();
  const timer = useRef();

  /**
   * Using Debouncing To Search From Database
   * Fetching On The Bases Of SearchParam And FilterParam
   */

  useEffect(() => {
    timer.current = setTimeout(() => {
      (async () => {
        try {
          const { data: dbRes } = await axios.get(
            `${GET_TRANSECTIONS}/10/0/${
              searchValue !== "" ? searchValue : "null"
            }/${filterValue !== "" ? filterValue : "null"}`
          );

          if (!dbRes.body) {
            return;
          }

          dispatch(setTransections(dbRes.body));
        } catch (error) {
          console.log(error);
        }
      })();
    }, 200);

    return () => {
      clearTimeout(timer.current);
    };
  }, [skip, searchValue, filterValue]);
}

export default useFetchTransections;
