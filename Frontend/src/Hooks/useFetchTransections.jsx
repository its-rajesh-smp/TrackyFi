import { useEffect } from "react";
import axios from "axios";
import { GET_TRANSECTIONS } from "../API/endpoint";
import { useDispatch } from "react-redux";
import { setTransections } from "../Store/Reducer/transectionReducer";

function useFetchTransections(skip = 0) {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { data: dbRes } = await axios.get(
          `${GET_TRANSECTIONS}/5/${skip}`
        );

        dispatch(setTransections(dbRes.body));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [skip]);
}

export default useFetchTransections;
