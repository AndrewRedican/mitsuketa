import React, { Component } from 'react';
import JSONInput            from './jsoninput';
import ErrorBoundary        from './errorboundary';
import light                from '../morphs/lighttheme';
import getParamNames        from '../morphs/getParamNames';
import Mitsuketa            from '../morphs/mitsuketa';
import SampleData           from '../morphs/sampledata';

class Attributer extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        const { fxName } = this.props;
        const args = getParamNames(Mitsuketa[fxName]);
        //console.log(args);
        return(
            <div className = 'w3-small w3-opacity'>
                {fxName + '('}
                {
    
                }
            </div>
        );
    }
}

class Sampler extends Component{
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state   = { sampleName : 'None' };
    }
    render(){
        const { onClick } = this;
        return(
            <table 
                className = 'w3-small w3-left-align'
                style = {{ width : '100%' }}>
                <thead>
                    <tr>
                        <td style = {{ width : '45%' }} />
                        <td style = {{ width : '55%' }} />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style = {{ padding : '10px' }}>
                            <span className = 'w3-opacity' style = {{ marginRight : '5px' }}>Select Data:</span>
                            <span>
                                <div className = 'w3-dropdown-hover'>
                                    <div 
                                        className = 'w3-theme w3-round'
                                        style     = {{ padding : '5px 10px 5px 10px', width : '110px', position : 'relative' }}>
                                        <span style = {{ overflow : 'hidden' }}>{this.state.sampleName}</span>
                                        <span 
                                            className = 'fa fa-chevron-down'
                                            style     = {{ position : 'absolute', top: '50%', right : '10px', transform : 'translateY(-50%)' }}
                                        />
                                    </div>
                                    <div className = 'w3-dropdown-content w3-bar-block w3-border w3-small'>
                                        {
                                            Object.keys(SampleData).map( (sampleName,i) => {
                                                return(
                                                    <a
                                                        name      = {'sample-' + sampleName}
                                                        key       = {'sample-item-' + i}
                                                        className = 'w3-bar-item w3-hover-theme'
                                                        onClick   = {onClick}
                                                        >
                                                        {sampleName}
                                                    </a>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </span>
                        </td>
                        <td style = {{ padding : '10px' }}>
                            <span style = {{ marginRight : '5px' }}>
                                <textarea
                                    name        = 'url-box'
                                    placeholder = 'Url to fetch data...'
                                    rows        = '1'
                                    wrap        = 'off'
                                    style       = {{ 
                                        display       : 'inline-block', 
                                        verticalAlign : 'top',
                                        resize        : 'none',
                                        padding       : '5px',
                                        overflowY     : 'hidden',
                                        borderRadius  : '2px',
                                        borderColor   : '',
                                        height        : '28px',
                                        width         : '140px'
                                    }}
                                />
                            </span>
                            <span  style = {{ marginRight : '5px' }}>
                                <div
                                    className = 'w3-theme w3-round w3-center'
                                    style     = {{ display : 'inline-block', verticalAlign : 'top', padding : '5px 10px 5px 10px', width : '85px' }}
                                >
                                    <span
                                        className = 'fa fa-spinner fa-spin'
                                        style     = {{ marginRight : '5px' }}    
                                    />
                                    {'Loading'}
                                </div>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
    onClick(event){ 
        const
            rawText   = event.target.text,
            shortText = rawText.length <= 8 ? rawText : rawText.slice(0,-(rawText.length-8)) + '...';
        this.setState({ sampleName : shortText });
        this.props.onData(SampleData[rawText]);
    }
}

class TryItYourselfButton extends Component{
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    render(){
        const { onClick } = this;
        return(
            <div
                className = 'w3-theme w3-round'
                style     = {{
                    padding : '5px 10px 5px 10px',
                    width   : '150px'
                }}
                onClick = {onClick}
            >
                <span>Try it</span>
            </div>
        );
    }
    onClick(){
        if('onShow' in this.props) this.props.onShow();
        else console.warn('onShow event handler from TryItYourselfButton has not been specified by parent component.')
    }
}

class Example extends Component{
    constructor(props){
        super(props);
        if(!('fxName' in this.props)) console.error('fxName property has not been specified.');
        this.onData   = this.onData     .bind(this);
        this.onParams = this.onParams   .bind(this);
        this.onShow   = this.onShow     .bind(this);
        this.state = { 
            shown  : false,
            status : 'Data has not been provided.',
            input  : false,
            params : [],
            output : false
        };
    }
    render(){
        const { shown, status, input, output } = this.state;
        const { onShow, onData, onParams } = this;
        const { fxName } = this.props;
        if(!shown) return <TryItYourselfButton onShow = {onShow} />;
        const styleDefaults = {
            border : 'none',
            height : '40px',
            width  : '50%'
        };
        const placeholder =  input ? { placeholder : input } : {};
        return(
            <table style = {{ 
                width     : '100%', 
                marginTop : '15px',  
                border    : '1px solid #3E404026',
                boxShadow : '5px 5px 2px #3E40401A'
            }}>
                <thead>
                    <tr>
                        <td style = {{ width : '50%' }} />
                        <td style = {{ width : '50%' }} />
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style = {{ ...styleDefaults }} >
                            <Sampler onData = {onData} />
                        </td>
                        <td style = {{ ...styleDefaults }} >
                            <Attributer
                                fxName   = {fxName}
                                onParams = {onParams}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className = 'w3-right-align w3-small w3-opacity w3-bottombar w3-border-theme' style = {{ ...styleDefaults }} >Input</td>
                        <td className = 'w3-right-align w3-small w3-opacity w3-bottombar w3-border-theme' style = {{ ...styleDefaults }} >Output</td>
                    </tr>
                    <tr>
                        <td>
                            <div className = 'default'>
                                <ErrorBoundary>
                                    <JSONInput 
                                        id          = {fxName+'-inputBox'}
                                        colors      = { light }
                                        height      = '400px'
                                        width       = '350px'
                                        {...placeholder}
                                    />
                                </ErrorBoundary>    
                            </div>
                        </td>
                        <td>
                            <div className = 'default'>
                                <ErrorBoundary>
                                    <JSONInput 
                                        id     = {fxName+'-outputBox'}
                                        colors = { light }
                                        height = '400px'
                                        width  = '350px'
                                    />
                                </ErrorBoundary>    
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
    onData(dataSample){ this.setState({ input : dataSample }); }
    onParams(params){ this.setState({ params : params });      }
    onShow(){ this.setState({ shown : true });                 }
}

export default Example;