/**
 * Created by ahall on 11/11/15.
 */

var http = require('http');
var assert = require('assert');
var chai = require('chai').should();

var scmStash = require('../../../lib/hdqc/scmStash');

describe('scmStash', function () {

    describe('when getting project information', function () {
        it('should return project records', function (done) {
            scmStash.getProjectListing(function (data) {
                var recordsReturned = data.size;
                recordsReturned.should.be.above(0);
                done();
            })
        });

        it('should return project records', function (done) {
            scmStash.getProjectListing(function (data) {
                var itemToTest = data.values[0];
                itemToTest.id.should.be.above(0);
                itemToTest.name.should.not.be.empty;
                itemToTest.key.should.not.be.empty;
                itemToTest.link.url.should.not.be.empty;
                done();
            })
        });
    });

    describe('when getting repositories information', function () {
        it('should return repository records', function (done) {
            scmStash.getProjectListing(function (data) {
                var itemToTest = data.values[0];
                scmStash.getRepositories(function (data) {

                    var records = data.size;
                    records.should.be.above(-1);

                    done();
                }, itemToTest.key);
            })
        })
    })
});