import React, { Component } from 'react';
import GetStarted           from './getstarted';
import Documentation        from './documentation';

class PageContent extends Component{
    render(){
        const { page } = this.props;
        switch(page){
            case 'Get Started' : return <GetStarted/>
            case 'Documentation' : return <Documentation/>
        }
    }
}

export default PageContent;