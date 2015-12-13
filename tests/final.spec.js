describe("maps", function(){
    var fixture;
    beforeEach(function(){
        jasmine.loadStyleFixtures('stylesheet.css');
        jasmine.fixture = loadFixtures('index.html');
    });

    it("getLocation() should return the user's location", function(){
        var test = getLocation();
        var result =  {lat: 34.0259011, lng: -118.2812113};
        expect(test).toEqual(result);

    });


    it('should set display to false', function() {
        var loader = fixture.find(".loader");
        show(loader, false);
        expect(loader.css('display')).toEqual('false');
    });

    it('slideIn() should add classes to #directions and #container', function() {
        var directions = fixture.find(".directions");
        var container = fixture.find(".container");
        slideIn();
        expect(directions.css('right')).toEqual('00');
        expect(container.css('left')).toEqual('-500px');
    });

    it('slideOut() should remove classes to #directions and #container', function() {
        var directions = fixture.find(".directions");
        var container = fixture.find(".container");
        slideOut();
        expect(directions.css('left')).toEqual('-300px');
        expect(container.css('right')).toEqual('-400px');
    });

    it('removeDirections() should set directionsDisplay to null', function() {
        var directions = fixture.find(".directions");
        removeDirections();
        expect(directions).toEqual(null)
    });


});