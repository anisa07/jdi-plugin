function Button() {
    return (
        <div className="form-group">
            <button type="button" className="btn btn-default">Button</button>
        </div>
    )
}
function Text() {
    return (
        <div className="media-body">
            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras
            purus odio, vestibulum in vulputate at, tempus viverra turpis.
        </div>
    )
}
function Label() {
    return (
        <div className="media-body">
            <h4 className="media-heading">Label</h4>
        </div>
    )
}
function Link() {
    return (
        <div className="media-body">
            <a href="#">Link</a>
        </div>
    )
}
function TextField() {
    return (
        <div className="input-group">
            <input type="text" className="form-control" placeholder="TextField"/>
        </div>
    )
}
function TextArea() {
    return (
        <div className="input-group">
            <textarea rows="4" cols="50" className="form-control" placeholder="TextArea">

            </textarea>
        </div>
    )
}

function Checkbox() {
    return (
        <div className="input-group">
            <label htmlFor="exampleCheck"><input type="checkbox" id="exampleCheck"/> CheckBox</label>
        </div>
    )
}

function DatePicker() {
    return (
        <div className="input-group">
            <input id="date" type="date" className="form-control"/>
        </div>
    )
}
function FileInput() {
    return (
        <div>
            <input type="file" id="myFile"/>
        </div>
    )
}

function Image() {
    return (
        <div className="media">
            <div className="media-center">
                <img className="media-object" src="../bootstrap/pics/rudraksha.png" width="100px"/>
            </div>
        </div>
    )
}
function DropDown() {
    return (
        <div className="form-group">
            <div className="selectContainer">
                <select className="form-control" name="size">
                    <option value="">DropDown option 1</option>
                    <option value="">DropDown option 2</option>
                    <option value="">DropDown option 3</option>
                </select>
            </div>
        </div>
    )
}

function CheckList() {
    return (
        <div className="input-group">
            <label htmlFor="checkListItem1"><input type="checkbox" id="checkListItem1"/> CheckList item1</label>
            <label htmlFor="checkListItem2"><input type="checkbox" id="checkListItem2"/> CheckList item2</label>
            <label htmlFor="checkListItem3"><input type="checkbox" id="checkListItem3"/> CheckList item3</label>
            <label htmlFor="checkListItem4"><input type="checkbox" id="checkListItem4"/> CheckList item4</label>
        </div>
    )
}
function DropList() {
    var expanded = false;

    function showCheckboxes() {
        var checkboxes = document.getElementById("checkboxes");
        if (!expanded) {
            checkboxes.style.display = "block";
            expanded = true;
        } else {
            checkboxes.style.display = "none";
            expanded = false;
        }
    }

    return (
        <div className="form-group">
            <div className="multiselect">
                <div className="selectBox" onClick={showCheckboxes}>
                    <select className="form-control">
                        <option>Select an option</option>
                    </select>
                    <div className="overSelect"></div>
                </div>
                <div id="checkboxes">
                    <label htmlFor="one">
                        <input type="checkbox" id="one"/>First checkbox</label>
                    <label htmlFor="two">
                        <input type="checkbox" id="two"/>Second checkbox</label>
                    <label htmlFor="three">
                        <input type="checkbox" id="three"/>Third checkbox</label>
                </div>
            </div>
        </div>
    )
}
function Combobox() {
    return (
        <div className="form-group">
            <div className="selectContainer">
                <input list="browsers" name="browser"/>
                <datalist id="browsers">
                    <option value="Internet Explorer"/>
                    <option value="Firefox"/>
                    <option value="Chrome"/>
                    <option value="Opera"/>
                    <option value="Safari"/>
                </datalist>
            </div>
        </div>
    )
}
function Table() {
    return (
        <div className="media">
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>John</td>
                    <td>Doe</td>
                </tr>
                <tr>
                    <td>Mary</td>
                    <td>Moe</td>
                </tr>
                <tr>
                    <td>July</td>
                    <td>Dooley</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
//menu = navbar
function Menu() {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
                        <li><a href="#">Link</a></li>
                    </ul>
                </div>
            </div>
        </nav>)
}
function Tabs() {
    return (
        <ul className="nav nav-tabs">
            <ul className="nav nav-tabs">
                <li role="presentation" className="active"><a href="#">Home</a></li>
                <li role="presentation"><a href="#">Profile</a></li>
                <li role="presentation"><a href="#">Messages</a></li>
            </ul>
        </ul>
    )
}
function RadioButtonGroup() {
    return (
        <div className="media">
            <div className="media-left">
                <div><label htmlFor="radioTest1"><input type="radio" name="radioTestGroup"
                                                        id="radioTest1"/> Radio1
                </label>
                </div>
                <div><label htmlFor="radioTest2"><input type="radio" name="radioTestGroup"
                                                        id="radioTest2"/> Radio2
                </label>
                </div>
                <div><label htmlFor="radioTest3"><input type="radio" name="radioTestGroup"
                                                        id="radioTest3"/> Radio3
                </label>
                </div>
            </div>
        </div>
    )
}
function TextList() {
    return (
        <div className="list-group">
            <a href="#" className="list-group-item active">
                <h4 className="list-group-item-heading">List group item heading</h4>
                <p className="list-group-item-text">Some text like in chat</p>
            </a>
            <a href="#" className="list-group-item">
                <h4 className="list-group-item-heading">List group item heading</h4>
                <p className="list-group-item-text">Some text like in chat</p>
            </a>
        </div>
    )
}
function Section() {
    return (
        <div className="media">
            <div className="media-left media-middle">
                <a href="#">
                    <img className="media-object" src="../bootstrap/pics/rudraksha.png" alt="..." width="45px"/>
                </a>
            </div>
            <div className="media-body">
                <h4 className="media-heading">Middle aligned media</h4>
                Some info is here
                Some info is here
                Some info is here
            </div>
        </div>
    )
}

let Elements = [Button, Text, Label, Link, TextField, TextArea, Checkbox, DatePicker, FileInput, Image,
    DropDown, CheckList, DropList, Combobox, Table, Menu, Tabs, RadioButtonGroup, TextList, Section];


export {Elements}