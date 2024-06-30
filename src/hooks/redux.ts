import { RootState, AppDispatch } from "../store/store";
import { useSelector, useDispatch } from "react-redux";

// Pre typed hooks
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()