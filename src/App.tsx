import "./App.css";
import Main from "./pages/main/Main";
import Loader from "../src/components/loader/Loader";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MapPage from "./pages/map-page/MapPage";
import firebase from "./firebase/config";
import UserList from "./pages/user-list/UserList";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import {
  getUserById,
  setLoading,
  setNeedVerification,
} from "./store/action/authActions";
import { RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import FindFriends from "./pages/find-friends/FindFriends";
import Profile from "./pages/profile/Profile";
import Home from "./pages/chat/Chat";
import Layout from "./components/layout/AuthLayout";
import Account from "./components/account/Account";
import Question from "./pages/question/Question";
import UpcomingEvents from "./pages/upcoming-events/UpcomingEvents";
import BlockedList from "./pages/blocked-page/BlockedList";
import PasttEvents from "./pages/past-event/PastEvent";
import CreateEventPage from "./pages/create-event/CreateEvent";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Main />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route
            path="/map"
            element={
              <Layout>
                <MapPage />
              </Layout>
            }
          />
        </Route>

        {/* <Route path="/upcoming-events" element={<YaklasanEtkinlik />} /> */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/friends"
            element={
              <Layout>
                <UserList />
              </Layout>
            }
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/blockedUser"
            element={
              <Layout>
                <BlockedList />
              </Layout>
            }
          />
        </Route>

        {/* <Route path="/chat" element={<Home />} /> */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/chat"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route
            path="/find-friend"
            element={
              <Layout>
                <FindFriends />
              </Layout>
            }
          />
        </Route>

        {/* <Route element={<PrivateRoute />}>
          <Route path="/" element={<ChatPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/chat-screen" element={<ChatScreenPage />} />
        </Route> */}

        <Route element={<PrivateRoute />}>
          <Route
            path="/profile-update"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
        </Route>

        <Route>
          <Route
            path="/account"
            element={
              <Layout>
                <Account />
              </Layout>
            }
          />
        </Route>
        <Route>
          <Route
            path="/question"
            element={
              <Layout>
                <Question />
              </Layout>
            }
          />
        </Route>

        <Route>
          <Route
            path="/upcoming-events"
            element={
              <Layout>
                <UpcomingEvents />
              </Layout>
            }
          />
        </Route>


        <Route>
          <Route
            path="/past-events"
            element={
              <Layout>
                <PasttEvents />
              </Layout>
            }
          />
        </Route>


        <Route>
          <Route
            path="/create-event"
            element={
              <Layout>
                <CreateEventPage />
              </Layout>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
