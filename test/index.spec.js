describe('#synthesizer', function () {
    
    var bss = new BDSSpeechSynthesizer({
        cuid: 'test'
    });

    describe('##init', function () {

        it('options should be assigned', function () {
            expect(bss.options.cuid).toBe('test');
        });

    });


    describe('##speak', function () {

        var speaker = bss.speak('say something');

        it('speaker should has play', function () {
            expect(typeof speaker.play).toBe('function');
        });

        it('speaker should has ended', function (done) {

            console.log(speaker.on);

            speaker.on('ended', function () {

                expect(typeof speaker.on).toBe('function');

                done();
            });

        });

    });


    describe('##stop', function () {
        it('bss should has stop', function () {
            expect(typeof bss.stop).toBe('function');
        });
    })

});
