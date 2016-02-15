(function () {
    expose('createWebNotification', register, factory);

    /**
     * Exposes your new component to the window or to a module
     *
     * @param {string} name - the factory name to expose
     * @param {function} definition - the definition of your web component. registers to the document
     * @param {function} factory - method for programmatically creating web component
     */
    function expose(name, definition, factory) {
        var Component = definition();

        if (typeof exports === 'object') {
            if (typeof module === 'object' && typeof module.exports === 'object') {
                module.exports = exposeFactory;
            }

            exports[name] = exposeFactory;

            return exposeFactory;
        }

        this[name] = exposeFactory;

        function exposeFactory(opts) {
            return factory(Component, opts);
        }

        return exposeFactory;
    }

    /**
     * Create and register your web component with the document
     */
    function register() {
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
    }

    /**
     * factory for creating new dynamic instance of the component
     *
     * @param {function} Component - the registered component Constructor/class
     * @param {object} options - a map of attributes to attach to the new component instance
     *
     * @return {*}
     */
    function factory(Component, options) {
        var newEl = new Component();

        for(var option in options) {
            if(options.hasOwnProperty(option)) {
                newEl.setAttribute(option, options[option]);
            }
        }

        return newEl;
    }
})();
