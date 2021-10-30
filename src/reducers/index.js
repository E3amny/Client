
import { ProcessReducer } from "./chat/chatReducer";
import { createStore, combineReducers } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import token from "./login/token";
import isLoggedIn from "./login/isLoggedIn";
import userId from "./login/userId";
import img from "./Donation/ImageReducer";
import title from "./Donation/TitleReducer";
import amount from "./Donation/AmountReducer"
import postId from "./Donation/PostId";
import userAvatar from "./login/userAvatar";
import text1 from './search/searchReducer'

const reducers = combineReducers({
  token_1: token,
  isLoggedIn: isLoggedIn,
  userId: userId,
  ProcessReducer: ProcessReducer,
  img: img,
  title:title,
  amount:amount,
  postId:postId,
  userAvatar:userAvatar,
  text1:text1
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "title",
    "img",
    "token_1",
    "isLoggedIn",
    "userId",
    "ProcessReducer",
    "amount",
    "postId",
    "userAvatar",
    "text1"
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);


export {store, persistor}

