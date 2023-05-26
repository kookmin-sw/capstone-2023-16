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
import { useAuth } from "../../context/AuthContext";

const ServiceRouter = () => {
  const context = useAuth();

  return (<Routes>       
            <Route path='/personas' element={<MyPersonasPage />} />
      
            <Route path='/post' element={<PrivateRoute access={context.persona?.id!==undefined} Component={<MyPostsPage />} />} />
            <Route path='/post/:postId' element={<PrivateRoute access={context.persona?.id!==undefined} Component={<PostDetailPage />} />} /> 
            <Route path='/write' element={<PrivateRoute access={context.persona?.id !== undefined} Component={<PostWritingPage />} />} /> 
            <Route path='/post/edit/:postId' element={<PostWritingPage />} />
            <Route path='/create' element={<PersonaCreationPage />} >
              <Route path='' element={<UserInfoPage />} />
              <Route path='2' element={<TagAndCategoryPage />} />
            </Route>
            <Route path='/revenue' element={<PrivateRoute access={context.persona?.id!==undefined} Component={<RevenuePage />} />} /> 
            <Route path='/stats' element={<PrivateRoute access={context.persona?.id!==undefined} Component={<StatisticsPage />} />} /> 
          </Routes>
  );  
}

export default ServiceRouter;
