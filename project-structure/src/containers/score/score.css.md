# Score.css

### code

{% code-tabs %}
{% code-tabs-item title="/src/containers/Score/Score.css" %}
```css
.ScoreP {
    font-size: 5rem;
    color: #fff;
    margin-top: 3em;
    margin-bottom: 0;
}

.ScoreP span {
    display: inline-block;
    margin: 0px 38px;
}

.ShareCont {
    background-color: #fff;
    margin: 0 auto;
    width: fit-content;
    padding: 0px 0 12px 0px;
    margin-bottom: 10em;
}

.ShareCont p {
    font-size: 1.3rem;
    padding-top: 8px;
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

.RecentScores {
    margin-top: 15em;
}

.RecentScores > p {
    background-color: #fff;
    font-size: 1.3rem;
    display: inline-block;
    margin: 12px 11px;
    padding: 13px 23px;
}

.RecentScores > p:first-child {
    display: block;
    margin: 15px auto;
    width: 17%;
    background-color: transparent;
    color: #fff;
}

.hr {
    margin-top: 3em;
    border: 1px solid rgba(255, 255, 255, 0.3);
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

