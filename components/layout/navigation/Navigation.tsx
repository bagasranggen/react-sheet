import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import navigationItems from '../../../dummy/navigationItems';

import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

export type NavigationProps = {};

const Navigation = ({ }: NavigationProps): React.ReactElement => {
    const router = useRouter()

    const [show, setShow] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const [navIsClicked, setNavIsClicked] = useState(false);

    const handleClose = () => {
        setIsOpened(false);
        setTimeout(() => setShow(false), ((navigationItems.length - 1) * 50 + 450));
    };

    const handleShow = () => setShow(true);

    useEffect(() => {
        const loadCompleteHandler = () => {
            handleClose();
            setNavIsClicked(false);
        }

        if (show) router.events.on('routeChangeComplete', loadCompleteHandler)
    }, [router.events, navIsClicked])

    return (
        <>
            <Navbar
                expand={false}
                sticky="top">
                <div className="container justify-content-end">

                    {/*<Link href="/">*/}
                    {/*    <Navbar.Brand>*/}
                    {/*        <Image*/}
                    {/*            width={40}*/}
                    {/*            height={40}*/}
                    {/*            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEmElEQVR4nO2bT2zbVBzHv892kjZ/mjSjS2nahVEmdUhR2Yk7oBaoOIBUhHrhWDHBfRIS08QZcUKi4sKBUysOHJDQpJ0Qh0pIQypaKGqWqtY20qYLa5xqjR0/DsufJX1Onh07Nq0/p/jn9+/383vP3/xeAvj4+PicY4iZwh/do0uEYO1ubn/yQmLk1m9vxL80Krv14HBGIuLXABYAxAYdqEUqBLgDKtyYS49tswqYCsBKjsoApje3HiEQEOt/vZ+SWOUazv8BIGl+zI5Q1mh9Ppu+IHffEEw2NN38oKp10ahQ48l7xXkAGJeI+BXrhtkA8LLgULuDsMgyci0Bbf3lJQqyRoE0AKh59dkNCXUhKt4a/aTQsRfkHv5LWe08qdYglxQAwMwLUcQjQUt2q1ydSpzyl2sGUJBvm853oEHUFf0mTxtl5QT5YgU1TUdN03G/eITHlaem7XbD3MS6nzjzcbYKU8O9oEm5eoLCvgLQdkuUArsH1fYFp50IBOORUL8uuWEGwPCJW+BJtYZCsdP5dkcGoe1hL/xTQQGVvv0GJQEzE1HEw72XjUEAnu32wQ/zBABWcp0j2sSjrhpThh3IpS7nSWMZdjtp1t6HmqZj70BBNtP7ZeTUW4ANIbiciuJyKtp2zIrdRpgzwE5mJqKQDxRQAJee28mFFIFcMmffKylQNZ2r34AkIDMR7VvO8QDEw0HEGdMwHgkiHjFnzzLsgzLcJeBBzn0AHF8CVhimYvRcAMpKp2i6XzxCZiIKQogpezI2wtWfpwLghmJ0PABH1Rr2DhTU6nyvLyZWFGNRgZAifZdDz01QXZ+VtY3Zd7gGacBeyaLzhLDFD6+d0ta+0IueM4AC05RirW8rdtNQgAA6v0eYtPOIZ6MA7AJ4qfHZnAjvoqkEayYU3KCKsWW3qgQJIauU0u8AUELJKoBfuEbPwEgJcte3oBhZdiOYAQgs79wGkGler+S42/vf4StBtwfgdp7Q1QAMW/WxcC0AXskTek8J2pQn5M0JOr4JcinBQVUfg2ZOsB/uvwVczhMOLSfIUoJ2qD6jPKHnc4LMsi7kCd1fAi7DNQO+33ql47p1ONogYt94hs5QdYDbqo/F0ALgBdXHYigB8IrqY+F4ALx+Ouz4W4B5Omyz6mPhTSXonw77p8Ntu3867A38ALg9ALdxPSlqF6qmQz5UUDlWUddP64hkLPQzq96ZCICq6bgnl5mOExAkYyPfvP1a+lNW3TOxBORDhem8KAj0YmL0cyPngTMyAyrH6imbJAr6eCzw8VvZqR961eUKwFX8ugFguWWYfe4moes2/ajUMt1PPygJWjIaWXozm7rdry7XEhA1XAdQZNwqQRQ/Y9j7f1txiJGgeDwWD1/jcR7gDMDfK1MlQuhqt50Qcj3/weT+KTtwh6dduwmHpMexuHhl8dXJP3nrcG+CO8vpnwBstAyEru8sv7jBLEyFGwDKvG3bQWxU2k1EwpmFuUsPzdQztQle3Pzxi9D23fcgCPTkyvzNvEG5ufTY9taDw/nG31QWAYyZ6ccsiUjo93evTb9OCBngh0g+Pj4+55D/AEJ61rcLXb81AAAAAElFTkSuQmCC" />*/}
                    {/*    </Navbar.Brand>*/}
                    {/*</Link>*/}

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded={show ? 'true' : 'false'}
                        aria-label="Toggle navigation"
                        onClick={show ? handleClose : handleShow}>
                        <div className="menu-toggle">
                            {/*<div className="menu-toggle__text">*/}
                            {/*    <div>Menu</div>*/}
                            {/*    <div>Close</div>*/}
                            {/*</div>*/}
                            <div className="menu-toggle__icon" />
                        </div>
                    </button>

                </div>
            </Navbar>

            <Offcanvas
                className={`offcanvas-fade${isOpened ? ' is-opened' : ''}`}
                backdrop={false}
                show={show}
                onEntered={() => setIsOpened(true)}
                onHide={handleClose}>
                <Offcanvas.Body>
                    <div className="mt-10 container">
                        <ul className="nav-list">
                            {navigationItems.map((n: any) => (
                                <li key={n.label}>
                                    <Link href={n.uri}>
                                        <a onClick={() => setNavIsClicked(true)}><span>{n.label}</span></a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default Navigation;