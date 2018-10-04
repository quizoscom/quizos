---
description: helper functions
---

# utility.js

### code

{% code-tabs %}
{% code-tabs-item title="/src/shared/utility.js" %}
```javascript
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
};

export const duplicacyCheckingForArray = (arr) => {
    let sorted_arr = arr.slice().sort(); 
    for (let i = 0; i < sorted_arr.length - 1; i++) {
        if (sorted_arr[i + 1] === sorted_arr[i]) {
            return true;
        }
    }
    return false;
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

