import { Fragment } from "react/jsx-runtime"
import { BrowserRouter } from "react-router-dom"
import RouteList from "./route/RouteList"

function App() {
  return (
    <>
      <Fragment>
        <BrowserRouter>
          <RouteList />
        </BrowserRouter>
      </Fragment>
    </>
  )
}

export default App
