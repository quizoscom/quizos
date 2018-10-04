# Home.css

### code

{% code-tabs %}
{% code-tabs-item title="/src/containers/Home/Home.css" %}
```css
.Home {
    padding: 4em 0em;
}

.Home img {
    width: 170px;
}

.Home p {
    color: #fff;
    font-size: 2.5rem;
    margin: 21px auto;
    width: 75%;
}

.ButtonGroup button {
    display: inline-block;
    margin: 10px 1.5em;
}

.Home p.Subtitle {
    margin-bottom: 2em;
}

.Home p.Subtitle span {
    text-decoration: underline;
    color: #f9a825;
    display: inline-block;
    padding: 0px 12px;
    font-size: 3.5rem;
    cursor: pointer;
}

hr {
    margin-top: 6em;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.ToolTip {
    font-size: 2rem;
    width: 24%;
    padding: 1.2em 2em;
    background-color: rgba(0, 0, 0, 0.99) !important;
}

@media (max-width: 600px) {
    .Home img {
        width: 110px;
    }

    .Home p {
        font-size: 2rem;
    }

    .Home p.Subtitle span {
        padding: 0px 4px;
        font-size: 2.5rem;
    }

    .ToolTip {
        padding: 1em;
        font-size: 1.5rem;
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

