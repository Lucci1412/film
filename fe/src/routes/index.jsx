
import HomePage from "../pages/HomePage";
import MovieDetailPage from "../pages/MovieDetailPage";
import SearchPage from "../pages/SearchPage";
import defaultLayout from "../layout/defaultLayout";
import UserLayout from "../layout/UserLayout";
import TypeMoviePage from "../pages/TypeMoviePage";
import CategoryMoviePage from "../pages/CategoryMoviePage";

import CountryMoviePage from '../pages/CountryMoviepage'
import ActorPage from "../pages/ActorPage";
import ProfilePage from "../pages/ProfilePage";
import MovieUserPage from "../pages/MovieUserPage";
import NotFoundPage from "../pages/NotFoundPage";
import CommonMoviePage from "../pages/CommonMoviePage";
export const publicRoutes = [
  { path: "/", component: HomePage, layout: defaultLayout},
  { path: "/tim-kiem/:key", component: SearchPage, layout: defaultLayout },
  //detail movie
  { path: "/phim/:slug", component: MovieDetailPage, layout: defaultLayout },


  //actor movie
  { path: "/dien-vien/:key", component: ActorPage, layout: defaultLayout },
  //category movie
  { path: "/the-loai/:key", component: CategoryMoviePage, layout: defaultLayout },
  //country movie
  { path: "/quoc-gia/:key", component: CountryMoviePage, layout: defaultLayout },
  //common
  { path: "/phim-moi", component: CommonMoviePage, layout: defaultLayout },
  { path: "/chieu-rap", component: CommonMoviePage, layout: defaultLayout },
  // type movie 
  { path: "/phim-bo", component: TypeMoviePage, layout: defaultLayout },
  { path: "/phim-le", component: TypeMoviePage, layout: defaultLayout },
  { path: "/game-show", component: TypeMoviePage, layout: defaultLayout },
  { path: "/hoat-hinh", component: TypeMoviePage, layout: defaultLayout },

 

  



   //not found page
   { path: "/*", component: NotFoundPage, layout: defaultLayout },
];



export const userRouter=[
  { path: "/tai-khoan/thong-tin-ca-nhan", component: ProfilePage, layout: UserLayout },
  { path: "/tai-khoan/yeu-thich", component: MovieUserPage, layout: UserLayout },
  { path: "/tai-khoan/phim-dang-xem", component: MovieUserPage, layout: UserLayout },
  { path: "/tai-khoan/thong-bao", component: ProfilePage, layout: UserLayout },
  { path: "/tai-khoan/tro-giup-va-bao-loi", component: ProfilePage, layout: UserLayout },

]