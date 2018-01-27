import React, { Component } from 'react';

class SideBar extends Component{
    constructor(props){
        super(props);
        this.onSelect = this.onSelect  .bind(this);
        this.onSearch = this.onSearch  .bind(this);
        this.state    = { 
            list     : this.props.list,
            selected : this.props.list[0]
        };
    }
    render(){
        const { list, selected }  = this.state;
        const { onSearch } = this;
        const List =  list.map( (item,i) => {
            return(
                <a 
                    key       = {'sideBar-item-' + i}
                    name      = {item}
                    className = {'w3-bar-item' + ( item !== selected ? ' w3-hover-text-theme' : '') + ( item === selected ? ' w3-theme' : '' )}
                    style     = {{ textDecoration : 'none !important' }}
                    onClick   = {this.onSelect}>{item}
                </a>
            );
        });
        return(
            <div className = 'w3-sidebar w3-bar-block w3-collapse w3-card' style = {{ height : '85%', marginTop: '5px', width : '200px', overflow : 'hidden' }}>
                <input
                    id          = 'searchBox'
                    className   = 'w3-input w3-border-theme w3-padding' 
                    type        = 'text'
                    placeholder = 'Search for function..'
                    onChange    = {onSearch}
                />
                <div style = {{ position : 'relative', height : '90%', overflowY : 'scroll', overflowX : 'hidden' }}>
                    {List}
                </div>
            </div>
        );
    }
    onSelect(event){ this.setState({ selected : event.target.text }); }
    onSearch(event){
        const targetValue = event.target.value;
        let  filteredList = [];
        this.props.list.forEach( item => { 
            if(item.toLowerCase().indexOf(targetValue.toLowerCase())>-1) filteredList.push(item);
        });
        this.setState({ list : filteredList });
    }
    componentDidUpdate(){
        const { selected } = this.state;
        const    section   = document.getElementById('section-' + selected);
        function scrollWindowTo(element,OffsetY) {
            window.scrollBy({ 
                top: element.getBoundingClientRect().top + OffsetY,
                left: 0, 
                behavior: 'smooth' 
            });
        }
        scrollWindowTo(section,-150);

    }
}

export default SideBar;


