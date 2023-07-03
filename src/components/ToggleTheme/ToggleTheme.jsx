import { connect, useDispatch } from "react-redux";
import { setThemeDark, setThemeLight } from "../../redux/slices/toggleThemeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import React, { Component } from "react";
import { Switch } from "antd";

class ToggleTheme extends Component {
    render() {
        const {dispatch} = this.props
        const onChange = (checked) => {
            if (checked) dispatch(setThemeDark());
            if (!checked) dispatch(setThemeLight());
        };

        return (
            <Switch
                checkedChildren={<FontAwesomeIcon icon={faMoon} />}
                unCheckedChildren={<FontAwesomeIcon icon={faSun} />}
                defaultChecked
                onChange={onChange}
            />
        );
    }
}

export default connect()(ToggleTheme);
