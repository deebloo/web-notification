describe('WebNotification', function () {
    it('should create a web notification web component instance', function () {
        var notificationElement = new WebNotification();

        expect(notificationElement instanceof WebNotification).toBe(true);
    });
});