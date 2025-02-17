
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import ErrorElement from '../pages/ErrorElement';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivetRoute from './PrivetRoute';
import MyProfile from '../pages/MyProfile';

import ProfileUpdate from '../pages/ProfileUpdate';
import AllBooks from '../pages/AllBooks';
import AddBook from '../pages/AddBook';
import BorrowedBooks from '../pages/BorrowedBooks';
import UpdateBook from '../pages/UpdateBook';
import BookList from '../pages/BookList';
import BookDetails from '../pages/BookDetails';
import About from '../pages/About';


const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorElement />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/books/:category',
                element: <BookList />
            },
            {
                path: '/books/details/:id',
                element: (
                    <PrivetRoute>
                        <BookDetails />
                    </PrivetRoute>
                )
            },
            {
                path: '/allBooks',
                element: <AllBooks />
            },
            {
                path: '/update-book/:id',
                element: (
                    <PrivetRoute>
                        <UpdateBook />
                    </PrivetRoute>
                )
            },
            {
                path: '/addBook',
                element: (
                    <PrivetRoute>
                        <AddBook />
                    </PrivetRoute>
                )
            },
            {
                path: '/borrowedBooks',
                element: (
                    <PrivetRoute>
                        <BorrowedBooks />
                    </PrivetRoute>
                )
            },
            {
                path: '/myProfile',
                element: (
                    <PrivetRoute>
                        <MyProfile />
                    </PrivetRoute>
                )
            },
            {
                path: '/auth',
                element: <AuthLayout />,
                children: [
                    {
                        path: '/auth/login',
                        element: <Login />
                    },
                    {
                        path: '/auth/register',
                        element: <Register />
                    },
                    {
                        path: '/auth/profileUpdate',
                        element: <ProfileUpdate />
                    }
                ]
            }
        ]
    }
]);

export default routes;

