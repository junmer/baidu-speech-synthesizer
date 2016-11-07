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

            expect(typeof speaker.on).toBe('function');

            speaker.on('ended', function (sound) {

                expect(sound.src).toBeDefined();

                done();
            });

        });

        it('.once() should emit once', function (done) {

            var os = bss.speak('speak once');

            expect(typeof os.once).toBe('function');

            var count = 0;

            os.once('ended', function (sound) {
                count++;
            });

            setTimeout(function () {
                os.play();
            }, 3000);

            setTimeout(function () {
                expect(count).toBe(1);
                done();
            }, 5000);

        });

        it('diffent text should emit diffent event', function (done) {

            var s1 = bss.speak('say 1');

            s1.on('ended', function () {

                var s2 = bss.speak('say 2');

                s2.on('ended', function (sound) {

                    expect(sound.src).toBeDefined();
                    done();

                });
                
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
