"use strict";

describe("Omberg III page", function () {

  // it("should redirect index.html to index.html#/phones", function() {
  //   browser.get('app/index.html');
  //   browser.getLocationAbsUrl().then(function(url) {
  //       expect(url.split('#')[1]).toBe('/phones');
  //     });
  // });


  describe("Contact list view", function () {

    beforeEach(function() {
      browser.get("#/kontakt");
    });

    it("should have the correct title", function () {
      expect(browser.getTitle()).toEqual("Kontaktuppgifter");
    });

    it("should have the correct header", function () {
      var header = element.all(by.css("h1")).first();
      expect(header.getText()).toBe("Kontaktuppgifter");
    });

  });

  describe("Booking view", function () {

    beforeEach(function() {
      browser.get("#/bokning");
    });

    it("should have the correct title", function () {
      expect(browser.getTitle()).toEqual("Bokning");
    });

    it("should have the correct header", function () {
      var header = element.all(by.css("h1")).first();
      expect(header.getText()).toBe("Övernattningslägenheten");
    });

    describe("calendar", function () {
        it("should contain the abbreviated names of the weekdays", function () {
            var listItems = element.all(by.css(".calendar ul li"));
            expect(listItems).not.toBeUndefined();
            expect(listItems.get(0).getText()).toBe("Mån");
            expect(listItems.get(1).getText()).toBe("Tis");
            expect(listItems.get(2).getText()).toBe("Ons");
            expect(listItems.get(3).getText()).toBe("Tor");
            expect(listItems.get(4).getText()).toBe("Fre");
            expect(listItems.get(5).getText()).toBe("Lör");
            expect(listItems.get(6).getText()).toBe("Sön");
        });
    });

  });

  //   it('should filter the phone list as user types into the search box', function() {
  //
  //     var phoneList = element.all(by.repeater('phone in phones'));
  //     var query = element(by.model('query'));
  //
  //     expect(phoneList.count()).toBe(20);
  //
  //     query.sendKeys('nexus');
  //     expect(phoneList.count()).toBe(1);
  //
  //     query.clear();
  //     query.sendKeys('motorola');
  //     expect(phoneList.count()).toBe(8);
  //   });
  //
  //
  //   it('should be possible to control phone order via the drop down select box', function() {
  //
  //     var phoneNameColumn = element.all(by.repeater('phone in phones').column('{{phone.name}}'));
  //     var query = element(by.model('query'));
  //
  //     function getNames() {
  //       return phoneNameColumn.map(function(elm) {
  //         return elm.getText();
  //       });
  //     }
  //
  //     query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter
  //
  //     expect(getNames()).toEqual([
  //       "Motorola XOOM\u2122 with Wi-Fi",
  //       "MOTOROLA XOOM\u2122"
  //     ]);
  //
  //     element(by.model('orderProp')).element(by.css('option[value="name"]')).click();
  //
  //     expect(getNames()).toEqual([
  //       "MOTOROLA XOOM\u2122",
  //       "Motorola XOOM\u2122 with Wi-Fi"
  //     ]);
  //   });
  //
  //
  //   it('should render phone specific links', function() {
  //     var query = element(by.model('query'));
  //     query.sendKeys('nexus');
  //     element.all(by.css('.phones li a')).first().click();
  //     browser.getLocationAbsUrl().then(function(url) {
  //       expect(url.split('#')[1]).toBe('/phones/nexus-s');
  //     });
  //   });
  //
  //
  // describe('Phone detail view', function() {
  //
  //   beforeEach(function() {
  //     browser.get('app/index.html#/phones/nexus-s');
  //   });
  //
  //
  //   it('should display nexus-s page', function() {
  //     expect(element(by.binding('phone.name')).getText()).toBe('Nexus S');
  //   });
  //
  //
  //   it('should display the first phone image as the main phone image', function() {
  //     expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
  //   });
  //
  //
  //   it('should swap main image if a thumbnail image is clicked on', function() {
  //     element(by.css('.phone-thumbs li:nth-child(3) img')).click();
  //     expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.2.jpg/);
  //
  //     element(by.css('.phone-thumbs li:nth-child(1) img')).click();
  //     expect(element(by.css('img.phone.active')).getAttribute('src')).toMatch(/img\/phones\/nexus-s.0.jpg/);
  //   });
  // });
});
