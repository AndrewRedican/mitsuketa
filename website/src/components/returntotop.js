import React, { Component } from 'react';

class ReturnToTop extends Component{
    constructor(props){ 
        super(props);
        this.showComponent = this.showComponent.bind(this);
        this.onReturn      = this.onReturn.bind(this);
        this.mountedCssRules = []; 
        this.animations = { 
            fadeIn : { '0%' : { opacity : 0 }, '100%' : { opacity : 1 } }
        };
        this.aSettings = {
            animationDirection      : 'normal',
            animationFillMode       : 'forwards',
            animationTimingFunction : 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        };  
        this.state         = { visible : false }; 
    }
    render(){
        const { visible, opacity } = this.state;
        const { onReturn, aSettings } = this;
        return(
            <div name = 'return-to-top'>
                { 
                    visible ?
                        <a 
                            className = 'w3-theme'
                            style     = {{
                                position          : 'fixed',
                                bottom            : '5vmin',
                                right             : '5vmin',
                                width             : '15vmin',
                                height            : '15vmin',
                                display           : 'block',
                                textDecoration    : 'none',
                                borderRadius      : '50%',
                                animationDuration : '0.5s',
                                cursor            : 'pointer',
                                zIndex            : 2,
                                animationName     : 'fadeIn',
                                animationDuration : '0.5s',
                                animationDelay    : '0s',
                                ...aSettings
                            }}
                            onClick = {onReturn}
                        >
                            <span 
                                className = 'fa fa-chevron-up'
                                style     = {{
                                    color      : '#fff',
                                    fontSize   : '10vmin',
                                    position   : 'absolute',
                                    left       : '50%',
                                    top        : '45%',
                                    transform  : 'translate(-50%,-50%)'
                                }}
                            />
                        </a> 
                    : void(0)
                }
            </div>
        );
    }
    componentWillMount(){
        let { animations, mountedCssRules } = this;
        let
            SSS   = document.styleSheets,
            SS    = SSS[1];
        Object.keys(animations).forEach( name => {
            const animation = animations[name];
            let        rule = '@keyframes ' + name + '{';
            Object.keys(animation).forEach( step => {
                rule += step + '{';
                let properties = animation[step];
                Object.keys(properties).forEach( key => {
                    rule += key +  ':' + properties[key] + ';';
                });
                rule += '}';
            });
            rule += '}';
            const nxt = SS.cssRules.length;
            SS.insertRule(rule,nxt);
            mountedCssRules.push(nxt);
        });
    }
    componentDidMount(){ 
        const { showComponent } = this; window.onscroll = function() { showComponent() };
    }
    componentWillUnmount(){
        let { mountedCssRules } = this;
        let
            SSS   = document.styleSheets,
            SS    = SSS[1];
        mountedCssRules.forEach( index => { SS.deleteRule(SS.cssRules.length - 1); });
        mountedCssRules = [];
    }
    showComponent(){
        const { visible } = this.state;
        const
            minPixels = 250,
            show      = document.body.scrollTop > minPixels || document.documentElement.scrollTop > minPixels;
        if(show!==visible) this.setState({ visible : show });
    }
    onReturn(){
        document.body.scrollTop = 0,
        document.documentElement.scrollTop = 0;
    }
}


export default ReturnToTop;