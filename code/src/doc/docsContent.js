const BASE_URL = "https://github.com/quizoscom/quizos/blob/master";

export const Error404 = {
    desc: "Page Not Found"
}

export const Choices = {
    desc: "Choices shown during creating or taking quizzes",
    props: [
        { name: "className", type: "String", desc: "class for the container wrapping the choices" },
        { name: "viewer", type: "bool", desc: "decides user is creating [input] or taking the quiz [para]" },
        { name: "changed", type: "func", desc: "change handler for input while user is creating quiz" },
        { name: "answer", type: "int", desc: "showing the answer choice for the question while creating quiz" }
    ],
    link: BASE_URL + "/code/src/components/Choices/Choices.js",
    body: [
        "import React from 'react';",
        "import ReactTooltip from 'react-tooltip'; //https://github.com/wwayne/react-tooltip",
        "import classes from './Choices.css';",
        "import Input from '../UI/Input/Input';",
        "",
        "const choices = (props) => {",
        "    const classNames = [classes.Choices, classes[props.className]].join(' ');",
        "    let choices = ''",
        "",
        "    return (",
        "        <div className={classNames}>",
        "            {!props.viewer ? <label>Choices</label> : null }",
        "            <p key={choice} className={classNames} onClick={() => props.clicked(choice)} >{sno++}) <span>{choice}</span></p>",
        "            {choices}",
        "        </div>",
        "    );",
        "}",
        "",
        "export default choices;"
    ]
}