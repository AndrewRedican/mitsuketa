import React, { Component } from 'react';
import Page                 from './page';
import SideBar              from './sidebar';
import Example              from './example';
import Mitsuketa            from '../morphs/mitsuketa';
import Info                 from '../morphs/info';
import getParamNames        from '../morphs/getParamNames';

class Documentation extends Component {
    constructor(props){
        super(props);
        this.functionNames    = Object.keys(Mitsuketa);
        this.sections         = this.sections           .bind(this);
    }
    sections(){
        const { functionNames, renderExample } = this;
        const list = functionNames.map( (fxName,i) => {
            return(
                <div className = 'w3-row'>
                    <div className = 'w3-col s1 m2 l3'>&nbsp;</div>
                    <div className = 'w3-col s10 m8 l6'>
                        <div 
                            key       = {'section-item-' + i}
                            id        = {'section-' + fxName}
                            className = 'w3-container w3-content w3-center w3-padding-64'
                            style     = {{ 
                                maxWidth : '1000px'
                            }}
                        >
                            <h2 
                                name      = 'function-title'
                                className = 'w3-wide'
                            >
                                {fxName.toUpperCase()}
                            </h2>
                            <p 
                                name      = 'function-structure'
                                className = 'w3-opacity'>
                                <i>{fxName + '(' + getParamNames(Mitsuketa[fxName]).join(',') + ')'}</i>
                            </p>
                            <div className = 'w3-panel w3-border-left w3-theme-l5'>
                                <p 
                                    name      = 'function-description'
                                    className = 'w3-justify w3-small'
                                >
                                    {Info[fxName].description}
                                </p>
                            </div>
                            <table style = {{ width : '100%' }}>
                                <tbody>
                                    <tr><td className = 'w3-left-align w3-opacity w3-small'><b>Arguments:</b></td></tr>
                                    <tr><td className = 'w3-left-align w3-text-theme'>
                                            <b><i>
                                                {
                                                    getParamNames(Mitsuketa[fxName]).map((param,i) => {
                                                        return(
                                                            <p 
                                                                name      = {fxName + '-argument-' + i}
                                                                key       = {fxName + '-argument-' + i}
                                                                className = 'w3-left-align w3-small'
                                                                style     = {{ paddingLeft : '15px', marginTop : '5px' }} >
                                                                    { param + ' ' + ' (' + Info[fxName].parameters.type[i] + ')'}
                                                                <br/>
                                                            </p>
                                                        );
                                                    })
                                                }
                                            </i></b>
                                        </td>
                                    </tr>
                                    <tr><td className = 'w3-left-align w3-opacity w3-small'><b>Returns:</b></td></tr>
                                    <tr><td className = 'w3-left-align w3-text-theme'>
                                            <b><i>
                                            <p 
                                                className = 'w3-left-align w3-small'
                                                style     = {{ 
                                                    paddingLeft : '15px',
                                                    marginTop : '5px'
                                                }}
                                            >
                                                { Info[fxName].result.type  + ' ' + ' (' + Info[fxName].result.name + ')'}
                                                <br/>
                                            </p>
                                            </i></b>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Example 
                                fxName = {fxName}
                            />
                        </div>
                    </div>
                    <div className = 'w3-col s1 m2 l3'>&nbsp;</div>
                </div>
            );
        });
        return (
            <div 
                name  = 'sections'
                id    = 'sections'
                style = {{ 
                    position  : 'relative',
                    overflowY : 'hidden'
                }}
            >
                {list}
            </div>
        );
    }
    render(){
        const { functionNames, sections } = this;
        return(
            <Page>
                <SideBar list = {functionNames} />
                {sections()}
            </Page>
        );
    }
}

export default Documentation;