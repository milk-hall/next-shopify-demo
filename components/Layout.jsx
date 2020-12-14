import { Container } from "@material-ui/core"
import Footer from "./Footer"
import Header from "./Header"
import NavBar from "./Navbar"

const Layout = ({ title, children }) => {
  return (
    <>
      <Header title={title}></Header>
      <NavBar />
      <Container>
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default Layout