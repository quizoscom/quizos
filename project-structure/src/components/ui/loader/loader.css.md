# Loader.css

### code

{% code-tabs %}
{% code-tabs-item title="/src/components/UI/Loader/Loader.css" %}
```css
.LoaderCont {
    margin-top: 15em;
}

.LoadingP {
    color: #fff;
    font-size: 1.5em;
    text-align: center;
}

.Parent {
    margin: 0 auto;
    width: 78px;
}
  
.Loader {
    animation: rotate 1.5s ease-in-out infinite;
    clip: rect(0, 80px, 80px, 40px);
    height: 80px;
    width: 80px;
    position: relative;
}
  
.Loader2 {
    animation: rotate2 1.5s ease-in-out infinite;
    clip: rect(0, 80px, 80px, 40px);
    height: 80px;
    width: 80px;
    position: relative;
    top: -80px;
    transform: rotate(180deg);
}
  
.Loader:after {
    animation: shadow 1.5s ease-in-out infinite;
    box-shadow: inset #fff 0 0 0 35px;
    clip: rect(0, 80px, 80px, 40px);
    content:'';
    border-radius: 50%; 
    height: 80px;
    width: 80px;
    position: absolute; 
} 
  
.Loader2:after {
    animation: shadow 1.5s ease-in-out infinite;
    box-shadow: inset #fff 0 0 0 35px;
    clip: rect(0, 80px, 80px, 40px);
    content:'';
    border-radius: 50%; 
    height: 80px;
    width: 80px;
    position: absolute; 
}
  
@keyframes shadow {
    0% {
      box-shadow: inset #fff 0 0 0 35px;
    }
    
    50% {
      box-shadow: inset #fff 0 0 0 10px;
    }
    
    100% {
      box-shadow: inset #fff 0 0 0 35px;
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}
