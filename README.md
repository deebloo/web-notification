# web-notification
Vanilla Web Component for the HTML5 Notifications API. [Demo](http://deebloo.github.io/web-notification/)

##### Instalation
```
npm i --save web-notification

bower install --save web-notification
```

#### Properties

| Name           | Description |
| -------------- | ------------- |
| title          | The title of the notification  |
| body           | body of the notification  |
| icon           | the icon to display with the notification  |
| timeout        | amount of time to display notifcation before auto hiding  |
| notify-on-load | trigger notification as soon as the component is created | 

#### API

| Name      | Description |
| --------- | ------------- |
| .notify() | Manually triggers the notification  |

#### Example
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="index.js"></script>
</head>
<body>
    <web-notification id="notificationEl1"
                      title="Notification 1"
                      body="Hello World"
                      icon="homer-simpson.jpg"
                      timeout="1000"></web-notification>

    <web-notification title="Notification 2"
                      body="Goodbye World"
                      icon="marge-simpson.png"
                      notify-on-load="true"></web-notification>

    <script>
        document.getElementById('notificationEl1').notify();
    </script>
</body>
</html>
```

#### Dynamic
To dnyamically add new notification elements.
```JS
var createWebNotification = require('web-notification'); // or available by 'createWebNotification' on window if not using modules

var myNotification = createWebNotification({
    title: 'My Title',
    body: 'My Body'
});

document.appendElement(myNotification);
```

