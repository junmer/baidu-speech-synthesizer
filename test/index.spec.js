describe('#synthesizer', function () {
    
    var bss = new BDSSpeechSynthesizer({
        cuid: 'test'
    });

    describe('init', function () {

        it('options should be assigned', function () {
            expect(bss.options.cuid).toBe('test');
        });

    });


    describe('speak', function () {

        var originalTimeout;
        var speaker = bss.speak('say something');

        beforeEach(function() {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        });

        it('speaker should has play', function () {
            expect(typeof speaker.play).toBe('function');
        });

        it('speaker should has ended', function (done) {

            speaker.on('ended', function () {

                expect(typeof speaker.on).toBe('function');

                done();
            });

        });

        afterEach(function() {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });

    });

    describe('stop', function () {
        it('bss should has stop', function () {
            expect(typeof bss.stop).toBe('function');
        });
    })

});
