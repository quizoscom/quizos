const GIT_BASE_URL = "https://github.com/quizoscom/quizos/blob/master";

export const Error404 = {
    desc: "Page Not Found"
}

export const Choices = {
    desc: "Choices shown during creating or taking quizzes",
    props: [
        { name: "className", type: "String", desc: "class for the container wrapping the choices" },
        { name: "viewer", type: "bool", desc: "decides user is creating [input] or taking the quiz [para]" },
        { name: "changed", type: "func", desc: "change handler for input while user is creating a quiz" },
        { name: "answer", type: "String", desc: "showing the answer choice for the question while creating a quiz" },
        { name: "value", type: "Array", desc: "arrays of values of choices input while creating a quiz" },
        { name: "choices", type: "Array", desc: "arrays of choices while taking quiz" },
        { name: "selected", type: "String", desc: "selected choice value whilte taking quiz" },
        { name: "clicked", type: "func", desc: "answer selection handler while taking quiz" }
    ],
    link: GIT_BASE_URL + "/code/src/components/Choices/Choices.js",
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