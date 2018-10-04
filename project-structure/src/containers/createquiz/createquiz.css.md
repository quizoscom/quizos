# CreateQuiz.css

### code

{% code-tabs %}
{% code-tabs-item title="/src/containers/CreateQuiz/CreateQuiz.css" %}
```css
.CreateQuiz {
    margin: 0 auto;
    width: 85%;
    position: relative;
}

.CreateQuiz > div {
    display: block;
    position: relative;
    text-align: left;
    margin-bottom: 4em;
    margin-top: 4em;
}

.CreateQuiz > div > .LanguageSelectGroup {
    display: flex;
}

.selectCont input {
    font-size: 1rem;
    padding: 0px 10px;
    font-family: 'Righteous', sans-serif;
}

.CreateQuiz > div label {
    display: block;
    font-size: 1.6rem;
    color: #fff;
    margin-bottom: 10px;
}

.CreateQuiz .questionSNo {
    text-align: left;
    margin-left: -1em;
    font-size: 1.8rem;
    margin-bottom: 1em;
    color: #fff;
}

.CreateQuiz > div.ButtonGroup {
    position: fixed;
    bottom: 4em;
    right: 4em;
    margin-bottom: 0;
}

.CreateQuiz > div.ButtonGroup > button {
    margin-right: 1em;
}

.Close {
    float: right;
    width: 45px;
    cursor: pointer;
    margin-right: 1em;
    margin-top: 1em;
}

.Difficulty select {
    height: 2.3em;
    font-size: 1.4rem;
    width: 34%;
    outline: none;
    font-family: 'Righteous', cursive;
    padding: 0px 10px;
}

@media (max-width: 900px) {
    .LanguageSelectGroup > div {
        width: 400px;
    }

    .DifficultySelect > div {
        width: 400px;
    }

    .CreateQuiz > div.ButtonGroup {
        bottom: 20px;
        right: 11px;
        width: 100%;
        text-align: center;
    }
}

@media (max-width: 600px) {
    .LanguageSelectGroup > div {
        width: 100%;
    }

    .DifficultySelect > div {
        width: 100%;
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

