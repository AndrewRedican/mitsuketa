import React, { Component } from 'react';

class JSONInput extends Component {
    constructor(props){
        super(props);
        if(!('id' in this.props)) console.error('An \'id\' property must be specified. Must be unique');
        this.createMarkup       = this.createMarkup        .bind(this);
        this.onClick            = this.onClick             .bind(this);
        this.onBlur             = this.onBlur              .bind(this);
        this.update             = this.update              .bind(this);
        this.renderLabels       = this.renderLabels        .bind(this);
        this.renderErrorMessage = this.renderErrorMessage  .bind(this);
        this.onScroll           = this.onScroll            .bind(this);
        this.showPlaceholder    = this.showPlaceholder     .bind(this);
        this.tokenize           = this.tokenize            .bind(this);
        this.onKeyPress         = this.onKeyPress          .bind(this);
        this.onKeyDown          = this.onKeyDown           .bind(this);
        this.stopEvent          = this.stopEvent           .bind(this);
        let colors = {};
        if('colors' in this.props)
            colors = {
                default         : 'default'         in this.props.colors ? this.props.colors.default         : '#D4D4D4',
                string          : 'string'          in this.props.colors ? this.props.colors.string          : '#CE8453',
                number          : 'number'          in this.props.colors ? this.props.colors.number          : '#B5CE9F',
                colon           : 'colon'           in this.props.colors ? this.props.colors.colon           : '#49B8F7',
                keys            : 'keys'            in this.props.colors ? this.props.colors.keys            : '#9CDCFE',
                keys_whiteSpace : 'keys_whiteSpace' in this.props.colors ? this.props.colors.keys_whiteSpace : '#AF74A5',
                primitive       : 'primitive'       in this.props.colors ? this.props.colors.primitive       : '#6392C6',
                error           : 'error'           in this.props.colors ? this.props.colors.error           : '#ED0000'
            };
        else
            colors = {
                default         : '#D4D4D4',
                string          : '#CE8453',
                number          : '#B5CE9F',
                colon           : '#49B8F7',
                keys            : '#9CDCFE',
                keys_whiteSpace : '#AF74A5',
                primitive       : '#6392C6',
                error           : '#ED0000'
            };
        this.colors = colors;
        this.state  = { 
            preText     : '',
            markupText  : '',
            plainText   : '',
            json        : '',
            jsObject    : undefined,
            lines       : false,
            error       : false,
            focused     : false
        };
    }
    render(){
        const 
            markupText = this.state.markupText,
            error      = this.state.error,
            focused    = this.state.focused;
        const hasError = error ? error.token ? true : false : false;
        return (
            <div
                style = {{
                    display    : 'block',
                    overflow   : 'none',
                    height     : 'height' in this.props ? (parseInt(this.props.height.replace(/px/,'')) + 60) + 'px' : '610px',
                    width      : '479px',
                    margin     : 0,
                    boxSizing  : 'border-box',
                    overflow   : 'hidden',
                    fontFamily : 'Roboto, sans-serif'
                }}
            >
                <div
                    className = 'row text-left vertical-align-bottom'
                    style = {{
                        display         : 'block',
                        overflow        : 'none',
                        height          : '60px',
                        width           : '479px',
                        margin          : 0,
                        backgroundColor : 'colors' in this.props ? 'background' in this.props.colors ? this.props.colors.background : '#1E1E1E' : '#1E1E1E',
                        borderBottom    : '2px solid #f4433680'
                    }}
                >
                    <span
                        style = {{
                            display       : 'inline-block',
                            height        : '60px',
                            width         : '60px',
                            margin        : 0,
                            boxSizing     : 'border-box',
                            overflow      : 'hidden',
                            verticalAlign : 'top'
                        }} 
                    >
                        <div
                            style = {{
                                position : 'relative',
                                top      : 0,
                                left     : 0,
                                height   : '60px',
                                width    : '60px',
                                margin   : 0
                            }}
                        >
                            <div
                                style = {{
                                    position  : 'absolute',
                                    top       : '50%',
                                    left      : '50%',
                                    transform : 'translate(-50%, -50%)'
                                }}
                            >
                                <svg
                                    height = '25px'
                                    width  = '25px'
                                    viewBox = '0 0 100 100'
                                >
                                    {
                                        hasError ?
                                            <path 
                                                fillRule ='evenodd'
                                                clipRule ='evenodd'
                                                fill     = 'red'
                                                d        = 'M73.9,5.75c0.467-0.467,1.067-0.7,1.8-0.7c0.7,0,1.283,0.233,1.75,0.7l16.8,16.8  c0.467,0.5,0.7,1.084,0.7,1.75c0,0.733-0.233,1.334-0.7,1.801L70.35,50l23.9,23.95c0.5,0.467,0.75,1.066,0.75,1.8  c0,0.667-0.25,1.25-0.75,1.75l-16.8,16.75c-0.534,0.467-1.117,0.7-1.75,0.7s-1.233-0.233-1.8-0.7L50,70.351L26.1,94.25  c-0.567,0.467-1.167,0.7-1.8,0.7c-0.667,0-1.283-0.233-1.85-0.7L5.75,77.5C5.25,77,5,76.417,5,75.75c0-0.733,0.25-1.333,0.75-1.8  L29.65,50L5.75,26.101C5.25,25.667,5,25.066,5,24.3c0-0.666,0.25-1.25,0.75-1.75l16.8-16.8c0.467-0.467,1.05-0.7,1.75-0.7  c0.733,0,1.333,0.233,1.8,0.7L50,29.65L73.9,5.75z'
                                            />
                                        :
                                            <path
                                                fillRule = 'evenodd' 
                                                clipRule = 'evenodd'
                                                fill     = 'green'
                                                d='M39.363,79L16,55.49l11.347-11.419L39.694,56.49L72.983,23L84,34.085L39.363,79z'
                                            />
                                    }
                                </svg>
                            </div>
                        </div>
                    </span>
                    <span
                        style = {{
                            display       : 'inline-block',
                            height        : '60px',
                            width         : '419px',
                            margin        : 0,
                            overflow      : 'hidden',
                            verticalAlign : 'top',
                            position      : 'absolute'
                        }}    
                    >
                        { this.renderErrorMessage() }
                    </span>
                </div>
                <div
                    className = 'row'
                    style = {{
                        display         : 'block',
                        overflow        : 'none',
                        height          : 'height' in this.props ? this.props.height : '550px',
                        width           : '479px',
                        margin          : 0,
                        resize          : 'none',
                        fontFamily      : 'Roboto Mono, Monaco, monospace',
                        fontSize        : '11px',
                        backgroundColor : 'colors' in this.props ? 'background' in this.props.colors ? this.props.colors.background : '#1E1E1E' : '#1E1E1E'
                    }}
                >
                    <div
                        id = {'ared7_jsonviewer_labels' + this.props.id}
                        style = {{
                            display   : 'inline-block',
                            boxSizing : 'border-box',
                            height    : '100%',
                            width     : '9%',
                            margin    : 0,
                            padding   : '5px 0px 5px 10px',
                            overflow  : 'hidden',
                            color     : '#D4D4D4'
                        }}
                    >
                    { this.renderLabels() }
                    </div>
                    <div
                        id = {'ared7_jsonviewer_body' + this.props.id}
                        contentEditable = { true }  
                        style = {{
                            display    : 'inline-block',
                            boxSizing  : 'border-box',
                            height     : '100%',
                            width      : '91%',
                            margin     : 0,
                            padding    : '5px',
                            overflowX  : 'hidden',
                            overflowY  : 'auto',
                            wordWrap   : 'break-word',
                            whiteSpace : 'pre-line',
                            color      : '#D4D4D4',
                            outline    : 'none'
                        }}
                        dangerouslySetInnerHTML = { this.createMarkup(markupText) }
                        onKeyPress     = { this.onKeyPress }
                        onKeyDown      = { this.onKeyDown }
                        onClick        = { this.onClick }
                        onBlur         = { this.onBlur }
                        onScroll       = { this.onScroll }
                        autoComplete   = 'off'
                        autoCorrect    = 'off' 
                        autoCapitalize = 'off'
                        spellCheck     = { false }
                    />
                </div>
            </div>
        );
    }
    renderErrorMessage(){
        const error = this.state.error;
        if(!error) return void(0);
        return (
            <p
                style = {{
                    color          : 'red',
                    fontSize       : '12px',
                    position       : 'absolute',
                    width          : '419px',
                    height         : '60px',
                    boxSizing      : 'border-box',
                    margin         : 0,
                    padding        : 0,
                    paddingRight   : '10px',
                    overflowWrap   : 'break-word',
                    display        : 'flex',
                    flexDirection  : 'column',
                    justifyContent : 'center'
                }}
            >
            { error.reason + ' at line ' + error.line }
            </p>
        );
    }
    renderLabels(){
        let 
            lines = this.state.lines,
            error = this.state.error;

        let line;
        if(error) line = error.line;
        if([null,undefined,false,0,''].indexOf(lines)>-1) lines = 1;
        let labels = new Array(lines);
        for(var i = 0; i < lines - 1; i++) labels[i] = i;
        return labels.map( i => {
            if(i!==line-1)
            return (
                <div 
                    key = {'line ' + (i + 1)}
                    id  = {'line ' + (i + 1)}
                >
                    {i + 1}
                </div>
            );
            return (
                <div 
                    key = {'line ' + (i + 1)}
                    id  = {'line ' + (i + 1)}
                    style = {{
                        color: 'red'
                    }}
                >
                    {i + 1}
                </div>
            );
        });
    }
    createMarkup(markupText){ return { __html: '' + markupText }; }
    update(){
        const
            container = document.getElementById('ared7_jsonviewer_body' + this.props.id),
            data      = this.tokenize(container);   
        this.setState({
            plainText  : data.indentation,
            markupText : data.markup,
            json       : data.json,
            jsObject   : data.jsObject,
            lines      : data.lines, 
            error      : data.error
        });
    }
    stopEvent(event){

    }
    onKeyPress(event){
        console.log(event);
    }
    onKeyDown(event){
        console.log(event);
    }
    onClick(){ 
        if('viewOnly' in this.props) if(this.props.viewOnly) return;
        this.state = { focused : true };
    }
    onBlur(){
        if('viewOnly' in this.props) if(this.props.viewOnly) return;
        if(this.state.focused) this.update();
    }
    onScroll(event){
        var labels = document.getElementById('ared7_jsonviewer_labels' + this.props.id);
        labels.scrollTop = event.target.scrollTop;
    }
    componentDidUpdate(){ this.showPlaceholder(); }
    componentDidMount(){
        document.getElementById('ared7_jsonviewer_body' + this.props.id).addEventListener('paste', e => {
            e.preventDefault();
            var text = e.clipboardData.getData('text/plain');
            document.execCommand('insertHTML', false, text);
        });
        this.showPlaceholder();
    }
    showPlaceholder(){
        const preText = this.state.preText;
        if(!('placeholder' in this.props)) return;
        const placeholder = this.props.placeholder;
        if(preText===placeholder) return;
        if(typeof placeholder !== 'object') return console.error('placeholder in props is not an object:',placeholder);
        const data = this.tokenize(placeholder);
        this.setState({
            preText    : placeholder,
            plainText  : data.indentation,
            markupText : data.markup,
            lines      : data.lines, 
            error      : data.error
        });
    }
    tokenize(something){
        if(typeof something !== 'object') return console.error('tokenize() expects object type properties only. Got \'' + typeof something + '\' type instead.');

        /**
         *     DOM NODE || ONBLUR OR UPDATE
         */

        if('nodeType' in something){
            const
                containerNode = something.cloneNode(true),
                hasChildren   = containerNode.hasChildNodes();
            if(!hasChildren) return '';
            const children = containerNode.childNodes;
            
            let buffer = {
                tokens_unknown   : [],
                tokens_proto     : [],
                tokens_split     : [],
                tokens_fallback  : [],
                tokens_normalize : [],
                tokens_merge     : [],
                tokens_plainText : '',
                indented         : '',
                json             : '',
                jsObject         : undefined,
                markup           : ''
            }
            children.forEach(function(child,i){
                let info = {};
                switch(child.nodeName){
                    case 'SPAN' :
                        info = {
                            string : child.textContent,
                            type   : child.attributes.type.textContent
                        };  
                        buffer.tokens_unknown.push(info);
                    case 'BR' :
                        if(child.textContent==='')
                        buffer.tokens_unknown.push({ string : '\n', type : 'unknown' });
                    break;
                    case '#text' :
                        buffer.tokens_unknown.push({ string : child.wholeText, type : 'unknown' });
                    break;
                    default : break;
                }
            });
            function quarkize(text,prefix=''){
                let
                    buffer = {
                        active    : false,
                        string    : '',
                        number    : '',
                        symbol    : '',
                        space     : '',
                        delimiter : '', 
                        quarks    : []
                    };  
                function pushAndStore(char,type){
                    switch(type){
                        case 'symbol' : case 'delimiter' :
                            if(buffer.active) buffer.quarks.push({
                                string : buffer[buffer.active],
                                type   : prefix + '-' + buffer.active
                            });
                            buffer[buffer.active] = '';
                            buffer.active  = type;
                            buffer[buffer.active] = char;
                        break;
                        default :
                            if(type===buffer.active) buffer[type] += char;
                            else {
                                if(buffer.active) buffer.quarks.push({
                                    string : buffer[buffer.active],
                                    type   : prefix + '-' + buffer.active
                                });
                                buffer[buffer.active] = '';
                                buffer.active  = type;
                                buffer[buffer.active] = char;
                            }
                        break;
                    }
                }
                function finalPush(){
                    if(buffer.active){
                        buffer.quarks.push({
                            string : buffer[buffer.active],
                            type   : prefix + '-' + buffer.active
                        });
                        buffer[buffer.active] = '';
                        buffer.active = false;
                    }
                }
                for(var i = 0; i < text.length; i++){
                    const char = text.charAt(i);
                    switch(char){
                        case '"'  : case "'" :       pushAndStore(char,'delimiter'); break;
                        case ' '  : case '\u00A0' :  pushAndStore(char,'space');     break;
                        case '{'  : case '}' :
                        case '['  : case ']' :
                        case ':'  : case ',' :       pushAndStore(char,'symbol');    break;
                        case '0'  : case '1' :
                        case '2'  : case '3' :
                        case '4'  : case '5' :
                        case '6'  : case '7' :
                        case '8'  : case '9' :       pushAndStore(char,'number');    break;
                        case '-'  :
                            if(i < text.length - 1)
                            if('0123456789'.indexOf(text.charAt(i + 1)) > -1){
                                pushAndStore(char,'number');
                                break;
                            }
                        case '.' :
                            if(i < text.length - 1 && i > 0)
                            if( 
                                '0123456789'.indexOf(text.charAt(i + 1)) > -1 &&
                                '0123456789'.indexOf(text.charAt(i - 1)) > -1
                            ){
                                pushAndStore(char,'number');
                                break;
                            }
                        default : pushAndStore(char,'string'); break;
                    }
                }
                finalPush();
                return buffer.quarks;
            }
            buffer.tokens_unknown.forEach( function(token,i) {
                if(['unknown','error'].indexOf(token.type) === -1) buffer.tokens_proto.push(token);
                else buffer.tokens_proto = buffer.tokens_proto.concat(quarkize(token.string,'proto'));                
            });
            function validToken(string,type){
                const quotes = '\'"';
                let 
                    firstChar = '',
                    lastChar  = '',
                    quoteType = false;
                switch(type){
                    case 'primitive' : if(['true','false','null','undefined'].indexOf(string)===-1) return false; break;
                    case 'string' :
                        if(string.length < 2) return false;
                        firstChar = string.charAt(0),
                        lastChar  = string.charAt(string.length-1),
                        quoteType = quotes.indexOf(firstChar);
                        if(quoteType===-1)       return false;
                        if(firstChar!==lastChar) return false;
                        for(var i = 0; i < string.length; i++){
                            if(i > 0 && i < string.length - 1)
                            if(string.charAt(i)===quotes[quoteType])
                            if(string.charAt(i - 1)!=='\\')
                            return false;
                        }
                    break;
                    case 'key' :
                        if(string.length===0) return false;
                        firstChar = string.charAt(0),
                        lastChar  = string.charAt(string.length-1),
                        quoteType = quotes.indexOf(firstChar);
                        if(quoteType > -1){
                            if(string.length===1) return false;
                            if(firstChar!==lastChar) return false;
                            for(var i = 0; i < string.length; i++){
                                if(i > 0 && i < string.length - 1)
                                if(string.charAt(i)===quotes[quoteType])
                                if(string.charAt(i - 1)!=='\\')
                                return false;
                            }
                        } else {
                            const nonAlphanumeric = '\'"`.,:;{}[]&<>=~*%<>\\|/-+!?@^ \xa0';
                            for(var i = 0; i < nonAlphanumeric.length; i++){
                                const nonAlpha = nonAlphanumeric.charAt(i);
                                if(string.indexOf(nonAlpha) > -1) return false;
                            }
                        }
                    break;
                    case 'number' :
                        for(var i = 0; i < string.length ; i++){
                            if('0123456789'.indexOf(string.charAt(i))===-1)
                            if(i===0){
                                if('-'!==string.charAt(0)) return false;
                            }
                            else if('.'!==string.charAt(i)) return false;
                        }
                    break;
                    case 'symbol' : 
                        if(string.length > 1) return false;
                        if('{[:]},'.indexOf(string)===-1) return false;
                    break;
                    case 'colon' :
                        if(string.length > 1) return false;
                        if(':'!==string) return false;
                    break;
                    default : return true; break;
                }
                return true;
            }
            buffer.tokens_proto.forEach( function(token,i) {
                if(token.type.indexOf('proto')===-1){
                    if(!validToken(token.string,token.type)){
                        buffer.tokens_split = buffer.tokens_split.concat(quarkize(token.string,'split'));
                    } else buffer.tokens_split.push(token);
                } else buffer.tokens_split.push(token);
            });
            buffer.tokens_split.forEach( function(token) {
                let
                    type     = token.type,
                    string   = token.string,
                    length   = string.length,
                    fallback = [];
                if(type.indexOf('-') > -1){
                    type = type.slice(type.indexOf('-') + 1);
                    if(type!=='string') fallback.push('string');
                    fallback.push('key');
                    fallback.push('error');
                }
                let tokul = {
                    string   : string,
                    length   : length,
                    type     : type,
                    fallback : fallback 
                };
                buffer.tokens_fallback.push(tokul);
            });
            function tokenFollowed(){
                const last = buffer.tokens_normalize.length - 1;
                if(last<1) return false;
                for(var i = last; i >= 0; i--){
                    const previousToken = buffer.tokens_normalize[i];
                    switch(previousToken.type){
                        case 'space' : case 'linebreak' : break;
                        default : return previousToken; break;
                    }
                }
                return false;
            }
            let buffer2 = {
                brackets   : [],
                stringOpen : false,
                isValue    : false
            };
            buffer.tokens_fallback.forEach( function(token,i) {
                const
                    type   = token.type,
                    string = token.string;
                let normalToken = {
                    type   : type,
                    string : string
                };
                switch(type){
                    case 'symbol' : case 'colon' :
                        if(buffer2.stringOpen){
                            if(buffer2.isValue) normalToken.type = 'string';
                            else normalToken.type = 'key';
                            break;
                        }
                        switch(string){
                            case '[' : case '{' : 
                                buffer2.brackets.push(string);
                                buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1]==='[';
                            break;
                            case ']' : case '}' :
                                buffer2.brackets.pop();
                                buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1]==='[';
                            break;
                            case ',' :
                                if(tokenFollowed().type==='colon') break;
                                buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1]==='[';
                            break;
                            case ':' :
                                normalToken.type = 'colon';
                                buffer2.isValue = true;
                            break;
                        }
                    break;
                    case 'delimiter' :
                        if(buffer2.isValue) normalToken.type = 'string';
                        else normalToken.type = 'key';
                        if(!buffer2.stringOpen){ buffer2.stringOpen = string; break; }
                        if(i > 0){
                            const
                                previousToken = buffer.tokens_fallback[i - 1],
                                _string       = previousToken.string,
                                _type         = previousToken.type,
                                _char         = _string.charAt(_string.length - 1);
                            if(_type==='string' && _char==='\\') break;
                        }
                        if(buffer2.stringOpen===string){ buffer2.stringOpen = false; break; }
                    break;
                    case 'primitive' : case 'string' :
                        if(['false','true','null','undefined'].indexOf(string) > -1){
                            normalToken.type = 'primitive';
                            break;
                        }
                        if(string==='\n') if(!buffer2.stringOpen){
                            normalToken.type = 'linebreak';
                            break;
                        }
                        if(buffer2.isValue) normalToken.type = 'string';
                        else normalToken.type = 'key';
                    break;
                    case 'space' :
                        if(buffer2.stringOpen)
                        if(buffer2.isValue) normalToken.type = 'string';
                        else normalToken.type = 'key';
                        break;
                    case 'number' :
                        if(buffer2.stringOpen)
                        if(buffer2.isValue) normalToken.type = 'string';
                        else normalToken.type = 'key';
                        break;
                    default :
                    
                    break;
                }
                buffer.tokens_normalize.push(normalToken);
            });
            for(var i = 0; i < buffer.tokens_normalize.length; i++){
                const token = buffer.tokens_normalize[i];
                let mergedToken = {
                    string  : token.string,
                    type    : token.type,
                    tokens  : [i]
                };
                if(['symbol','colon'].indexOf(token.type)===-1)
                if(i + 1 < buffer.tokens_normalize.length){
                    let count = 0;
                    for(var u = i + 1; u < buffer.tokens_normalize.length; u++){
                        const nextToken = buffer.tokens_normalize[u];
                        if(token.type!==nextToken.type) break;
                        mergedToken.string += nextToken.string;
                        mergedToken.tokens.push(u);
                        count++;
                    }
                    i += count;
                }
                buffer.tokens_merge.push(mergedToken);
            }
            /**
             * 
             * 
             * 
             * 
             * 
             * 
             * 
             * 
             * 
             * 
             * 
             * 
             * 
             * 
             */
            const 
                quotes = '\'"',
                alphanumeric = (
                    'abcdefghijklmnopqrstuvwxyz' +
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                    '0123456789' +
                    '_$'
                );
            var
                error = false,
                line  = buffer.tokens_merge.length > 0 ? 1 : 0;
            buffer2 = {
                brackets   : [],
                stringOpen : false,
                isValue    : false
            };
            function setError(tokenID,reason,offset=0){
                error = {
                    token  : tokenID,
                    line   : line,
                    reason : reason
                };
                buffer.tokens_merge[tokenID+offset].type = 'error';
            }
            function followedBySymbol(tokenID,options){
                if(tokenID===undefined) console.error('tokenID argument must be an integer.');
                if(options===undefined) console.error('options argument must be an array.');
                if(tokenID===buffer.tokens_merge.length-1) return false;
                for(var i = tokenID + 1; i < buffer.tokens_merge.length; i++){
                    const nextToken = buffer.tokens_merge[i];
                    switch(nextToken.type){
                        case 'space' : case 'linebreak' : break;
                        case 'symbol' : case 'colon' :
                            if(options.indexOf(nextToken.string)>-1) return i;
                            else return false;
                        break;
                        default : return false; break;
                    }
                }
                return false;
            }
            function followsSymbol(tokenID,options){
                if(tokenID===undefined) console.error('tokenID argument must be an integer.');
                if(options===undefined) console.error('options argument must be an array.');
                if(tokenID===0) return false;
                for(var i = tokenID - 1; i >= 0; i--){
                    const previousToken = buffer.tokens_merge[i];
                    switch(previousToken.type){
                        case 'space' : case 'linebreak' : break;
                        case 'symbol' : case 'colon' :
                            if(options.indexOf(previousToken.string)>-1) return true;
                            return false;
                        break;
                        default : return false; break;
                    }
                }
                return false;
            }
            function typeFollowed(tokenID){
                if(tokenID===undefined) console.error('tokenID argument must be an integer.');
                if(tokenID===0) return false;
                for(var i = tokenID - 1; i >= 0; i--){
                    const previousToken = buffer.tokens_merge[i];
                    switch(previousToken.type){
                        case 'space' : case 'linebreak' : break;
                        default : return previousToken.type; break;
                    }
                }
                return false;
            }
            let bracketList = [];
            for(var i = 0; i < buffer.tokens_merge.length; i++){
                if(error) break;
                let
                    token  = buffer.tokens_merge[i],
                    string = token.string,
                    type   = token.type,
                    found  = false;
                switch(type){
                    case 'space' : break;
                    case 'linebreak' : line++; break;
                    case 'symbol' :
                        switch(string){
                            case '{' : case '[' : 
                                found = followsSymbol(i,['}',']']);
                                if(found){
                                    setError(i,'\'' + buffer.tokens_merge[found].string + '\' token cannot be followed by \'' + string + '\' token');
                                    break;
                                }
                                if(string==='['&&i>0)
                                if(!followsSymbol(i,[':','[',','])){
                                    setError(i,'\'[\' token can only follow \':\', \'[\', and \',\' tokens');
                                    break;
                                }
                                if(string==='{')
                                if(followsSymbol(i,['{'])){
                                    setError(i,'\'{\' token cannot follow another \'{\' token');
                                    break;
                                }
                                buffer2.brackets.push(string);
                                buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1]==='[';
                                bracketList.push({ i : i, line : line, string : string });
                            break;
                            case '}' : case ']' :
                                if(string==='}')
                                if(buffer2.brackets[buffer2.brackets.length-1]!=='{'){
                                    setError(i,'Missing \'{\' open curly brace');
                                    break;
                                }
                                if(string==='}')
                                if(followsSymbol(i,[','])){
                                    setError(i,'\'}\' token cannot follow a comma');
                                    break;
                                }
                                if(string===']')
                                if(buffer2.brackets[buffer2.brackets.length-1]!=='['){
                                    setError(i,'Missing \'[\' open brace');
                                    break;
                                }
                                if(string===']')
                                if(followsSymbol(i,[':'])){
                                    setError(i,'\']\' token cannot follow a colon');
                                    break;
                                }
                                buffer2.brackets.pop();
                                buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1]==='[';
                                bracketList.push({ i : i, line : line, string : string });
                            break;
                            case ',' :
                                found = followsSymbol(i,['{']);
                                if(found){
                                    if(followedBySymbol(i,['}'])){
                                        setError(i,'Comma can only be wrapped by brackets');
                                        break;
                                    }
                                    setError(i,'Comma cannot follow \'{\' token');
                                    break;
                                }
                                if(followedBySymbol(i,['}',',',']'])){
                                    setError(i,'Values are always specified. Comma cannot be followed by \'}\', \']\' tokens or another comma');
                                    break;
                                }
                                found = typeFollowed(i);
                                switch(found){
                                    case 'key' : case 'colon' :
                                        setError(i,'Comma cannot follow ' + found);
                                        break;
                                    break;
                                    case 'symbol' :
                                        if(followsSymbol(i,['{'])){
                                            setError(i,'Comma cannot follow \'{\' token');
                                            break;
                                        }
                                    break;
                                    default : break;
                                }
                                buffer2.isValue = buffer2.brackets[buffer2.brackets.length - 1]==='[';
                            break;
                            default : break;
                        }
                        buffer.json += string;
                    break;
                    case 'colon' :
                        found = followsSymbol(i,['[']);
                        if(found&&followedBySymbol(i,[']'])){
                            setError(i,'Colon can only be wrapped by curly brackets');
                            break;
                        }
                        if(found){
                            setError(i,'Colon cannot follow \'[\' token');
                            break;
                        }
                        if(typeFollowed(i)!=='key'){
                            setError(i,'Colon can only follow key');
                            break;
                        }
                        buffer2.isValue = true;
                        buffer.json += string;
                    break;
                    case 'key' : case 'string' :
                        let
                            firstChar     = string.charAt(0),
                            lastChar      = string.charAt(string.length - 1),
                            quote_primary = quotes.indexOf(firstChar);
                        if(quotes.indexOf(firstChar)===-1)
                        if(quotes.indexOf(lastChar)!==-1){
                            setError(i,'Missing opening ' + lastChar + ' quote on ' + type);
                            break;
                        }
                        if(quotes.indexOf(lastChar)===-1)
                        if(quotes.indexOf(firstChar)!==-1){
                            setError(i,'Missing closing ' + firstChar + ' quote on ' + type);
                            break;
                        }
                        if(quotes.indexOf(firstChar)>-1)
                        if(firstChar!==lastChar){
                            setError(i,'Missing closing ' + firstChar + ' quote on ' + type);
                            break;
                        }
                        if('string'===type)
                        if(quotes.indexOf(firstChar)===-1 && quotes.indexOf(lastChar)===-1){
                            setError(i,'String must be wrapped by quotes');
                            break;
                        }
                        if('key'===type)
                        if(quotes.indexOf(firstChar)>-1)
                        if(string.length<=2){
                            setError(i,'Key cannot be an empty string');
                            break;
                        }
                        if('key'===type)
                        if(quotes.indexOf(firstChar)===-1 && quotes.indexOf(lastChar)===-1)
                        for(var h = 0; h < string.length; h++){
                            if(error) break;
                            const c = string.charAt(h);
                            if(alphanumeric.indexOf(c)===-1){
                                setError(i,'Non-alphanemeric token \'' + c + '\' is not allowed outside string notation');
                                break;
                            }
                        }
                        if(firstChar==="'") string = '"' + string.slice(1,-1) + '"';
                        else if (firstChar!=='"') string = '"' + string + '"';
                        if('key'===type)
                        if('key'===typeFollowed(i)){
                            setError(i,'Key containing space must be wrapped by quotes');
                            break;
                        }
                        if('key'===type)
                        if(!followsSymbol(i,['{',','])){
                            setError(i,'Key can only follow \'{\' or \',\' tokens');
                            break;
                        }
                        if('string'===type)
                        if(!followsSymbol(i,['[',':',','])){
                            setError(i,type + ' can only follow \'[\' \':\' \',\' tokens');
                            break;
                        }
                        if('key'===type)
                        if(buffer2.isValue){
                            setError(i,'Unexpected key found at value position');
                            break;
                        }
                        if('string'===type)
                        if(!buffer2.isValue){
                            setError(i,'Unexpected string found at key position');
                            break;
                        }
                        buffer.json += string;
                    break;
                    case 'number' : case 'primitive' :
                        if(!followsSymbol(i,['[',':',','])){
                            setError(i,type + ' can only follow \'[\' \':\' \',\' tokens');
                            break;
                        }
                        if(!buffer2.isValue){
                            setError(i,'Unexpected ' + type + ' found at key position');
                            break;
                        }
                        if(type==='primitive')
                        if(string==='undefined')
                        setError(i,'\'undefined\' token is not accepted. Use \'null\' token instead');
                        buffer.json += string;
                    break;
                }
            }
            if(!error){
                const maxIterations = Math.ceil(bracketList.length / 2);
                let 
                    round = 0,
                    delta = false;
                function removePair(index){
                    bracketList.splice(index + 1,1);
                    bracketList.splice(index,1);
                    if(!delta) delta = true;
                }
                while(bracketList.length>0){
                    delta = false;
                    for(var tokenCount = 0; tokenCount < bracketList.length - 1; tokenCount++){
                        const pair = bracketList[tokenCount].string + bracketList[tokenCount+1].string;
                        if(['[]','{}'].indexOf(pair)>-1) removePair(tokenCount);
                    }
                    round++;
                    if(!delta) break;
                    if(round>=maxIterations) break;
                }
                if(bracketList.length>0){
                    const
                        _tokenString        = bracketList[0].string,
                        _tokenPosition      = bracketList[0].i,
                        _closingBracketType = _tokenString==='['?']':'}';
                    line = bracketList[0].line;
                    setError(_tokenPosition,'\'' + _tokenString + '\' token is missing closing \'' + _closingBracketType + '\' token');
                }
            }
            if(!error)
            try{ buffer.jsObject = JSON.parse(buffer.json); }
            catch(err){
                const 
                    errorMessage = err.message,
                    subsMark   = errorMessage.indexOf('position');
                if(subsMark===-1) throw new Error('Error parsing failed');
                const
                    errPositionStr = errorMessage.substring(subsMark + 9,errorMessage.length),
                    errPosition    = parseInt(errPositionStr);
                let
                    charTotal  = 0,
                    tokenIndex = 0,
                    token      = false,
                    _line      = 1;
                while(charTotal < errPosition){
                    token = buffer.tokens_merge[tokenIndex];
                    if('linebreak'===token.type) _line++;
                    if(['space','linebreak'].indexOf(token.type)===-1) charTotal += token.string.length;
                    if(charTotal >= errPosition) break;
                    tokenIndex++;
                }
                line = _line;
                setError(tokenIndex,'Unexpected token \'' + token.string + '\' found');
            }
            if(error) buffer.json = undefined;
            if(!error){
                /**
                 * Adjust spacing
                 * Check Depth
                 * 
                 * Space add at end of key should not create an error based on depth
                 */
                let depth = 0;
                buffer.tokens_merge.forEach( function(token,i) {
                    switch(token.type){
                        case 'symbol' :
                            switch(token.string){
                                case '[' : case '{' : depth++; break;
                                case ']' : case '}' : depth--; break;
                                default : break;
                            }
                        break;
                        case 'space' :
                            /**
                             * Count spaces,
                             * adjust if too much or too little
                             * make sure not to adjust different the space between key colon value
                             */
                            //buffer.tokens_merge[i] = '';
                            //console.log('depth:',depth,'space string:',token.string.length);
                        default : break;
                    }
                });
            }

            const colors = this.colors;
            let
                _line   = 1,
                _depth  = 0;
            function newSpan(token, colors){
                const
                    type   = token.type,
                    string = token.string;
                let color = '';
                switch(type){
                    case 'string' : case 'number' : case 'primitive' : case 'error' :     color = colors[token.type]; break;
                    case 'key'    : if(string===' ') color = colors.keys_whiteSpace; else color = colors.keys;        break;
                    case 'symbol' : if(string===':') color = colors.colon;           else color = colors.default;     break;
                    default : color = colors.default; break;
                }
                return (
                    '<span id="' + i + 
                        '" type="'  + type  + 
                        '" value="' + string + 
                        '" depth="' + _depth + 
                        '" style="color:' + color +
                    '">' + string + '</span>'
                );
            }
            function newIndent(){
                var space = []; 
                for (var i = 0; i < _depth * 2; i++) space.push('&nbsp;'); 
                return space.join('');
            }
            function newLineBreak(byPass=false){
                _line++;
                if(_depth > 0 || byPass){ return '<br>'; }
                return '';
            }
            function newLineBreakAndIndent(byPass=false){ 
                return newLineBreak(byPass) + newIndent();
            };
            for(var i = 0; i < buffer.tokens_merge.length; i++){
                const
                    token  = buffer.tokens_merge[i],
                    string = token.string,
                    type   = token.type;
                switch(type){
                    case 'space' : case 'linebreak' : break;
                    case 'string' : case 'number'    : case 'primitive' : case 'error' : 
                        buffer.markup += ((followsSymbol(i,[',','[']) ? newLineBreakAndIndent() : '') + newSpan(token,colors)); 
                    break;
                    case 'key' :
                        buffer.markup += (newLineBreakAndIndent() + newSpan(token,colors));
                    break;
                    case 'colon' :
                        buffer.markup += (newSpan(token,colors) + '&nbsp;');
                    break;
                    case 'symbol' :
                        switch(string){
                            case '[' : case '{' :
                                buffer.markup += ((!followsSymbol(i,[':']) ? newLineBreakAndIndent() : '') + newSpan(token,colors)); _depth++;
                            break;
                            case ']' : case '}' :
                                _depth--;
                                const
                                    islastToken  = i === buffer.tokens_merge.length - 1,
                                    _adjustment = i > 0 ? ['[','{'].indexOf(buffer.tokens_merge[i-1].string)>-1  ? '' : newLineBreakAndIndent(islastToken) : '';
                                buffer.markup += (_adjustment + newSpan(token,colors));
                            break;
                            case ',' :
                                buffer.markup += newSpan(token,colors);
                            break;
                        }
                    break;
                }
            }
            buffer.tokens_merge.forEach( function(token) { buffer.indented += token.string; });
            return {
                tokens   : buffer.tokens_merge,
                noSpaces : buffer.tokens_plainText,
                indented : buffer.indented,
                json     : buffer.json,
                jsObject : buffer.jsObject,
                markup   : buffer.markup,
                lines    : _line,
                error    : error
            };
        };

        /**
         *     JS OBJECTS || PLACEHOLDER
         */

        if(!('nodeType' in something)){
            let buffer = {
                inputText       : JSON.stringify(something),
                position        : 0,
                currentChar     : '',
                tokenPrimary    : '',
                tokenSecondary  : '',
                brackets        : [],
                isValue         : false,
                stringOpen      : false,
                stringStart     : 0,
                tokens          : []
            };
            function escape_character(){
                if(buffer.currentChar!=='\\') return false;
                buffer.inputText = deleteCharAt(buffer.inputText,buffer.position);
                return true;
            }
            function deleteCharAt(string,position){
                return string.slice(0, position) + string.slice(position + 1);
            }
            function determine_string(){
                if('\'"'.indexOf(buffer.currentChar)===-1) return false;
                if(!buffer.stringOpen){ 
                    add_tokenSecondary();
                    buffer.stringStart = buffer.position;
                    buffer.stringOpen = buffer.currentChar;
                    return true;
                }
                if(buffer.stringOpen===buffer.currentChar){ 
                    add_tokenSecondary();
                    const stringToken = buffer.inputText.substring(buffer.stringStart,buffer.position + 1);
                    add_tokenPrimary(stringToken);
                    buffer.stringOpen = false;
                    return true;
                }
                return false;
            }
            function determine_value(){
                if(':,{}[]'.indexOf(buffer.currentChar)===-1) return false;
                if(buffer.stringOpen) return false;
                add_tokenSecondary();
                add_tokenPrimary(buffer.currentChar);
                switch(buffer.currentChar){
                    case ':' : buffer.isValue = true; return true; break; 
                    case '{' : case '[' : buffer.brackets.push(buffer.currentChar); break;
                    case '}' : case ']' : buffer.brackets.pop(); break;
                }
                if(buffer.currentChar!==':') buffer.isValue = (buffer.brackets[buffer.brackets.length-1]==='[');
                return true;
            }
            function add_tokenSecondary(){
                if(buffer.tokenSecondary.length===0) return false;
                buffer.tokens.push(buffer.tokenSecondary);
                buffer.tokenSecondary = '';
                return true;
            }
            function add_tokenPrimary(value){
                if(value.length===0) return false;
                buffer.tokens.push(value);
                return true;
            }
            for(var i = 0; i < buffer.inputText.length; i++){
                buffer.position = i;
                buffer.currentChar = buffer.inputText.charAt(buffer.position);
                const
                    a = determine_value(),
                    b = determine_string(),
                    c = escape_character();
                if(!a&&!b&&!c) if(!buffer.stringOpen) buffer.tokenSecondary += buffer.currentChar;
            }
            let buffer2 = { brackets : [], isValue : false, tokens: [] };
            buffer2.tokens = buffer.tokens.map( token => {
                let
                    type   = '',
                    string = '',
                    value  = '';
                switch(token){
                    case ',' : 
                        type   = 'symbol';
                        string = token;
                        value  = token;
                        buffer2.isValue = (buffer2.brackets[buffer2.brackets.length-1]==='[');
                        break;
                    case ':' : 
                        type   = 'symbol';
                        string = token;
                        value  = token;
                        buffer2.isValue = true;
                        break; 
                    case '{' : case '[' : 
                        type   = 'symbol';
                        string = token;
                        value  = token;
                        buffer2.brackets.push(token);
                        buffer2.isValue = (buffer2.brackets[buffer2.brackets.length-1]==='[');
                        break;
                    case '}' : case ']' : 
                        type   = 'symbol';
                        string = token;
                        value  = token;
                        buffer2.brackets.pop();
                        buffer2.isValue = (buffer2.brackets[buffer2.brackets.length-1]==='[');
                        break;
                    case 'undefined' :
                        type   = 'primitive';
                        string = token;
                        value  = undefined;
                        break;
                    case 'null' :
                        type   = 'primitive';
                        string = token;
                        value  = null;
                        break;
                    case 'false' :
                        type   = 'primitive';
                        string = token;
                        value  = false;
                        break;
                    case 'true' :
                        type   = 'primitive';
                        string = token;
                        value  = true;
                        break;
                    default :
                        const C = token.charAt(0);
                        if('\'"'.indexOf(C) > -1){
                            if(buffer2.isValue) type = 'string'; else type = 'key';
                            string = token.slice(1, -1);
                            if(type==='key')
                            if(string.indexOf(' ') > -1) string = "'" + string + "'";
                            if(type==='string')
                            if(string.indexOf("'") > -1) string = '"' + string + '"';
                            else string = "'" + string + "'";
                            value = string;
                            break;
                        }
                        if('0123456789'.indexOf(C) > -1){
                            type = 'number'; 
                            string = token;
                            value = Number(token);
                            break;
                        }
                        if(token.length > 0)
                        if(!buffer2.isValue){
                            type = 'key';
                            string = token;
                            if(string.indexOf(' ') > -1) string = "'" + string + "'";
                            value = string;
                            break;
                        }
                }
                return {
                    type   : type,
                    string : string,
                    value  : value,
                    depth  : buffer2.brackets.length
                }
            });
            let clean = ''; 
            buffer2.tokens.forEach( token => { clean += token.string; });
            function indent(number) { 
                var space = [];
                for (var i = 0; i < number * 2; i++) space.push(' ');
                return (number > 0 ? '\n' : '') + space.join('');
            };
            let indentation = '';
            buffer2.tokens.forEach( (token,i) => { 
                switch(token.string){
                    case '[' : case '{' : 
                        const nextToken = i < (buffer2.tokens.length - 1) - 1 ? buffer2.tokens[i+1] : '';
                        if('}]'.indexOf(nextToken.string)===-1)
                            indentation += token.string + indent(token.depth);
                        else
                            indentation += token.string;
                        break;
                    case ']' : case '}' :
                        const prevToken = i > 0 ? buffer2.tokens[i-1] : '';
                        if('[{'.indexOf(prevToken.string)===-1)
                            indentation += indent(token.depth) + token.string;
                        else
                            indentation += token.string;
                        break;
                    case ':' : indentation += token.string + ' '; break;
                    case ',' : indentation += token.string + indent(token.depth); break;
                    default : indentation += token.string; break;
                }
            });
            let json = ''; buffer2.tokens.forEach( token => {
                switch(token.type){
                    case 'string' : case 'key' :
                        let
                            segment = '', 
                            string  = token.string;
                        if(string.length > 3){
                            segment = string.substring(1,string.length - 1);
                            segment = segment.replace(/"/g, '\\"');
                            string  = string.charAt(0) + segment + string.charAt(string.length - 1);
                        }
                        if(string.charAt(0)==="'")
                            string = '"' + string.substring(1,string.length - 1) + '"';
                        else
                            if(string.charAt(0)!=='"') string = '"' + string + '"';
                        json += string;
                        break;
                    default : json += token.string; break;
                }
            });
            let jsObject = JSON.parse(json);
            const colors = this.colors;
            let lines = 1;
            function indentII(number){ 
                var space = []; 
                if(number > 0 ) lines++;
                for (var i = 0; i < number * 2; i++) space.push('&nbsp;'); 
                return (number > 0 ? '<br>' : '') + space.join('');
            };
            let markup = ''; 
            const lastIndex = buffer2.tokens.length - 1;
            buffer2.tokens.forEach( (token, i) => {
                let span = (
                    '<span id="' + i +
                        '" type="'  + token.type  + 
                        '" value="' + token.value + 
                        '" depth="' + token.depth + 
                        '" style="color:'
                    );
                let color = colors.default;
                if(['string','number','primitive'].indexOf(token.type) > -1) color = colors[token.type];
                else if(token.type==='key')
                        if(token.string.indexOf(' ') > -1) color = colors.keys_whiteSpace; else color = colors.keys;
                else if(token.string===':') color = colors.colon;
                span += color + '">' + token.string + '</span>';
                switch(token.string){
                    case '{' : case '[' :
                        const nextToken = i < (buffer2.tokens.length - 1) - 1 ? buffer2.tokens[i+1] : '';
                        if('}]'.indexOf(nextToken.string)===-1)
                            markup += span + indentII(token.depth);
                        else
                            markup += span;
                        break;
                    case '}' : case ']' :
                        const prevToken = i > 0 ? buffer2.tokens[i-1] : '';
                        if('[{'.indexOf(prevToken.string)===-1)
                            markup += indentII(token.depth) + ( lastIndex === i ? '<br>' : '' ) + span;
                        else
                            markup += span;
                        break;
                    case ':' : markup += span + ' '; break;
                    case ',' : markup += span + indentII(token.depth); break;
                    default  : markup += span; break;
                }
            });
            lines += 2;
            return {
                tokens   : buffer2.tokens,
                noSpaces : clean,
                indented : indentation,
                json     : json,
                jsObject : jsObject,
                markup   : markup,
                lines    : lines
            };
        }
    }
}

export default JSONInput;