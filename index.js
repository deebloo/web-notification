(function (name, definition) {
    if (typeof exports === 'object') {
        if (typeof module === 'object' && typeof module.exports === 'object') {
            module.exports = definition();
        }
        exports[name] = definition();
        return;
    }
    this[name] = definition();
})('WebNotification', function () {
    var doProto = Object.create(HTMLElement.prototype);

    /**
     * Define if notifications are available and if permission is granted
     */
    doProto.createdCallback = function () {
        Object.defineProperty(this, 'supported', {
            value: ('Notification' in window)
        });
        this.setAttribute('supported', this.supported);

        if(this.getAttribute('notify-on-load')) {
            this.notify();
        }
    };

    /**
     * Trigger notification
     */
    doProto.notify = function () {
        if (!this.supported) {
            return false;
        }

        this.timeout = parseInt(this.getAttribute('timeout'), 10);

        Notification.requestPermission(_notify.bind(this));
    };

    /**
     * If Permission is granted, create notification based on element config
     *
     * @param {string} permission - if the user has allowed notifications
     *
     * @private
     */
    function _notify(permission) {
        if (permission === 'granted') {
            var notification = new Notification(this.getAttribute('title'), {
                body: this.getAttribute('body'),
                icon: this.getAttribute('icon')
            });

            if (this.timeout > 0) {
                setTimeout(function () {
                    notification.close();
                }, this.timeout);
            }
        }
    }

    return document.registerElement('web-notification', {
        prototype: doProto
    });
});