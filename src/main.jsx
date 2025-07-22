import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import store from "@/redux/store.js";
import { Provider } from "react-redux";
import './App.scss'

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
    </Provider>
);
