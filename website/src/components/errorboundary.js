import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
    componentDidCatch(error, info) { this.setState({ hasError: true }); }
    render(){
      const { hasError } = this.props;
      if(hasError)
      return (
        <div 
          style = {{  
                position:   'absolute',
                top:        '50%',
                left:       '50%',
                transform:  'translate(-50%,-50%)',
                textAlign:  'center'
            }}
          > 
          <h5>We are terribly sorry!</h5>
          <p>An error occured while loading assessments. Try reloading the page.</p>
        </div>
      );
      return this.props.children;
    }
  }

export default ErrorBoundary;

