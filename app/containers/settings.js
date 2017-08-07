import settingsJSON from '../data/settings.json';
import {Elements} from  '../components/elements.js';
let settingsDefault = JSON.stringify(settingsJSON);
let settingsObj = settingsJSON;

function RadioGroup(props) {
    let id = "", item = "", title = "";
    for (let key in props.elements[0]) {
        if (key === "theme") {
            id = "t";
            item = key;
            title = "Themes"
        }
        if (key === "language") {
            id = "l";
            item = key;
            title = "Select programming language"
        }
    }
    return (
        <div>
            <h5>{title}</h5>
            {
                props.elements.map(function (element, index) {
                    return (
                        <div key={id + index}><label htmlFor={id + index}><input type="radio"
                                                                                 name={item + "-group"}
                                                                                 id={id + index}
                                                                                 value={element[item]}
                                                                                 checked={element[item] === props.selectedElement}
                                                                                 onChange={props.setElement}/>{element[item]}
                        </label>
                        </div>
                    )
                })
            }
        </div>)
};

RadioGroup.propTypes = {
    elements: PropTypes.array.isRequired,
    selectedElement: PropTypes.string.isRequired,
    setElement: PropTypes.func.isRequired
};

function Checkboxes(props) {
    return (
        <div>
            <h5>Use directives as locators</h5>
            {
                props.elements.map(function (element, index) {
                    return (<div key={"d" + index}>
                        <label htmlFor={"d" + index}><input type="checkbox" id={"d" + index} checked={element.selected}
                                                            onChange={props.setDirectives}/> {element.directive}</label>
                    </div>)
                })
            }
        </div>
    )
}

Checkboxes.propTypes = {
    elements: PropTypes.array.isRequired,
    setDirectives: PropTypes.func.isRequired
};


