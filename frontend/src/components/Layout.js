import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children}) => {
    return (
        <>
            <div className="page-container">
                <Header/>
                <main>{children}</main>
                <Footer/>
            </div>
        </>
    );
};

export default Layout;
