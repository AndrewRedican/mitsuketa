import React, { Component } from 'react';

class Page extends Component{
    constructor(props){
        super(props);
        this.state = { };
    }
    render(){
        return(
            <div
                name      = 'page'
                id        = 'page'
                className = 'w3-content'
                style     = {{
                    maxWidth  : '2000px',
                    marginTop : '128px'}}>
                {this.props.children}
            </div>
        )
    }
}

export default Page;