function ElementsDescription(props) {
    let index = props.selectIndex;
    return (
        <div id="elementDescDiv">
            <h5>Add elements classes, tags, types</h5>
            <div className="form-group">
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType">Element</label>
                    <select className="form-control" name="size" id="selectedElement" onChange={props.selectElement}>
                        {
                            props.elements.map(function (element, index) {
                                return (
                                    <option value={index} key={"el" + index}>{element.element}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType">Class</label><br></br>
                    <input type="text" className="form-control" id="elementclasses" onBlur={props.getElementInfo}/>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType">Tag</label><br></br>
                    <input type="text" className="form-control" id="elementtags" onBlur={props.getElementInfo}/>
                </div>
                <div className="col-xs-2 selectContainer">
                    <label className="control-label displayType">Type</label><br></br>
                    <input type="text" className="form-control" id="elementtypes" onBlur={props.getElementInfo}/>
                </div>
            </div>
            <div className="col-xs-2 selectContainer">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">{props.currentElement}</h3>
                    </div>
                    <div className="panel-body">
                        { Elements[index]() }
                    </div>
                </div>
            </div>
        </div>
    )
}

ElementsDescription.propTypes = {
    "elements": PropTypes.array.isRequired,
    "getElementInfo": PropTypes.func.isRequired,
    "selectElement": PropTypes.func.isRequired,
};

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedTheme: "",
            selectedLanguage: "",
            currentElement: "Button",
            currentElementIndex: 0,
            staticIds: settingsJSON.staticIds,
            languages: settingsJSON.programmingLanguages.slice(),
            directives: settingsJSON.angularDirectives.slice(),
            jdiElements: settingsJSON.customClassesTagsTypes.slice(),
            themes: settingsJSON.themes.slice(),
            settingsSaved: false
        };
        this.setTheme = this.setTheme.bind(this);
        this.applyStaticIds = this.applyStaticIds.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
        this.setDirectives = this.setDirectives.bind(this);
        this.getElementInfo = this.getElementInfo.bind(this);
        this.selectElement = this.selectElement.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.undoChanges = this.undoChanges.bind(this);
    }

    componentWillMount() {
        this.getInitialState();
    }

    componentDidMount() {
        this.selectElement();
    }

    getInitialState() {
        this.setState(function () {
            return {
                settingsSaved: false,
                selectedTheme: settingsJSON.themes.filter(function (theme) {
                    if (theme.value === true) {
                        let cssBootLink = document.querySelector('#main-css');
                        cssBootLink.setAttribute("href", "../theme/" + theme.theme + "/bootstrap.min.css");
                        return theme.theme
                    }
                })[0].theme,
                selectedLanguage: settingsJSON.programmingLanguages.filter(function (language) {
                    if (language.selected === true) {
                        return language.language
                    }
                })[0].language,
            }
        })
    }

    setTheme(e) {
        var themes = this.state.themes.map(function (theme) {
            if (theme.theme !== e.target.value) {
                theme.value = false;
            } else {
                theme.value = true;
            }
            return theme;
        });

        this.setState({
            selectedTheme: e.target.value,
            themes: themes
        });

        let cssBootLink = document.querySelector('#main-css');
        cssBootLink.setAttribute("href", "../theme/" + e.target.value + "/bootstrap.min.css");
    };

    setLanguage(e) {
        var languages = this.state.languages.map(function (language) {
            if (language.language !== e.target.value) {
                language.selected = false;
            } else {
                language.selected = true;
            }
            return language;
        });

        this.setState({
            selectedLanguage: e.target.value,
            languages: languages
        });
    }

    applyStaticIds(e) {
        let val = e.target.checked === null ? false : e.target.checked;
        this.setState(function () {
                return {
                    staticIds: val
                }
            }
        )
    }

    setDirectives(e) {
        let id = (e.target.id === null ? "" : e.target.id).replace(/\w/, '');
        let val = e.target.checked === null ? false : e.target.checked;
        let directives = this.state.directives.slice();
        directives[id].selected = val;
        this.setState(function () {
                return {
                    directives: directives
                }
            }
        )
    }

    selectElement() {
        var selectedElement = document.querySelector("#selectedElement");
        var value = selectedElement.options[selectedElement.selectedIndex].text;
        var index = Number(selectedElement.options[selectedElement.selectedIndex].value);
        this.setState(function () {
            return {
                currentElement: value,
                currentElementIndex: index
            }
        });
    }

    getElementInfo(e) {
        var id = e.target.id === null ? '' : e.target.id.replace(/element/, '');
        var value = e.target.value === null ? '' : e.target.value;
        value = value.replace(/\s/g, '');
        var el = this.state.currentElement;
        if (value.length > 0) {
            var arr = value.split(',');
            var result = this.state.jdiElements.map(function (element) {
                if (element.element === el) {
                    element[id] = arr;
                }
                return element;
            });
            this.setState(function () {
                return {jdiElements: result}
            })
        }

    }

    saveChanges() {
        this.setState(function () {
            return {settingsSaved: true}
        });

        let data = {
            "themes": this.state.themes,
            "programmingLanguages": this.state.languages,
            "staticIds": this.state.staticIds,
            "customClassesTagsTypes": this.state.jdiElements,
            "angularDirectives": this.state.directives
        };
        let json = JSON.stringify(data);
        let blob = new Blob([json], {type: "application/json"});
        saveAs(blob, 'settings.json');
        settingsObj = data;
    };

    undoChanges(){
         settingsObj =  JSON.parse(settingsDefault);

        this.setState (function(){
            return {
                staticIds: settingsObj.staticIds,
                languages: settingsObj.programmingLanguages.slice(),
                directives: settingsObj.angularDirectives.slice(),
                jdiElements: settingsObj.customClassesTagsTypes.slice(),
                themes: settingsObj.themes.slice(),
                settingsSaved: false,
                selectedTheme: settingsObj.themes.filter(function (theme) {
                    if (theme.value === true) {
                        let cssBootLink = document.querySelector('#main-css');
                        cssBootLink.setAttribute("href", "../theme/" + theme.theme + "/bootstrap.min.css");
                        return theme.theme
                    }
                })[0].theme,
                selectedLanguage: settingsObj.programmingLanguages.filter(function (language) {
                    if (language.selected === true) {
                        return language.language
                    }
                })[0].language
            }
        });
    };

    render() {
        return (
            <div className="container-fluid">
                <RadioGroup elements={this.state.themes} setElement={this.setTheme}
                            selectedElement={this.state.selectedTheme}/>
                <div>
                    <h5>Elements ids</h5>
                    <label htmlFor="staticIds"><input type="checkbox" id="staticIds" checked={this.state.staticIds} onChange={this.applyStaticIds}/>
                        Static ids are used</label>
                </div>
                <RadioGroup elements={this.state.languages} setElement={this.setLanguage}
                            selectedElement={this.state.selectedLanguage}/>
                <ElementsDescription elements={this.state.jdiElements} getElementInfo={this.getElementInfo}
                                     selectElement={this.selectElement} selectIndex={this.state.currentElementIndex}
                                     currentElement={this.state.currentElement}/>
                <Checkboxes elements={this.state.directives} setDirectives={this.setDirectives}/>
                <div className="container-fluid text-right">
                    {this.state.settingsSaved ?
                        <span className="warn">Warning! Settings.json is saved only in browser downloads folder.
                        To make these settings default change original settings.json with this in plugin 'app/data' folder</span> : null}
                    <button className="btn btn-default customBtn" onClick={this.saveChanges}>Save settings</button>
                    <button className="btn btn-default customBtn" onClick={this.undoChanges}>Cancel</button>
                </div>
            </div>)
    }
}

export {Settings, settingsObj};