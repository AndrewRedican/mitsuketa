import React, { Component } from 'react';
import NavBar               from './navbar';
import Header               from './header';
import PageContent          from './pagecontent';
import ReturnToTop          from './returntotop';

class App extends Component{
    constructor(props){
        super(props);
        this.onPageSelect = this.onPageSelect.bind(this);
        this.state        = { page : 'Get Started' };
    }
    render(){
        const { onPageSelect } = this;
        const { page } = this.state;
        return(
            <div name = 'App'>
                <NavBar
                    title        = 'Mitsuketa'
                    description  = 'A Javascript library that enables you to handle deeply nested objects easily.'
                    logo         = '../assets/favicons/android-chrome-96x96.png'
                    options      = {['Get Started','Documentation']}
                    theme        = 'light'
                    onPageSelect = {onPageSelect}
                />
                <Header />
                <PageContent
                    page   = {page}
                />
                <ReturnToTop />
            </div>
        )
    }
    onPageSelect(page){ this.setState({ page : page }); }
}

export default App;