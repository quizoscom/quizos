# Choices.css

{% code-tabs %}
{% code-tabs-item title="/src/components/Choices/Choices.css" %}
```css
.Choices > div {
    margin-bottom: 11px;
}

.Choices > div > input {
    font-size: 1.5rem;
    padding: 10px 11px;
    height: 1.5em;
    display: inline-block;
    width: 57%;
    margin-right: 18px;
}

.Choices > div > p {
    display: inline-block;
    margin-bottom: 0;
    color: #fff;
    cursor: pointer;
}

.Choices > div > p:hover,
.Choices > div > p.active {
    color: #300356;
    text-decoration: underline;
}

.Choices > div > p.answer {
    color: #300356;
    text-decoration: underline;
}

.Choice {
    font-size: 1.8rem;
    cursor: pointer;
    width: fit-content;
    padding: 14px 23px;
    margin: 5px 0px;
}

.Choice span {
    margin-left: 15px;
}

.choicesViewer {
    margin: 3em 0 0 3em;
}

.choicesViewer p:hover {
    border-top: 1px solid #300356;
    border-bottom: 1px solid #300356;
    color: #300356;
}

.Choice.selected {
    border-top: 1px solid #300356;
    border-bottom: 1px solid #300356;
    color: #300356;
}

@media (max-width: 900px) {
    .Choice {
        font-size: 1.5rem;
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

