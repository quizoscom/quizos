# Sidebar.css

### code

{% code-tabs %}
{% code-tabs-item title="/src/components/Sidebar/Sidebar.css" %}
```css
.burgerButton {
    position: fixed;
    width: 36px;
    height: 30px;
    left: 17px;
    top: 24px;
}

.burgerButton > span > span {
    background: #fff;
    width: 28px;
    height: 9% !important;
}

.burgerButton > span > span:nth-child(2) { top: 30% !important; }
.burgerButton > span > span:nth-child(3) { top: 60% !important; }


.Menu {
    background: #124f5f;
    overflow: hidden !important;
}

.Menu a img {
    width: 140px;
    padding: 8px;
}

.Menu a {
    text-align: left;
    padding: 10px 6px;
}

@media (min-width: 800px) {
    .burgerButton {
        display: none;
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

