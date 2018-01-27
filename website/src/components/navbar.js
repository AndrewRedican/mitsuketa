import React, { Component } from 'react';

class NavBar extends Component{
    constructor(props){
        super(props);
        if(! 'options' in this.props)       return console.error('Navbar component expects \'options\' property');
        if(this.props.options.length === 0) return console.error('Navbar component expects \'options\' property to contain at least 1 item in array');
        this.defaultMenu       = this.defaultMenu      .bind(this);
        this.mobileDropdown    = this.mobileDropdown   .bind(this);
        this.onSelect          = this.onSelect         .bind(this);
        this.onShowDropdown    = this.onShowDropdown   .bind(this);
        this.resizeDescription = this.resizeDescription.bind(this);
        this.theme             = 'theme' in this.props ? this.props.theme : 'light';
        this.state             = { 
            selected           : this.props.options[0],
            dropdown           : false,
            description        : {
                display  : window.innerWidth > 760 ? 'block' : 'hidden',
                maxWidth : 'none'
            }
        };
    }
    defaultMenu(){
        const { onShowDropdown, onSelect, theme } = this;
        const { selected, description } = this.state;
        return(
            <div 
                name      = 'defaultMenu'
                className = 'w3-top'
                style     = {{ zIndex : 2 }}>
                <div className = {'w3-bar w3-theme-' + theme + ' w3-padding w3-card'}>
                    <div 
                        name      = 'presentation'
                        className = 'w3-bar-item'>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{'logo' in this.props ? <img src = {this.props.logo} /> : void(0)}</td>
                                    <td 
                                        id = 'presentation-text'
                                        style = {{ height : '118px', maxWidth : description.maxWidth }}>
                                        <h3>{'title' in this.props ? this.props.title : ''}</h3>
                                        {
                                            description.display === 'block' ?
                                            <h6>{'description' in this.props ? this.props.description : ''}</h6>
                                            : void(0)
                                        }
                                    </td> 
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div
                        className = 'w3-right w3-hide-small'
                        style     = {{ marginTop : '50px', marginBottom : '50px' }}>
                        {
                            this.props.options.map( (option,i) => {
                                return (
                                    <a 
                                        key       = {'defaultMenu-item-' + i}
                                        className = {'w3-bar-item w3-button w3-round w3-hover-theme' + ( selected === option ? ' w3-theme' : '')}
                                        style     = {{ marginLeft: '5px', marginRight : '5px' }}
                                        onClick   = {onSelect}>
                                        {option}
                                    </a>
                                );
                            })
                        }
                    </div>
                    <div 
                        name      = 'mobileDropdownToggle'
                        className = 'w3-right w3-hide-medium w3-hide-large'>
                        <a 
                            className = 'w3-bar-item w3-button w3-round w3-hover-theme'
                            onClick   = {onShowDropdown}
                            title     = 'Toggle Navigation Menu'
                            style     = {{ marginTop : '50px', marginBottom : '50px' }}>
                                <i className = 'fa fa-bars' />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
    mobileDropdown(){
        const { dropdown, selected } = this.state;
        const { onSelect, theme } = this;
        return(
            <div
                name      = 'mobileDropdown'
                className = {'w3-top w3-bar-block w3-hide-medium w3-hide-large w3-theme-' + theme + ' ' + (dropdown? 'w3-show' : 'w3-hide')}
                style     = {{ marginTop : '140px' }}>
                    {
                        this.props.options.map( (option,i) => {
                            return (
                                <a 
                                    key       = {'mobileDropdown-item-' + i}
                                    className = {'w3-bar-item w3-button w3-hover-theme' + ( selected === option ? ' w3-theme' : '')}
                                    onClick   = {onSelect}>
                                    {option}
                                </a>);
                        })
                    }
            </div>
        );
    }
    render(){
        const { defaultMenu, mobileDropdown } = this;
        return(
            <div name = 'NavBar'>
                {defaultMenu()}
                {mobileDropdown()}
            </div>
        );
    }
    onSelect(event) { const page = event.target.text; this.setState({ selected : page }); this.props.onPageSelect(page); }
    onShowDropdown(){ this.setState({ dropdown : !this.state.dropdown }); }
    resizeDescription(){
        const width           = window.innerWidth;
        this.setState({ 
            description : { 
                display  : width >= 760 ? 'block' : 'hidden',
                maxWidth : width >= 1000 ? 'none' : (520 - (1000 - width)) + 'px'
            }
        });
    }
    componentDidMount(){ window.onresize = this.resizeDescription; this.resizeDescription(); }
}

export default NavBar;