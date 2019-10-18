/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */
const assert = require('assert');
const fs = require('fs');

const SimpleLogger = require('../lib/SimpleLogger');

if (!fs.existsSync('./testtarget/')) {
    fs.mkdirSync('./testtarget/');
}

describe('SimpleLogger', function() {
    const Logger = new SimpleLogger('./testtarget/test.log');

    describe('_out()', function() {
        Logger.debug('Hi, tester!');
        it('Should write to a file, if passed to the constructor', function() {
            assert.notStrictEqual(fs.existsSync('./testtarget/test.log'), false);
        });

        it('Should throw if given a file path into a directory that doesn\'t exist', function() {
            const dirTestLogger = new SimpleLogger('./testdir/file.log');

            assert.throws(() => {
                dirTestLogger._out('aa', Logger.severity.fatal);
            });
        });
    });

    describe('_formatOutputString()', function() {
        it('Should not start with [ if not logging to a file', function() {
            const str = Logger._formatOutputString('test', Logger.severity.fatal, false);
            const test = str.startsWith('[');

            assert.strictEqual(test, false);
        });

        it('Should start with [ if logging to a file', function() {
            const str = Logger._formatOutputString('test', Logger.severity.fatal, true);
            const test = str.startsWith('[');

            assert.strictEqual(test, true);
        });
    });

    describe('setPrefix', function() {
        it('Should modify the severity prefix', function() {
            const preModified = Logger.severityInfo.get(Logger.severity.fatal).prefix;
            const newPrefix = "Test!";

            Logger.setPrefix(Logger.severity.fatal, newPrefix);

            const postModified = Logger.severityInfo.get(Logger.severity.fatal).prefix;

            assert.notStrictEqual(preModified, postModified);
        });
    });

    describe('setAttributes', function() {
        it('Should modify severity attributes', function() {
            const preModified = Logger.severityInfo.get(Logger.severity.fatal).attributes;
            const newAttributes = ['test'];

            Logger.setAttributes(Logger.severity.fatal, newAttributes);

            const postModified = Logger.severityInfo.get(Logger.severity.fatal).attributes;

            assert.notStrictEqual(preModified, postModified);
        });
    });

    describe('setBackgroundColor', function() {
        it('Should modify severity background color', function() {
            const preModified = Logger.severityInfo.get(Logger.severity.fatal).backgroundColor;
            const newBackgroundColor = Logger.colors.background.magenta;

            Logger.setBackgroundColor(Logger.severity.fatal, newBackgroundColor);

            const postModified = Logger.severityInfo.get(Logger.severity.fatal).backgroundColor;

            assert.notStrictEqual(preModified, postModified);
        });
    });

    describe('setForegroundColor', function() {
        it('Should modify severity foreground color', function() {
            const preModified = Logger.severityInfo.get(Logger.severity.fatal).foregroundColor;
            const newForegroundColor = Logger.colors.foreground.green;

            Logger.setForegroundColor(Logger.severity.fatal, newForegroundColor);

            const postModified = Logger.severityInfo.get(Logger.severity.fatal).foregroundColor;

            assert.notStrictEqual(preModified, postModified);
        });
    });
});