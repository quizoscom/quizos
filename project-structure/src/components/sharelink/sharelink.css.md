# ShareLink.css

### code

{% code-tabs %}
{% code-tabs-item title="/src/components/ShareLink/ShareLink.css" %}
```css
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');

.ShareLink {
    text-align: center !important;
    color: #fff;
    font-size: 1.5rem;
    font-family: 'Roboto', sans-serif;
}

.ShareLink .Link {
    background-color: #FFF8DC;
    padding: 19px 29px;
    font-size: 1.5rem;
    width: fit-content;
    margin: 3em auto;
    color: #000;
    margin-bottom: 3em;
    font-weight: 700;
    border-left: 4px solid #ffeb8e;
}

.ShareCont {
    background-color: #fff;
    margin: 0 auto;
    width: fit-content;
    padding: 0px 0 12px 0px;
}

.ShareCont p {
    font-size: 1.3rem;
    padding-top: 8px;
    text-align: center;
    color: #000;
}

.ShareCont > div {
    display: inline-block;
    margin: 0 18px;
    cursor: pointer;
}

.ShareCont img {
    width: 35px;
    transition: transform .3s ease-in-out
}

.ShareCont img:hover {
    transform: rotate(360deg)
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

