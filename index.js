(function (name, definition, factory) {
    var Component = definition();

    if (typeof exports === 'object') {
        if (typeof module === 'object' && typeof module.exports === 'object') {
            module.exports = exposeFactory;
        }
        exports[name] = exposeFactory;
        return;
    }
    this[name] = exposeFactory;

    function exposeFactory(opts) {
        return factory(Component, opts);
    }
})('createWebNotification', function definition() {
    var doProto = Object.create(HTMLElement.prototype);

    // Define if notifications are available and if permission is granted
    doProto.createdCallback = function () {
        Object.defineProperty(this, 'supported', {
            value: ('Notification' in window)
        });
        this.setAttribute('supported', this.supported);

        if (this.getAttribute('notify-on-load')) {
            this.notify();
        }
    };

    // Trigger the notification
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
}, function factory (Component, options) {
    var newEl = new Component();

    for(var option in options) {
        if(options.hasOwnProperty(option)) {
            newEl.setAttribute(option, options[option]);
        }
    }

    return newEl;
});