describe('WebNotification', function () {
    window.createWebNotification = window.createWebNotification || function () {};

    var notificationElement;

    var config = {
        title: 'My Notification Title',
        body: 'My Notification Title',
        icon: 'images/homer-simpson.jpg'
    };

    beforeEach(function () {
        notificationElement = createWebNotification(config);
    });

    it('created element should have the correct attributes', function () {
        expect(notificationElement.getAttribute('supported')).toBeTruthy();
        expect(notificationElement.getAttribute('title')).toBe(config.title);
        expect(notificationElement.getAttribute('body')).toBe(config.body);
        expect(notificationElement.getAttribute('icon')).toBe(config.icon);
    });

    it('created element should match string representation', function () {
        var expectedEl = '<web-notification supported="true" title="My Notification Title" body="My Notification Title" icon="images/homer-simpson.jpg"></web-notification>';

        var notificationWrapper = document.createElement('div');
        notificationWrapper.appendChild(notificationElement);

        expect(notificationWrapper.innerHTML).toBe(expectedEl);
    });

    it('created element should have correct public methods', function () {
        expect(typeof notificationElement.notify).toBe('function');
    });
});