import Footer from './components/footer/Footer.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import OfferedServices from './components/offeredServices/OfferedServices.jsx';
import Preview from './components/preview/Preview.jsx';
import Reviews from './components/reviews/Reviews.jsx';

function App() {
    return (
        <div className="h-full max-w-full">
            <Navbar />
            <Preview />
            <OfferedServices />
            <div className="h-[700px] w-full bg-black"></div>
            <Reviews />
            <Footer />
        </div>
    );
}

export default App;
