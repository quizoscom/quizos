# Quiz.css

### code

{% code-tabs %}
{% code-tabs-item title="/src/containers/Quiz/Quiz.css" %}
```css
@import url('https://fonts.googleapis.com/css?family=Open+Sans:800i|Roboto:500');

.Quiz {
    position: relative;
    top: 2em;
    text-align: left;
    background-color: #fff;
    margin: 0 auto;
    width: 95%;
    border-radius: 4px;
    padding: 4px 7px;
}

.TimerCont {
    height: 3em;
    padding: 0 2em;
    font-size: 2rem;
}

.Body {
    margin: 3em auto;
    width: 67%;
    font-size: 1.4rem;
    margin-bottom: 5em;
}

.Language {
    font-size: 2rem;
    text-align: center;
}

.questionSNo {
    float: left;
}

.counterCont {
    float: right;
}

.ButtonGroup {
    position: fixed;
    bottom: 3em;
    right: 3em;
}

.ButtonGroup > button {
    margin-right: 1em;
}

.PreQuizInformations {
    margin: 0 auto;
    width: 86%;
    margin-top: 5em;
}

.PreQuizInformations > div {
    display: inline-block;
    width: 100%;
    margin-bottom: 4em;
}

.PreQuizInformations .Info ol {
    margin-top: 2em;
}

.PreQuizInformations .Info ol li {
    margin-top: 1em;
    font-size: 1.2rem;
}

.PreQuizInformations p.Title {
    font-size: 1.5rem;
    font-family: 'Open Sans', sans-serif;
}

.Icon {
    text-align: center;
}

.Icon img {
    width: 200px;
}

.CounterComplete {
    text-align: center;
    padding: 7em 1em;
}

.CounterComplete img {
    width: 300px;
    display: block;
    margin: 0 auto;
}

@media (min-width: 900px) {
    .PreQuizInformations > div {
        width: 48%;
    }

    .Icon img {
        width: 300px;
    }
}

@media (max-width: 900px) {
    .ButtonGroup {
        background: #5f2c82;
        background: -webkit-linear-gradient(to right, #49a09d, #5f2c82);
        background: linear-gradient(to right, #49a09d, #5f2c82);
        bottom: 0;
        right: 0;
        width: 100%;
        text-align: center;
        padding: 1.5em 0;
    }

    .PreQuizInformations {
        margin-bottom: 3em;
    }

    .Body {
        width: 85%;
        margin-top: 1em;
    }

    .TimerCont {
        flex: 1;
        text-align: center;
        margin-bottom: 2em;
    }

    .questionSNo,
    .counterCont {
        float: none;
        margin: 0;
    }
}

@media (min-width: 1500px) {
    .PreQuizInformations {
        margin-top: 4qem;
    }

    .Icon img {
        position: relative;
        top: -1em;
    }

    .PreQuizInformations .Info ol li {
        font-size: 1.5rem;
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

