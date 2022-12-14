import PostComponent from './components/PostComponent';
import ProfileComponent from './components/ProfileComponent';

import {BrowserRouter , Route,  Routes} from 'react-router-dom';
function App() {
  return (
    <>
  
      <BrowserRouter>
        <div className="container">
            <Routes>
              <Route path="/" element = {<PostComponent/>}></Route>
              <Route path="/trang-chu" element= {<PostComponent/>}></Route>
              <Route path="/profile/:userID" element = {<ProfileComponent/>}></Route>
              </Routes>
          </div>  
    </BrowserRouter>

            
    </>
  );
}

export default App;