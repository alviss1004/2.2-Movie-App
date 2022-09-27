import * as React from "react";
import { Routes, Route } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import TvDetailPage from "../pages/TvDetailPage";
import MovieDetailPage from "../pages/MovieDetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import TvShowsPage from "../pages/TvShowsPage";
import MoviesPage from "../pages/MoviesPage";
import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <MainLayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="movie/:id" element={<MovieDetailPage />} />
        <Route path="tvshow/:id" element={<TvDetailPage />} />
        <Route path="tvshows/:pageId" element={<TvShowsPage />} />
        <Route path="movies/:pageId" element={<MoviesPage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default Router;
