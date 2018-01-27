import React, { Component } from 'react';
import Page                 from './page';

class GetStarted extends Component {
    render(){
        return(
            <Page>
                <div>

                    <div className = 'w3-container w3-content w3-center w3-padding-64' style = {{ maxWidth : '800px' }}>
                        <div className = 'w3-left-align'>
                            <h2 className = 'w3-wide'>Download</h2>
                            <p className = 'w3-justify'><span className = 'fa fa-download' style = {{ marginRight : '5px' }} />
                                <a 
                                className = 'w3-text-theme-dark w3-hover-text-theme'
                                href      = '/downloads/index.zip'
                                download>
                                Source Code Version (~5kB .zip)
                                </a>
                            </p>
                            <p className = 'w3-justify'>
                                {'Mitsuketa is released under the '}
                                <a 
                                className = 'w3-text-theme-dark w3-hover-text-theme'
                                href      = 'https://github.com/AndrewRedican/mitsuketa/blob/master/LICENSE.md'
                                rel       = 'license'
                                >MIT license</a>{' & supports modern environments.'}
                            </p>
                        </div>
                    </div>

                    <div className = 'w3-container w3-content w3-center w3-padding-32' style = {{ maxWidth : '800px' }}>
                        <div className = 'w3-left-align'>
                            <h2 className = 'w3-wide'>Installation</h2>
                            <p  className = 'w3-opacity'>In a browser:</p>
                            <pre
                                className = 'w3-theme-dark'
                                style = {{ margin : '10px 0px 10px 0px', padding : '10px' }}>
                                {'<script src=\'mitsuketa.js\'></script>'}
                            </pre>
                            <p  className = 'w3-opacity'>Using npm:</p>
                            <pre
                                className = 'w3-theme-dark'
                                style = {{ margin : '10px 0px 10px 0px', padding : '10px' }}>
                                {'$ npm i -g npm\n$ npm i --save mitsuketa'}
                            </pre>
                            <p  className = 'w3-opacity'>In Node.js:</p>
                            <pre
                                className = 'w3-theme-dark'
                                style = {{ margin : '10px 0px 10px 0px', padding : '10px' }}>
                                {'var mitsuketa = require(\'mitsuketa\');\n\n'} 
                                 <span style = {{ color : 'lightgreen'}}>{'\\\\Using ES6 \n'}</span>
                                {'import mitsuketa from \'mitsuketa\';\n\n'}
                                 <span style = {{ color : 'lightgreen'}}>{'\\\\Loading specific functions \n'}</span>
                                {'const { renameKeys } from \'mitsuketa\';'}
                            </pre>
                        </div>
                    </div>
                    
                    <div className = 'w3-container w3-content w3-center w3-padding-32' style = {{ maxWidth : '800px' }}>
                        <div className = 'w3-left-align'>
                            <h2 className = 'w3-wide'>Why Mitsuketa?</h2>
                            <p className = 'w3-justify'>Mitsuketa makes JavaScript easier by taking the hassle out of working with deeply nested data structures.
                            It allows you to perform certain operations on the fly, where otherwise a lot of iteration and validation would be 
                            necessary.</p>
                            <p className = 'w3-justify'>Consider the following scenario:</p>
                            <p className = 'w3-justify'>You would like to sync data from a particular api to your database. The data structure
                                of your database follows a particular design which is optimized for your web app needs. The payload received by the api on the other hand,
                                does not match the data structure of your database. Instead of potentially coding several instructions to iterate across multiple layers of
                                data to change the data, Mitsuketa comes to you aid. This toolkit lets you search, compare, edit, add, edit, remove, keys, values, or other
                                data structures within a larger, more complex collection of data.</p>
                        </div>
                    </div>

                    <div className = 'w3-container w3-content w3-center w3-padding-32' style = {{ maxWidth : '800px' }}>
                        <div className = 'w3-left-align'>
                            <h2 className = 'w3-wide'>Further Reading</h2>
                            <p className = 'w3-justify'><span className = 'fa fa-github-alt' style = {{ marginRight : '5px' }} />
                                <a 
                                    className = 'w3-text-theme-dark w3-hover-text-theme'
                                    href      = 'https://github.com/AndrewRedican/mitsuketa/blob/master/CONTRIBUTING.md'
                                    rel       = 'next'
                                    target    = '_blank'>
                                    Contributing
                                </a>
                            </p>
                            <p className = 'w3-justify'><span className = 'fa fa-github-alt' style = {{ marginRight : '5px' }} />
                                <a 
                                    className = 'w3-text-theme-dark w3-hover-text-theme'
                                    href      = 'https://github.com/AndrewRedican/mitsuketa/releases'
                                    rel       = 'next'
                                    target    = '_blank'>
                                    Release Notes
                                </a>
                            </p>
                            <p className = 'w3-justify'><span className = 'fa fa-github-alt' style = {{ marginRight : '5px' }} />
                                <a 
                                    className = 'w3-text-theme-dark w3-hover-text-theme'
                                    href      = 'https://github.com/AndrewRedican/mitsuketa/wiki'
                                    rel       = 'next'
                                    target    = '_blank'>
                                    Wiki (Changelog, Roadmap, etc.)
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className = 'w3-container w3-content w3-center w3-padding-32' style = {{ maxWidth : '800px' }}>
                        <div className = 'w3-left-align'>
                            <h2 className = 'w3-wide'>Support</h2>
                            <p className = 'w3-justify'>{'Tested in Chrome 54-55 and Node.js 6-7.'}</p>
                            <p className = 'w3-justify'>
                                <a 
                                    className = 'w3-text-theme-dark w3-hover-text-theme'
                                    href      = 'https://travis-ci.org/AndrewRedican/mitsuketa/builds'
                                    rel       = 'next'
                                    target    = '_blank'>
                                    CI</a>{' test runs are available.'}</p>
                        </div>
                    </div>

                </div>
            </Page>
        );
    }
}

export default GetStarted;