import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import MyPersonasPage from "../../pages/MyPersonasPage";
import PrivateRoute from "./PrivateRoute";
import PostWritingPage from "../../pages/PostWritingPage";
import PersonaCreationPage from "../../pages/PersonaCreation/PersonaCreationPage";
import UserInfoPage from "../../pages/PersonaCreation/UserInfoPage";
import TagAndCategoryPage from "../../pages/PersonaCreation/TagAndCategoryPage";
import MyPostsPage from "../../pages/MyPostsPage";
import PostDetailPage from "../../pages/PostDetailPage";
import RevenuePage from "../../pages/RevenuePage";
import StatisticsPage from "../../pages/StatisticsPage";
import { RootState } from "../../redux/store";

const ServiceRouter = () => {
  const {isConnected} = useSelector((state: RootState) => state.auth);
  
  return (<Routes>       
            <Route path='/personas' element={<MyPersonasPage />} />
      
            <Route path='/posts' element={<PrivateRoute access={isConnected} Component={<MyPostsPage />} />} />
            <Route path='/post/:postId' element={<PrivateRoute access={isConnected} Component={<PostDetailPage />} />} /> 
            <Route path='/write' element={<PrivateRoute access={isConnected} Component={<PostWritingPage />} />} /> 
            <Route path='/post/edit/:postId' element={<PostWritingPage />} />
            <Route path='/create' element={<PersonaCreationPage />} >
              <Route path='' element={<UserInfoPage />} />
              <Route path='2' element={<TagAndCategoryPage />} />
            </Route>
            <Route path='/revenue' element={<PrivateRoute access={isConnected} Component={<RevenuePage />} />} /> 
            <Route path='/stats' element={<PrivateRoute access={isConnected} Component={<StatisticsPage />} />} /> 
          </Routes>
  );  
}

export default ServiceRouter;
