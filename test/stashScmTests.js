/**
 * Created by Adron on 11/11/15.
 * Description: tests (integration) for the scmStash library.
 */

var http = require('http');
var assert = require('assert');
var chai = require('chai').should();

var stashScm = require('../lib/sources/stashScm');

describe('stashScm', function () {

  describe('when getting project information', function () {

    it('junk test', function () {
      true.should.be.equal(true);
    })

    // it('should return project records', function (done) {
    //     scmStash.getProjectListing(function (data) {
    //         var itemToTest = data.values[0];
    //         itemToTest.id.should.be.above(0);
    //         done();
    //     })
    // });
    //
    // it('should return project records', function (done) {
    //     scmStash.getProjectListing(function (data) {
    //         var itemToTest = data.values[0];
    //         itemToTest.key.should.not.be.empty;
    //         done();
    //     })
    // });
    //
    // it('should return project records', function (done) {
    //     scmStash.getProjectListing(function (data) {
    //         var itemToTest = data.values[0];
    //         itemToTest.link.url.should.not.be.empty;
    //         done();
    //     })
    // });
  });

  // describe('when getting repositories information', function () {
  //     it('should return repository records', function (done) {
  //         scmStash.getProjectListing(function (data) {
  //             var itemToTest = data.values[0];
  //             scmStash.getRepositories(function (data) {
  //                 var records = data.size;
  //                 records.should.be.above(-1);
  //                 done();
  //             }, itemToTest.key);
  //         })
  //     })
  // })
});
