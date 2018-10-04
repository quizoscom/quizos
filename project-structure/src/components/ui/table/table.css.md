# Table.css

### code

{% code-tabs %}
{% code-tabs-item title="/src/components/UI/Table/Table.css" %}
```css
@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');

.Table {
    background-color: #fff;
    text-transform: capitalize;
    border-collapse: collapse;
    width: 95%;
    font-family: 'Roboto', sans-serif;
}

.Table tbody tr:last-child td {
    padding-bottom: 9px;
}

.Table thead th,
.Table tbody td {
    padding: 13px 17px;
    font-size: 1rem;
}

.Table tbody tr:hover {
    background-color: #eee;
}

.Table thead th {
    font-weight: 700;
}

.Table thead tr {
    background-color: #00364E;
    color: #fff;
}

.Table td a {
	font-size: 0.8rem;
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

