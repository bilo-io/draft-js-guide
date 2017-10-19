import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppTopBar, AppSidenav, AppBody } from 'bilo-ui';
// pages
import About from './pages/about';
import Home from './pages/home';
import Lesson1 from './pages/lesson1';
import Lesson2 from './pages/lesson2';
import Lesson3 from './pages/lesson3';
import Lesson4 from './pages/lesson4';
import Lesson5 from './pages/lesson5';

require('../app.scss');

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.setState({
            sidenav: {
                isOpen: false,
                items: [
                    {
                        link: '/',
                        name: 'Home'
                    }, {
                        link: '/lesson1',
                        name: 'Lesson 1'
                    }, {
                        link: '/lesson2',
                        name: 'Lesson 2'
                    }, {
                        link: '/lesson3',
                        name: 'Lesson 3'
                    }, {
                        link: '/lesson4',
                        name: 'Lesson 4'
                    }, {
                        link: '/lesson5',
                        name: 'Lesson 5'
                    }
                ]
            }
        });
    }
    toggleSidenav() {
        this.setState({
            ...this.state,
            sidenav: {
                ...this.state.sidenav,
                isOpen: !this.state.sidenav.isOpen
            }
        });
    }
    render() {
        let { sidenav } = this.state;
        return this.state ? (
            <Router>
                <div>
                    <AppTopBar>
                        <img
                            src='https://raw.githubusercontent.com/bilo-io/resources/master/logo/react.png'
                            onClick={() => this.toggleSidenav()}
                            width='48' />
                        <Link to="/">Draft.js Guide</Link>
                    </AppTopBar>
                    <AppBody>
                        <AppSidenav isOpen={this.state.sidenav.isOpen}>
                            {sidenav.items.map((page) => {
                                return <Link
                                    key={page.link}
                                    to={page.link}
                                    className='sidenav-link'
                                    onClick={() => {
                                        this.toggleSidenav()
                                    }}>
                                    {page.name}
                                </Link>
                            })}
                        </AppSidenav>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/about" component={About} />
                            <Route exact path="/lesson1" component={Lesson1} />
                            <Route exact path="/lesson2" component={Lesson2} />
                            <Route exact path="/lesson3" component={Lesson3} />
                            <Route exact path="/lesson4" component={Lesson4} />
                            <Route exact path="/lesson5" component={Lesson5} />
                        </Switch>
                    </AppBody>
                </div>
            </Router>
        ) : null
    }
}