# web-notification
Vanilla Web Component for the HTML5 Notifications API

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

    <web-notification id="notificationEl2"
                      title="Notification 2"
                      body="Goodbye World"
                      icon="marge-simpson.png"></web-notification>

    <script>
        document.getElementById('notificationEl1').notify();
        document.getElementById('notificationEl2').notify();
    </script>
</body>
</html>
```
