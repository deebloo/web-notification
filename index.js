(function (name, definition) {
    if (typeof exports === 'object') {
        if (typeof module === 'object' && typeof module.exports === 'object') {
            module.exports = definition();
        }
        exports[name] = definition();
        return;
    }
    this[name] = definition();
})('device-orientation', function () {
    var doProto = Object.create(HTMLElement.prototype);

    doProto.createdCallback = function () {
        Object.defineProperty(this, 'supported', {
            value: ('Notification' in window)
        });
        this.setAttribute('supported', this.supported);

        if(this.supported) {
            Object.defineProperty(this, 'permission', {
                value: Notification.permission
            });
            this.setAttribute('permission', this.permission);
        }
    };

    doProto.notify = function () {
        if(!this.supported) {
            return false;
        }

        var title = this.getAttribute('title');
        var body = this.getAttribute('body');

        switch(this.permission) {
            case 'granted':
                new Notification(title, {
                    body: body
                });
                break;
            case 'denied':
                break;
            default:
                Notification.requestPermission(function (permission) {
                    if (permission === 'granted') {
                        new Notification(title, {
                            body: body
                        });
                    }
                });
        }
    };

    return document.registerElement('web-notification', {
        prototype: doProto
    });
});