import "../styles/app.css"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { createStore } from "redux"

import Header from "../components/header/Header"
import { generateUser } from "../utils/testUtils"

const storeLogin = createStore(() => ({
  auth: generateUser(), // auth tidak null = user login
}))

const storeNotLogin = createStore(() => ({
  auth: null, // auth null = user belum login
}))

export default {
  title: "Components/Header",
  component: Header,
}

const withProviders = (store) => (args) => (
  <Provider store={store}>
    <BrowserRouter>
      <Header {...args} />
    </BrowserRouter>
  </Provider>
)

export const Authenticated = withProviders(storeLogin).bind({})
Authenticated.storyName = "User Logged In"

export const NotAuthenticated = withProviders(storeNotLogin).bind({})
NotAuthenticated.storyName = "User Not Logged In"
