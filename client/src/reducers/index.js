import { combineReducers } from "redux";
import showProperty from "./showProperty";
import searchProperty from "./searchProperty";
import deleteProperty from "./deleteProperty";
import detailsProperty from "./detailsProperty";
import addProperty from "./addProperty";
import signin from "./signIn";
import error from "./error";
import updateProperty from "./updateProperty";
import detailsFullContract from "./detailsFullContract";
import deleteFullContract from "./deleteFullContract";
import showFullContract from "./showFullContract";
import service from "./service";
const allReducer = combineReducers({
  showProperty,
  searchProperty,
  deleteProperty,
  detailsProperty,
  addProperty,
  signin,
  error,
  updateProperty,
  detailsFullContract,
  deleteFullContract,
  showFullContract,
  service
});
export default allReducer;
